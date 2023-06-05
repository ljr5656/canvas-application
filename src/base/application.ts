import { vec2 } from '../math2d/vec2';
import {
  CanvasMouseEvent,
  CanvasInputEvent,
  CanvasKeyBoardEvent,
} from './canvasInputEvent';

interface EventListenerObject {
  handleEvent(evt: Event): void;
}

export default class Application implements EventListenerObject {
  protected _start: boolean = false; // 当前application实例是否进入循环
  protected _requestId: number = -1; // requestAnimation返回的id, 用于cancelAnimationFrame
  protected _lastTime!: number;
  protected _startTime!: number;

  protected canvas: HTMLCanvasElement;
  protected _isMouseDown: boolean;
  protected isSupportMouseMove: boolean;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.addEventListener('mousedown', this, false);
    this.canvas.addEventListener('mouseup', this, false);
    this.canvas.addEventListener('mousemove', this, false);

    window.addEventListener('keydown', this, false);
    window.addEventListener('keyup', this, false);
    window.addEventListener('keypress', this, false);

    this._isMouseDown = false;
    this.isSupportMouseMove = false;
  }

  public start(): void {
    if (this._start === false) {
      this._start = true;
      this._requestId = -1;
      this._lastTime = -1;
      this._startTime = -1;
      this._requestId = requestAnimationFrame((elapsedMsec: number): void => {
        this.step(elapsedMsec);
      });
    }
  }
  public stop(): void {
    if (this._start) {
      cancelAnimationFrame(this._requestId);
      this._requestId = -1;
      this._lastTime = -1;
      this._startTime = -1;
      this._start = false;
    }
  }

  public isRunning(): boolean {
    return this._start;
  }

  public step(timeStamp: number): void {
    if (this._startTime === -1) this._startTime = timeStamp;
    if (this._lastTime === -1) this._lastTime = timeStamp;

    // 当前step执行时间与第一次执行时间的差
    let elapsedMsec: number = timeStamp - this._startTime;
    // 当前step执行时间与上一次执行时间的差
    let intervalSec: number = (timeStamp - this._lastTime) / 1000;
    // 记录上一次的时间
    this._lastTime = timeStamp;

    // 先更新
    this.update(elapsedMsec, intervalSec);
    // 再渲染
    this.render();

    // 递归调用, 形成循环
    this._requestId = requestAnimationFrame(() => {
      this.step(elapsedMsec);
    });
  }

  // 虚方法 由子类override
  public update(elapsedMsec: number, intervalSec: number) {}
  // 虚方法 由子类override
  public render(): void {}

  private _viewportToCanvasCoordinate(evt: MouseEvent): vec2 {
    if (this.canvas) {
      let rect: DOMRect = this.canvas.getBoundingClientRect();
      if (evt.target) {
        let borderLeftWidth: number = 0;
        let borderTopWidth: number = 0;
        let paddingLeft: number = 0;
        let paddingTop: number = 0;

        let decl: CSSStyleDeclaration = window.getComputedStyle(
          evt.target as HTMLElement,
        );
        decl.borderLeftWidth &&
          (borderLeftWidth = parseInt(decl.borderLeftWidth));
        decl.borderTopWidth && (borderTopWidth = parseInt(decl.borderTopWidth));
        decl.paddingLeft && (paddingLeft = parseInt(decl.paddingLeft));
        decl.paddingTop && (paddingTop = parseInt(decl.paddingTop));

        let x: number = evt.clientX - rect.left - borderLeftWidth - paddingLeft;
        let y: number = evt.clientY - rect.top - borderTopWidth - paddingTop;
        let pos: vec2 = vec2.create(x, y);
        return pos;
      }
      throw new Error('target为null');
    }
    throw new Error('canvas为null');
  }

  // 将DOM Event对象信息转换为自己定义的CanvasMouseEvent事件
  private _toCanvasMouseEvent(evt: Event): CanvasMouseEvent {
    // 向下转型，将Event转换为MouseEvent
    let event: MouseEvent = evt as MouseEvent;
    // 将客户区的鼠标pos变换到Canvas坐标系中表示
    let mousePosition: vec2 = this._viewportToCanvasCoordinate(event);
    // 将Event一些要用到的信息传递给CanvasMouseEvent并返回
    let canvasMouseEvent: CanvasMouseEvent = new CanvasMouseEvent(
      mousePosition,
      event.button,
      event.altKey,
      event.ctrlKey,
      event.shiftKey,
    );
    return canvasMouseEvent;
  }
  // 将DOM Event对象信息转换为自己定义的Keyboard事件
  private _toCanvasKeyBoardEvent(evt: Event): CanvasKeyBoardEvent {
    let event: KeyboardEvent = evt as KeyboardEvent;
    // 将Event一些要用到的信息传递给CanvasKeyBoardEvent并返回
    let canvasKeyboardEvent: CanvasKeyBoardEvent = new CanvasKeyBoardEvent(
      event.key,
      event.keyCode,
      event.repeat,
      event.altKey,
      event.ctrlKey,
      event.shiftKey,
    );
    return canvasKeyboardEvent;
  }

  public handleEvent(evt: Event): void {
    // 根据事件的类型，调用对应的dispatchXXX虚方法
    switch (evt.type) {
      case 'mousedown':
        this._isMouseDown = true;
        this.dispatchMouseDown(this._toCanvasMouseEvent(evt));
        break;
      case 'mouseup':
        this._isMouseDown = false;
        this.dispatchMouseUp(this._toCanvasMouseEvent(evt));
        break;
      case 'mousemove':
        //如果isSupportMouseMove为true，则每次鼠标移动会触发mouseMove事件
        if (this.isSupportMouseMove) {
          this.dispatchMouseMove(this._toCanvasMouseEvent(evt));
        }
        // 同时，如果当前鼠标任意一个键处于按下状态并拖动时，触发drag事件
        if (this._isMouseDown) {
          this.dispatchMouseDrag(this._toCanvasMouseEvent(evt));
        }
        break;
      case 'keypress':
        this.dispatchKeyPress(this._toCanvasKeyBoardEvent(evt));
        break;
      case 'keydown':
        this.dispatchKeyDown(this._toCanvasKeyBoardEvent(evt));
        break;
      case 'keyup':
        this.dispatchKeyUp(this._toCanvasKeyBoardEvent(evt));
        break;
    }
  }

  // 虚方法 由子类override
  protected dispatchMouseDown(evt: CanvasMouseEvent) {}
  protected dispatchMouseUp(evt: CanvasMouseEvent) {}
  protected dispatchMouseMove(evt: CanvasMouseEvent) {}
  protected dispatchMouseDrag(evt: CanvasMouseEvent) {}
  protected dispatchKeyPress(evt: CanvasKeyBoardEvent) {}
  protected dispatchKeyDown(evt: CanvasKeyBoardEvent) {}
  protected dispatchKeyUp(evt: CanvasKeyBoardEvent) {}
}
