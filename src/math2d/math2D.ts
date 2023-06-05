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
}
