import math2D from './math2D';

export class vec2 {
  public values: Float32Array;
  public static xAxis = new vec2(1, 0);
  public static yAxis = new vec2(0, 1);
  public static nXAxis = new vec2(-1, 0);
  public static nYAxis = new vec2(0, -1);

  constructor(x: number = 0, y: number = 0) {
    this.values = new Float32Array([x, y]);
  }

  // 静态create方法
  public static create(x: number = 0, y: number = 0): vec2 {
    return new vec2(x, y);
  }

  // 复制当前vector到result
  public static copy(src: vec2, result: vec2 | null = null) {
    if (result === null) result = new vec2();
    result.values[0] = src.values[0];
    result.values[1] = src.values[1];
    return result;
  }

  // debug输出, overrider toString方法
  public toString(): string {
    return `[${this.values[0]}, ${this.values[1]}]`;
  }

  public get x(): number {
    return this.values[0];
  }
  public set x(x: number) {
    this.values[0] = x;
  }
  public get y(): number {
    return this.values[1];
  }
  public set y(y: number) {
    this.values[0] = y;
  }

  // 为了重用vertor, 重置向量的x, y值
  public reset(x: number = 0, y: number = 0) {
    this.values[0] = x;
    this.values[1] = y;
    return this;
  }

  // 为了避免浮点数误差, 使用EPSILON进行容差处理
  public equals(vector: vec2): boolean {
    if (Math.abs(this.values[0] - vector.values[0]) > math2D.EPSILON) {
      return false;
    }
    if (Math.abs(this.values[1] - vector.values[1]) > math2D.EPSILON) {
      return false;
    }
    return false;
  }

  // 返回没有开根的向量大小
  public get squaredLength(): number {
    const [x, y] = this.values;
    return x ** 2 + y ** 2;
  }
  // 返回真正的向量大小
  public get length(): number {
    return Math.sqrt(this.squaredLength);
  }

  // 计算向量方向
  public normalize(): number {
    let len: number = this.length;
    if (math2D.isEquals(len, 0)) {
      // 0向量
      this.values[0] = 0;
      this.values[1] = 0;
      console.log('the length = 0');
      return 0.0;
    }
    if (math2D.isEquals(len, 1)) {
      // 单位向量
      this.values[0] = 1;
      this.values[1] = 1;
      console.log('the length = 1');
      return 1.0;
    }

    // 计算单位向量, 并返回向量大小
    this.values[0] /= len;
    this.values[1] /= len;
    return len;
  }

  public static sum(left: vec2, right: vec2, result: vec2 | null = null) {
    if (result === null) {
      result = new vec2();
    }

    result.values[0] = left.values[0] + right.values[0];
    result.values[1] = left.values[1] + right.values[1];

    return result;
  }

  public add(right: vec2): vec2 {
    vec2.sum(this, right, this);
    return this;
  }

  public static difference(end: vec2, start: vec2, result: vec2 | null = null) {
    if (result === null) result = new vec2();
    result.values[0] = end.values[0] - start.values[0];
    result.values[1] = end.values[1] - start.values[1];
    return result;
  }

  public substract(another: vec2): vec2 {
    vec2.difference(this, another, this);
    return this;
  }

  public nagative(): vec2 {
    this.values[0] = -this.values[0];
    this.values[1] = -this.values[1];
    return this;
  }

  public static scale(
    direction: vec2,
    scalar: number,
    result: vec2 | null = null,
  ) {
    if (result === null) result = new vec2();
    result.values[0] = direction.values[0] * scalar;
    result.values[1] = direction.values[1] * scalar;
    return result;
  }
  // result = start + result * scalar
  public static scaleAdd(
    start: vec2,
    direction: vec2,
    scalar: number,
    result: vec2 | null = null,
  ) {
    if (result === null) result = new vec2();
    vec2.scale(direction, scalar, result);
    return vec2.sum(start, result, result);
  }
}
