export default class Application {
  protected _start: boolean = false; // 当前application实例是否进入循环
  protected _requestId: number = -1; // requestAnimation返回的id, 用于cancelAnimationFrame
  protected _lastTime!: number;
  protected _startTime!: number;

  public start(): void {
    if (this._start === false) {
      this._start = true;
      this._requestId = -1;
      this._lastTime = -1;
      this._startTime = -1;
      this._requestId = requestAnimationFrame((elapsedMsec: number): void => {
        this.step(elapsedMsec);
      });
    }
  }
  public stop(): void {
    if (this._start) {
      cancelAnimationFrame(this._requestId);
      this._requestId = -1;
      this._lastTime = -1;
      this._startTime = -1;
      this._start = false;
    }
  }

  public isRunning(): boolean {
    return this._start;
  }

  public step(timeStamp: number): void {
    if (this._startTime === -1) this._startTime = timeStamp;
    if (this._lastTime === -1) this._lastTime = timeStamp;

    // 当前step执行时间与第一次执行时间的差
    let elapsedMsec: number = timeStamp - this._startTime;
    // 当前step执行时间与上一次执行时间的差
    let intervalSec: number = (timeStamp - this._lastTime) / 1000;
    // 记录上一次的时间
    this._lastTime = timeStamp;

    // 先更新
    this.update(elapsedMsec, intervalSec);
    // 再渲染
    this.render();

    // 递归调用, 形成循环
    this._requestId = requestAnimationFrame(() => {
      this.step(elapsedMsec);
    });
  }

  // 虚方法 由子类override
  public update(elapsedMsec: number, intervalSec: number) {}
  // 虚方法 由子类override
  public render(): void {}
}
