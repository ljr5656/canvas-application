import Canvas2DApplication from '../base/canvasApplication';

export class TestCanvasApplication extends Canvas2DApplication {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.addTimer(this.timeCallback.bind(this), 0.033);
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

    this._fillCircle(this.canvas.width / 2, this.canvas.height / 2, 100);
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
}
