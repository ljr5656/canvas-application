export default class math2D {
  public static EPSILON: number = 0.00001;
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
}
