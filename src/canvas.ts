import { Shape } from "./shapes";
import Rectangle from "./shapes/rectangle";
import Vector2 from "./utils/vector2";

class Canvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private elements: Shape[];
  constructor(root: HTMLElement) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.setDimensions(window.innerWidth, window.innerHeight);
    this.handleWindowResize();
    root.appendChild(this.canvas);
    this.elements = [];
    this.addElement(
      new Rectangle(
        new Vector2(this.canvas.width / 2, this.canvas.height / 2),
        100,
        100
      )
    );
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

  public update() {}

  public draw(): Canvas {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(10, 10, 50, 50);
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
