import Canvas2DApplication from '../base/canvasApplication';

export class TestCanvasApplication extends Canvas2DApplication {
  public render(): void {
    if (this.context2D !== null) {
      this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this._drawRect(10, 10, this.canvas.width - 10, this.canvas.height - 10);
  }
}
