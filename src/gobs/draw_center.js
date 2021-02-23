export default function draw_center(ctx, x, y, w, h) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;

  ctx.moveTo(x + w / 2, y + h / 2 - 5);
  ctx.lineTo(x + w / 2, y + h / 2 + 5);

  ctx.moveTo(x + w / 2 - 5, y + h / 2);
  ctx.lineTo(x + w / 2 + 5, y + h / 2);

  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 1;

  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y + h);

  ctx.moveTo(x + w, y);
  ctx.lineTo(x, y + h);

  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}
