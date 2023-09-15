import Vector2 from "../vector2";

export const drawPoint = (
  ctx: CanvasRenderingContext2D,
  position: Vector2,
  radius: number
) => {
  ctx.beginPath();
  ctx.fillStyle = "#22a2FF";
  ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
};

export const drawText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  position: Vector2
) => {
  ctx.beginPath();
  ctx.fillText(text, position.x + 10, position.y - 10);
  ctx.closePath();
};

export const drawPointer = (
  ctx: CanvasRenderingContext2D,
  position: Vector2
) => {
  ctx.beginPath();
  ctx.fillStyle = "#22a2FF";
  ctx.arc(position.x, position.y, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
  drawText(
    ctx,
    `x: ${String(position.x).slice(0, 3)} y: ${String(position.y).slice(0, 3)}`,
    new Vector2(position.x + 12, position.y - 12)
  );
};

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  start: Vector2,
  end: Vector2
) => {
  ctx.beginPath();
  ctx.strokeStyle = "#22a2FF";
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.closePath();
};
