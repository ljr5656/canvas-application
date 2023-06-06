import Application from '../base/application';

let canvas = document.querySelector('#canvas') as HTMLCanvasElement;

let app = new Application(canvas);
function timerCallback(id: number, data: string) {
  console.log(`id: ${id}, data: ${data}`);
}

let timer0: number = app.addTimer(timerCallback, 3, true, 'timer0_data');
let timer1: number = app.addTimer(timerCallback, 5, false, 'timer1_data');
let startButton: HTMLButtonElement | null = document.getElementById(
  'start',
) as HTMLButtonElement;
let stopButton: HTMLButtonElement | null = document.getElementById(
  'stop',
) as HTMLButtonElement;
startButton.onclick = (ev: MouseEvent): void => {
  debugger;
  app.start();
};
stopButton.onclick = (ev: MouseEvent): void => {
  app.removeTimer(timer1);
  console.log(app.timers.length);
  let id: number = app.addTimer(timerCallback, 10, true, 'data');
  console.log(id === 0);
};
