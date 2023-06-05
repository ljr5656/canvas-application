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
}
