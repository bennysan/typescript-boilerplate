export default class Vector2 {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.set(x, y);
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(u: Vector2 | number) {
    if (u instanceof Vector2) {
      this.x += u.x;
      this.y += u.y;
      return this;
    }
    this.x += u;
    this.y += u;
    return this;
  }

  length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalized() {
    return new Vector2(this.x / this.length(), this.y / this.length());
  }
}
