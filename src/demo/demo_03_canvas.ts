import { TestCanvasApplication } from '../test/TestCanvasApplicetion';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;

const app = new TestCanvasApplication(canvas);
app.start();
