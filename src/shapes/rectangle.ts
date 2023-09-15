// import { Shape } from "./";
import { Shape } from ".";
import Vector2 from "../utils/vector2";

export default class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(position: Vector2, width: number, height: number) {
    super(position);
    this.width = width;
    this.height = height;
    this.rotation = 0;
    this.origin = new Vector2(0.5, 0.5);
    this.build();
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Drawing logic for rectangle
    ctx.beginPath();
    ctx.strokeStyle = "#fff";
    ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
    for (let i = 1; i <= this.vertices.length; i++) {
      ctx.lineTo(
        this.vertices[i % this.vertices.length].x,
        this.vertices[i % this.vertices.length].y
      );
    }
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = "#fff";
    ctx.moveTo(this.position.x, this.position.y);
    for (let i = 1; i <= this.vertices.length; i++) {
      ctx.lineTo(
        this.position.x + Math.cos(this.rotation) * 100,
        this.position.y + Math.sin(this.rotation) * 100
      );
    }
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "#8888ff";
    ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    this.vertices.forEach((vertex: Vector2, i: number) => {
      ctx.beginPath();
      ctx.fillStyle = "#8888ff";
      ctx.arc(vertex.x, vertex.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    });
  }

  build() {
    /**
     * Calculate the Origin Point
     * Origin Point=(xp​−ox​×w,yp​−oy​×h)
     *
     * Calculate the Vertices:
     * Top-left vertex: (xp−ox×w,yp−oy×h)
     * Top-right vertex: (xp+(1−ox)×w,yp−oy×h)
     * Bottom-left vertex: (xp−ox×w,yp+(1−oy)×h)
     * Bottom-right vertex: (xp+(1−ox)×w,yp+(1−oy)×h)
     */
    let topLeft = new Vector2(
        this.position.x - this.origin.x * this.width,
        this.position.y - this.origin.y * this.height
      ),
      topRight = new Vector2(
        this.position.x + (1 - this.origin.x) * this.width,
        this.position.y - this.origin.y * this.height
      ),
      bottomLeft = new Vector2(
        this.position.x - this.origin.x * this.width,
        this.position.y + (1 - this.origin.y) * this.height
      ),
      bottomRight = new Vector2(
        this.position.x + (1 - this.origin.x) * this.width,
        this.position.y + (1 - this.origin.y) * this.height
      );
    this.vertices = [topLeft, bottomLeft, bottomRight, topRight];

    this.vertices.forEach((vertex: Vector2, i: number) => {
      if (vertex.x == this.position.x && vertex.y == this.position.y) {
        return;
      }
      const dir = new Vector2(
          vertex.x - this.position.x,
          vertex.y - this.position.y
        ),
        len = Math.sqrt(dir.x ** 2 + dir.y ** 2),
        angle = Math.atan2(dir.y, dir.x) + this.rotation;
      const _x = this.position.x + Math.cos(angle) * len;
      const _y = this.position.y + Math.sin(angle) * len;
      vertex.x = _x;
      vertex.y = _y;
    });
    return this;
  }
}
