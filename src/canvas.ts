import { Shape } from "./shapes";
import Rectangle from "./shapes/rectangle";
import { drawPointer } from "./utils/basic-drawing/draw";
import { lerp } from "./utils/lerp";
import Vector2 from "./utils/vector2";

class Canvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private elements: Shape[];

  public mousePosition: Vector2;
  public pointerPosition: Vector2;

  constructor(root: HTMLElement) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.setDimensions(window.innerWidth, window.innerHeight);
    this.handleWindowResize();
    root.appendChild(this.canvas);

    this.elements = [];
    this.mousePosition = new Vector2(
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.pointerPosition = new Vector2(
      this.mousePosition.x,
      this.mousePosition.y
    );

    this.canvas.addEventListener("pointermove", (e) => {
      this.mousePosition.set(e.clientX, e.clientY);
    });
    // const w = 1.5,
    //   h = 50,
    //   s = 12 + w,
    //   radius = (24 * s) / 2,
    //   count = Math.floor((Math.PI * radius) / s),
    //   comOrigin = new Vector2(this.canvas.width / 2, this.canvas.height * 0.9);
    // for (let i = 0; i <= count; i++) {
    //   const isJan = i % 12 == 0,
    //     t = i / count;

    //   const rect = new Rectangle(
    //     new Vector2(
    //       comOrigin.x - Math.cos(lerp(0, Math.PI, t)) * radius,
    //       comOrigin.y - Math.sin(lerp(0, Math.PI, t)) * radius
    //     ),
    //     isJan ? h : h / 1.5,
    //     w
    //   );

    //   rect.rotate(
    //     Math.atan2(rect.position.y - comOrigin.y, rect.position.x - comOrigin.x)
    //   );

    //   if (i > count / 2) {
    //     rect.setFillColor(`rgba(255,255,255,${lerp(0.01, 1, (1 - t) * 3)}`);
    //   }
    //   if (i < count / 2) {
    //     rect.setFillColor(`rgba(255,255,255,${lerp(0.01, 1, t * 3)}`);
    //   }

    //   rect.setOrigin(0, 0.5).build();
    //   this.addElement(rect);
    // }
  }

  private addElement(newElemnt: Shape) {
    newElemnt.parent;
    this.elements.push(newElemnt);
  }

  private handleWindowResize() {
    window.addEventListener("resize", (e) => {
      this.setDimensions(window.innerWidth, window.innerHeight).clear();
    });
  }

  public setDimensions(width: number, height: number): Canvas {
    this.canvas.width = width;
    this.canvas.height = height;
    return this;
  }

  public update() {
    this.elements.forEach((element: Shape) => element.update());

    const t = 0.1;
    const _x = lerp(this.pointerPosition.x, this.mousePosition.x, t);
    const _y = lerp(this.pointerPosition.y, this.mousePosition.y, t);
    this.pointerPosition.set(_x, _y);
  }

  public draw(): Canvas {
    const t = 0.5;
    this.clear();
    this.elements.forEach((element: Shape) => element.draw(this.getContext()));
    drawPointer(this.ctx, this.pointerPosition);
    return this;
  }

  public clear(): Canvas {
    this.ctx.beginPath();
    this.ctx.fillStyle = "#222";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.closePath();
    return this;
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  public getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }
}

export default Canvas;
