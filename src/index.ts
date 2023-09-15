import Canvas from "./canvas";
import Rectangle from "./shapes/rectangle";
import Timeline from "./shapes/timeline/timeline";
import { drawLine, drawText } from "./utils/basic-drawing/draw";
import { lerp } from "./utils/lerp";
import Vector2 from "./utils/vector2";

const root = document.getElementById("root");
const canvas = new Canvas(root);

const timeline = new Timeline(canvas);
const { width, height } = canvas.getCanvas();
const ctx = canvas.getContext();

// const rects: Rectangle[] = [];
// const dist = 300;
// for (let i = 0; i < 10; i++) {
//   const rect = new Rectangle(new Vector2(width / 2, height / 2), 10, 100);
//   rect.origin.set(0.5, -dist / 100);
//   rects.push(rect);
// }

canvas.getCanvas().addEventListener("wheel", (e: any) => {
  // console.log(e.wheelDeltaY);

  if (e.wheelDeltaY > 0) {
    timeline.windowTarget += 3;
  }

  if (e.wheelDeltaY < 0) {
    timeline.windowTarget -= 3;
  }

  if (timeline.windowTarget > timeline.duration) {
    timeline.windowTarget = timeline.duration;
  }

  if (timeline.windowTarget < 0) {
    timeline.windowTarget = 0;
  }
});

function RAF(time: number) {
  requestAnimationFrame(RAF);

  canvas.update();
  canvas.draw();

  timeline.setVisibleMonth();
  timeline.initVisibleMonths();

  // const angle = Math.atan2(
  //   height / 2 - canvas.pointerPosition.y,
  //   width / 2 - canvas.pointerPosition.x
  // );

  // rects.forEach((rect: Rectangle, index: number) => {
  //   const t = (index / rects.length) * 2 - 1;
  //   rect.rotate(lerp(0, Math.PI / 20, t));
  //   rect.update();
  //   rect.draw(ctx);
  // });

  // ctx.beginPath();
  // ctx.strokeStyle = "#fff";
  // ctx.moveTo(width / 2, height / 2);
  // ctx.lineTo(
  //   width / 2 - Math.cos(angle) * 100,
  //   height / 2 - Math.sin(angle) * 100
  // );
  // ctx.stroke();
  // ctx.closePath();

  // drawLine(
  //   ctx,
  //   new Vector2(width / 2, height / 2),
  //   new Vector2(
  //     width / 2 - Math.cos(angle) * 100,
  //     height / 2 - Math.sin(angle) * 100
  //   )
  // );
  // drawText(
  //   ctx,
  //   `a: ${String(angle).slice(0, 5)}`,
  //   new Vector2(
  //     width / 2 - Math.cos(angle) * 100,
  //     height / 2 - Math.sin(angle) * 100
  //   )
  // );

  timeline.update();
  timeline.draw();
}

RAF(0);
