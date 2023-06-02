export class vec2 {
  values: Float32Array;
  EPSILON: number = 0.00001;
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
    if (Math.abs(this.values[0] - vector.values[0]) > this.EPSILON) {
      return false;
    }
    if (Math.abs(this.values[1] - vector.values[1]) > this.EPSILON) {
      return false;
    }
    return false;
  }
}
