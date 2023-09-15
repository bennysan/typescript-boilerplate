// import { Shape } from "./";
import { Shape } from ".";
import { lerp } from "../utils/lerp";
import Vector2 from "../utils/vector2";

export default class Rectangle extends Shape {
  width: number;
  height: number;
  showRay: boolean;

  constructor(position: Vector2, width: number, height: number) {
    super(position);
    this.width = width;
    this.height = height;
    this.rotation = 0;
    this.origin = new Vector2(0.5, 0.5);
    this.fillColor = "#fff";
    this.build();
  }

  setFillColor(color: string) {
    this.fillColor = color;
  }

  update(): void {
    if (Math.abs(this.rotation - this.targetRotation) > 0.001) {
      this.rotation = lerp(this.rotation, this.targetRotation, 0.05);
      this.build();
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Drawing logic for rectangle
    ctx.beginPath();
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = this.fillColor;

    ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
    for (let i = 1; i <= this.vertices.length; i++) {
      ctx.lineTo(
        this.vertices[i % this.vertices.length].x,
        this.vertices[i % this.vertices.length].y
      );
    }
    ctx.fill();
    // ctx.stroke();
    ctx.closePath();

    if (this.showRay) {
      const dir = new Vector2(
          Math.cos(this.rotation + Math.PI / 2),
          Math.sin(this.rotation + Math.PI / 2)
        ),
        length = Math.sqrt(
          (this.width * this.origin.x) ** 2 + (this.height * this.origin.y) ** 2
        );
      ctx.beginPath();
      ctx.strokeStyle = this.fillColor;
      ctx.lineWidth = 0.2;
      ctx.moveTo(
        this.position.x - dir.x * length,
        this.position.y - dir.y * length
      );
      for (let i = 1; i <= this.vertices.length; i++) {
        ctx.lineTo(
          this.position.x - dir.x * 10000,
          this.position.y - dir.y * 10000
        );
      }
      ctx.stroke();
      ctx.closePath();
    }

    // ctx.beginPath();
    // ctx.fillStyle = "#8888ff";
    // ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();

    // this.vertices.forEach((vertex: Vector2, i: number) => {
    //   ctx.beginPath();
    //   ctx.fillStyle = "#8888ff";
    //   ctx.arc(vertex.x, vertex.y, 3, 0, Math.PI * 2);
    //   ctx.fill();
    //   ctx.closePath();
    // });
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
      const _x = this.position.x - Math.cos(angle) * len;
      const _y = this.position.y - Math.sin(angle) * len;
      vertex.x = _x;
      vertex.y = _y;
    });
    return this;
  }
}
