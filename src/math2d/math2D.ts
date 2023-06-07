export default class math2D {
  public static EPSILON: number = 0.00001;
  public static PiBy180: number = 0.017453292519943295;
  public static isEquals(
    left: number,
    right: number,
    espilon: number = math2D.EPSILON,
  ): boolean {
    if (Math.abs(left - right) >= math2D.EPSILON) {
      return false;
    }
    return true;
  }

  public static toDegree(radian: number): number {
    return radian / math2D.PiBy180;
  }
  public static toRadian(degree: number): number {
    return degree * math2D.PiBy180;
  }

  // 两点距离
  public static distance(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
  ): number {
    let diffX = x1 - x0;
    let diffY = y1 - y0;
    return Math.sqrt(diffX ** 2 + diffY ** 2);
  }
}
