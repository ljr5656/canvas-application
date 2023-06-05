import { vec2 } from '../math2d/vec2';

export enum EInputEventType {
  MOUSEEVENT, //总类，表示鼠标事件
  MOUSEDOWN, //鼠标按下事件
  MOUSEUP, //鼠标弹起事件
  MOUSEMOVE, //鼠标移动事件
  MOUSEDRAG, //鼠标拖动事件
  KEYBOARDEVENT, //总类，表示键盘事件
  KEYUP, //键按下事件
  KEYDOWN, //键弹起事件
  KEYPRESS, //按键事件
}
export class CanvasInputEvent {
  public altKey: boolean;
  public ctrlKey: boolean;
  public shiftKey: boolean;

  public type: EInputEventType;

  constructor(
    altKey: boolean = false,
    ctrlKey: boolean = false,
    shiftKey: boolean = false,
    type: EInputEventType = EInputEventType.MOUSEEVENT,
  ) {
    this.altKey = altKey;
    this.ctrlKey = ctrlKey;
    this.shiftKey = shiftKey;
    this.type = type;
  }
}

export class CanvasMouseEvent extends CanvasInputEvent {
  // button表示当前按下鼠标哪个键
  // [ 0 : 鼠标左键 ,1 : 鼠标中键，2 : 鼠标右键 ]
  public button: number;
  // 基于canvas坐标系的表示
  public canvasPosition: vec2;

  public localPosition: vec2;
  public constructor(
    canvasPos: vec2,
    button: number,
    altKey: boolean = false,
    ctrlKey: boolean = false,
    shiftKey: boolean = false,
  ) {
    super(altKey, ctrlKey, shiftKey);
    this.canvasPosition = canvasPos;
    this.button = button;

    // 暂时创建一个vec2对象
    this.localPosition = vec2.create();
  }
}
export class CanvasKeyBoardEvent extends CanvasInputEvent {
  // 当前按下的键的ASCII字符
  public key: string;
  // 当前按下的键的ASCII码（数字）
  public keyCode: number;
  // 当前按下的键是否不停地触发事件
  public repeat: boolean;
  public constructor(
    key: string,
    keyCode: number,
    repeat: boolean,
    altKey: boolean = false,
    ctrlKey: boolean = false,
    shiftKey: boolean = false,
  ) {
    super(altKey, ctrlKey, shiftKey, EInputEventType.KEYBOARDEVENT);
    this.key = key;
    this.keyCode = keyCode;
    this.repeat = repeat;
  }
}
