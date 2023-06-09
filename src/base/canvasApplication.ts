import Application from './application';

enum TextAlign {
  START = 'start',
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  END = 'end',
}
enum TextBaseline {
  TOP = 'top',
  MIDDLE = 'middle',
  BOTTOM = 'bottom',
}

enum TextFontType {
  NORMAL = '10px sans-serif',
}

export default class Canvas2DApplication extends Application {
  public context2D: CanvasRenderingContext2D | null = null;
  constructor(
    canvas: HTMLCanvasElement,
    contextAttribute?: CanvasRenderingContext2DSettings,
  ) {
    super(canvas);
    this.context2D = canvas.getContext('2d', contextAttribute);
  }

  //矩形
  protected _drawRect(x: number, y: number, w: number, h: number): void {
    const { context2D } = this;
    if (context2D === null) {
      return;
    }
    context2D.save();
    context2D.fillStyle = 'grey';
    context2D.strokeStyle = 'blue';
    context2D.beginPath();

    context2D.moveTo(x, y);
    context2D.lineTo(x + w, y);
    context2D.lineTo(x + w, y + h);
    context2D.lineTo(x, y + h);

    context2D.closePath();
    context2D.fill();
    context2D.stroke();
    context2D.restore();
  }

  // 圆形
  public fillCircle(
    x: number,
    y: number,
    r: number,
    fillStyle: string | CanvasGradient | CanvasPattern = 'red',
  ) {
    const { context2D } = this;
    if (context2D === null) return;

    context2D.save();
    context2D.fillStyle = fillStyle;
    context2D.beginPath();
    context2D.arc(x, y, r, 0, Math.PI * 2);
    context2D.fill();
    context2D.restore();
  }

  public strokeLine(x0: number, y0: number, x1: number, y1: number): void {
    const { context2D } = this;
    if (context2D === null) return;
    context2D.beginPath();
    context2D.moveTo(x0, y0);
    context2D.lineTo(x1, y1);
    context2D.stroke();
  }

  protected _strokeCoord(
    orginX: number,
    orginY: number,
    width: number,
    height: number,
  ): void {
    const { context2D } = this;
    if (context2D === null) return;
    context2D.save();
    context2D.strokeStyle = 'red';
    this.strokeLine(orginX, orginY, orginX + width, orginY);
    context2D.strokeStyle = 'blue';
    this.strokeLine(orginX, orginY, orginX, orginY + height);
    context2D.restore();
  }

  // grid绘制的区域为整个canvas的大小
  // 其中参数interval控制每个网格横向和纵向的间隔大小
  public _strokeGrid(color: string = 'grey', interval: number = 10): void {
    const { context2D, canvas } = this;
    if (context2D === null) return;
    context2D.save();
    context2D.strokeStyle = color;
    context2D.lineWidth = 0.5;

    for (let i: number = interval + 0.5; i < canvas.width; i += interval) {
      this.strokeLine(i, 0, i, canvas.height);
    }

    for (let i: number = interval + 0.5; i < canvas.height; i += interval) {
      this.strokeLine(0, i, canvas.width, i);
    }
    context2D.restore();
    // this._fillCircle(0, 0, 5, 'green');
    // this._strokeCoord(0, 0, canvas.width, canvas.height);
  }

  public fillText(
    text: string,
    x: number,
    y: number,
    color: string = 'black',
    align: TextAlign = TextAlign.CENTER,
    baseline: TextBaseline = TextBaseline.MIDDLE,
    font: TextFontType = TextFontType.NORMAL,
  ) {
    const { context2D } = this;
    if (context2D === null) return;
    context2D.save();
    context2D.textAlign = align;
    context2D.textBaseline = baseline;
    context2D.font = font;
    context2D.fillStyle = color;
    context2D.fillText(text, x, y);
    context2D.restore();
  }

  public drawCanvasCoordCenter(): void {
    const { canvas, context2D } = this;
    if (context2D === null) return;
    let halfWidth: number = canvas.width * 0.5;
    let halfHeight: number = canvas.height * 0.5;
    context2D.save();
    context2D.lineWidth = 2;
    context2D.strokeStyle = 'rgba( 255 , 0 , 0 , 0.5 ) ';
    this.strokeLine(0, halfHeight, canvas.width, halfHeight);
    context2D.strokeStyle = 'rgba( 0 , 0 , 255 , 0.5 )';
    this.strokeLine(halfWidth, 0, halfWidth, canvas.height);
    context2D.restore();
    this.fillCircle(halfWidth, halfHeight, 5, 'rgba(0 , 0 , 0 , 0.5 ) ');
  }

  public drawCoordInfo(info: string, x: number, y: number): void {
    this.fillText(info, x, y);
  }
}
