import { lerp } from "../utils/lerp";
import Vector2 from "../utils/vector2";
// import Rectangle from "./rectangle";

// export { Rectangle };

export abstract class Shape {
  position: Vector2;
  rotation: number;
  scale: number;
  vertices: Vector2[];
  origin: Vector2;
  parent: Shape;
  children: Shape[];
  constructor(position: Vector2, parent?: Shape) {
    this.position = position;
    this.rotation = 0;
    this.scale = 1;
    this.vertices = [];
    this.origin = new Vector2(1, 1);
    this.parent = parent;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;

  translate(translation: Vector2) {
    this.position.x += translation.x;
    this.position.y += translation.y;
  }

  rotate(angle: number) {
    this.rotation = lerp(this.rotation, angle, 0.01);
    return this;
  }
}
