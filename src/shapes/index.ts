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
  targetRotation: number;
  fillColor: string;

  constructor(position: Vector2, parent?: Shape) {
    this.position = position;
    this.rotation = 0;
    this.scale = 1;
    this.vertices = [];
    this.origin = new Vector2(1, 1);
    this.parent = parent;
    this.targetRotation = 0;
  }

  abstract update(): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;

  setOrigin(x: number, y: number) {
    this.origin.set(x, y);
    return this;
  }
  translate(translation: Vector2) {
    this.position.x += translation.x;
    this.position.y += translation.y;
  }

  rotate(angle: number) {
    this.targetRotation = angle - Math.PI / 2;
    return this;
  }
}
