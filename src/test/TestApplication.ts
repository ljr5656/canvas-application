import Application from '../base/application';
import {
  CanvasInputEvent,
  CanvasKeyBoardEvent,
  CanvasMouseEvent,
} from '../base/canvasInputEvent';

export default class TestApplication extends Application {
  protected dispatchKeyDown(evt: CanvasKeyBoardEvent): void {
    console.log('keydown');
  }
  protected dispatchMouseDown(evt: CanvasMouseEvent): void {
    console.log('mousedown');
  }

  public update(elapsedMsec: number, intervalSec: number): void {
    console.log(`elapsedMsec: ${elapsedMsec}, intervalSec: ${intervalSec}`);
  }

  public render(): void {
    console.log('render');
  }
}
