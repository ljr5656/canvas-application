import Canvas2DApplication from '../base/canvasApplication';
import {
  CanvasKeyBoardEvent,
  CanvasMouseEvent,
} from '../base/canvasInputEvent';
import math2D from '../math2d/math2D';
import { Tank } from './TankApplication';

export class TestCanvasApplication extends Canvas2DApplication {
  private _mouseX: number = 0;
  private _mouseY: number = 0;

  private _tank: Tank = new Tank();

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    // this.addTimer(this.timeCallback.bind(this), 0.033);

    this.isSupportMouseMove = true;
    this._tank.x = canvas.width * 0.5;
    this._tank.y = canvas.height * 0.5;

    // this._tank.tankRotation = math2D.toRadian(30);
    // this._tank.turretRotation = math2D.toRadian(-30);
  }

  public drawTank() {
    this._tank.draw(this);
  }

  public update(elapsedMsec: number, intervalSec: number): void {
    this._tank.update(intervalSec);
  }
  public render(): void {
    if (this.context2D !== null) {
      this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // this._drawRect(10, 10, this.canvas.width - 20, this.canvas.height - 20);

    // this._drawLineDashRect(
    //   10,
    //   10,
    //   this.canvas.width - 20,
    //   this.canvas.height - 20,
    // );

    // this._fillCircle(this.canvas.width / 2, this.canvas.height / 2, 100);

    // this._strokeLine(0, 0, 100, 100);

    // this._strokeCoord(this.canvas.width / 2, this.canvas.height / 2, 100, -100);

    // this.drawCanvasCoordCenter();
    // this._strokeGrid();
    // this.drawCoordInfo(
    //   `[${this._mouseX},${this._mouseY}]`,
    //   this._mouseX,
    //   this._mouseY,
    // );
    // this.doTrasform(30, true);

    this._strokeGrid();
    this.drawCanvasCoordCenter();
    this.drawCoordInfo(
      `[${this._mouseX},${this._mouseY}]`,
      this._mouseX,
      this._mouseY,
    );
    this.drawTank();
  }

  private _lineDashOffset: number = 0;
  private _updateLineDashOffset(): void {
    const { context2D } = this;
    if (context2D === null) {
      return;
    }
    this._lineDashOffset++;
    if (this._lineDashOffset > 1000) {
      this._lineDashOffset = 0;
    }
    context2D.lineDashOffset = this._lineDashOffset;
  }
  public timeCallback(id: number, data: any): void {
    this._updateLineDashOffset();
    this._drawLineDashRect(
      10,
      10,
      this.canvas.width - 10,
      this.canvas.height - 10,
    );
  }
  protected _drawLineDashRect(
    x: number,
    y: number,
    w: number,
    h: number,
  ): void {
    const { context2D } = this;
    if (context2D === null) {
      return;
    }

    context2D.lineWidth = 2;
    context2D.setLineDash([10, 5]);
    this._drawRect(x, y, w, h);
  }

  protected dispatchMouseMove(evt: CanvasMouseEvent): void {
    this._mouseX = evt.canvasPosition.x;
    this._mouseY = evt.canvasPosition.y;

    this._tank.onMouseMove(evt);
  }

  public doTrasform(degree: number, rotateFirst: boolean = false): void {
    const { context2D, canvas } = this;
    if (context2D === null) return;
    let radians: number = math2D.toRadian(degree);
    let width = 100;
    let height = 60;
    let x = canvas.width * 0.5;
    let y = canvas.height * 0.5;

    context2D.save();
    if (rotateFirst) {
      context2D.rotate(radians);
      context2D.translate(x, y);
    } else {
      context2D.translate(x, y);
      context2D.rotate(radians);
    }
    this._drawRect(0, 0, width, height);
    context2D.restore();

    context2D.save();
    context2D.translate(x, y);
    this._drawRect(0, 0, width, height);
    context2D.restore();

    context2D.save();
    if (rotateFirst) {
      context2D.rotate(-radians);
      context2D.translate(x, y);
    } else {
      context2D.translate(x, y);
      context2D.rotate(-radians);
    }
    this._drawRect(0, 0, width, height);
    context2D.restore();

    let radius = math2D.distance(0, 0, x, y);
    context2D.save();
    this.fillCircle(0, 0, radius, 'black');
    context2D.restore();
  }

  protected dispatchKeyPress(evt: CanvasKeyBoardEvent): void {
    this._tank.onKeyPress(evt);
  }
}
