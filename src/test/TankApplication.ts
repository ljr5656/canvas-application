import {
  CanvasKeyBoardEvent,
  CanvasMouseEvent,
} from '../base/canvasInputEvent';
import math2D from '../math2d/math2D';
import { TestCanvasApplication } from './TestCanvasApplicetion';

/**
 * 1. 画布分为四个象限.
 * 2. tank由四部分组成, 炮管 炮塔 底座 炮口
 * 3. 当鼠标移动时, tank自动旋转后朝鼠标指针方向移动, 达到鼠标指针位置时停止
 * 4. 按R键, 炮塔顺时针旋转; 按E键, 炮塔逆时针旋转; 按T键, 炮塔重置到初始化
 * 5. drawCoordInfo增加输出tank角度相关信息
 * 6. 追踪运行路线, 绘制画布中心到tank, tank到鼠标指针的连线
 */

export class Tank {
  public width: number = 80;
  public height: number = 50;

  public x: number = 100;
  public y: number = 100;

  public scaleX: number = 1.0;
  public scaleY: number = 1.0;

  public tankRotation: number = 0; // tank的旋转角度, 用弧度表示
  public turretRotation: number = 0; // tank炮塔的旋转角度, 用弧度表示

  public targetX: number = 0;
  public targetY: number = 0;

  public initYAxis: boolean = true;
  public showLine: boolean = false; // 是否显示tank与原点,目标点之间的连线
  public showCoord: boolean = false; // 是否显示tank自身的局部坐标
  public gunLength: number = Math.max(this.width, this.height);
  public gunMuzzleRadius: number = 5;
  public draw(app: TestCanvasApplication): void {
    const context2D = app.context2D;
    const {
      x,
      y,
      tankRotation,
      scaleX,
      scaleY,
      width,
      height,
      turretRotation,
      gunLength,
      showCoord,
      targetX,
      targetY,
      initYAxis,
    } = this;
    if (context2D === null) return;
    context2D.save(); // 保存状态0, transformation之前
    context2D.translate(x, y);
    context2D.rotate(initYAxis ? tankRotation - Math.PI * 0.5 : tankRotation);
    context2D.scale(scaleX, scaleY);

    // 底座
    context2D.save(); // 保存状态1, transformation之后
    context2D.fillStyle = 'gray';
    context2D.beginPath();
    context2D.rect(-width * 0.5, -height * 0.5, width, height);
    context2D.fill();
    context2D.restore(); // 恢复状态1

    // 炮塔
    context2D.rotate(turretRotation);
    context2D.fillStyle = 'red';
    context2D.beginPath();
    context2D.ellipse(0, 0, 15, 10, 0, 0, Math.PI * 2);
    context2D.fill();

    // 炮管
    context2D.strokeStyle = 'blue';
    context2D.lineWidth = 5;
    context2D.lineCap = 'round';
    context2D.beginPath();
    context2D.moveTo(0, 0);
    context2D.lineTo(gunLength, 0);
    context2D.stroke();

    // 炮口;
    context2D.save(); // 保存状态1
    context2D.translate(gunLength, 0);
    context2D.translate(this.gunMuzzleRadius, 0);
    app.fillCircle(0, 0, 5, 'black');
    context2D.restore(); // 恢复状态1

    // 圆球, 用于标记坦克正方向
    context2D.save(); // 保存状态1
    context2D.translate(width * 0.5, 0);
    app.fillCircle(0, 0, 10, 'green');
    context2D.restore(); // 恢复状态1

    context2D.restore(); // 恢复状态0
    app.strokeLine(
      x,
      y,
      context2D.canvas.width * 0.5,
      context2D.canvas.height * 0.5,
    );
    app.strokeLine(x, y, targetX, targetY);
  }

  _lookAt(): void {
    let diffX = this.targetX - this.x;
    let diffY = this.targetY - this.y;

    let radian = Math.atan2(diffY, diffX);
    if (this.initYAxis) {
      radian += Math.PI * 0.5;
    }
    this.tankRotation = radian;
  }

  public onMouseMove(evt: CanvasMouseEvent) {
    this.targetX = evt.canvasPosition.x;
    this.targetY = evt.canvasPosition.y;
    this._lookAt();
  }
  public linearSpeed: number = 200;
  private _moveTowardTo(intervalSec: number): void {
    const { targetX, targetY, x, y, linearSpeed, tankRotation, initYAxis } =
      this;
    let diffX: number = targetX - x;
    let diffY: number = targetY - y;
    let curSpeed: number = linearSpeed * intervalSec;

    if (diffX ** 2 + diffY ** 2 > curSpeed ** 2) {
      let rot: number = tankRotation;
      if (initYAxis) {
        rot -= Math.PI * 0.5;
      }
      this.x = x + Math.cos(rot) * curSpeed;
      this.y = y + Math.sin(rot) * curSpeed;
    }
  }

  public update(intervalSec: number) {
    this._moveTowardTo(intervalSec);
  }

  public turretRotateSpeed: number = math2D.toRadian(2);
  public onKeyPress(evt: CanvasKeyBoardEvent): void {
    if (evt.key === 'q') {
      this.turretRotation += this.turretRotateSpeed;
    } else if (evt.key === 'r') {
      this.turretRotation = 0;
    } else if (evt.key === 'e') {
      this.turretRotation -= this.turretRotateSpeed;
    }
  }
}
