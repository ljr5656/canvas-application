import Application from './application';

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
}
