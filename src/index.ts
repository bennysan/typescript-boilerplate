import Canvas from "./canvas";
import Rectangle from "./shapes/rectangle";
import Vector2 from "./utils/vector2";

const root = document.getElementById("root");
const canvas = new Canvas(root);

const rectangle = new Rectangle(
  new Vector2(canvas.getCanvas().width / 2, canvas.getCanvas().height * 0.5),
  100,
  1.5
);
rectangle.origin.x = -1;
rectangle.origin.y = 0.5;
// rectangle.build();
canvas.clear();
// rectangle.draw(canvas.getContext());

// let target = 0;
// window.addEventListener("pointermove", (e) => {
//   const dir = new Vector2(
//       e.clientX - rectangle.position.x,
//       e.clientY - rectangle.position.y
//     ),
//     angle = Math.atan2(dir.y, dir.x);
//   target = angle;
// });

function RAF() {
  requestAnimationFrame(RAF);

  canvas.update();
  canvas.draw();

  // rectangle.rotate(target).build().draw(canvas.getContext());
  // console.log(target - rectangle.rotation);
}

RAF();
