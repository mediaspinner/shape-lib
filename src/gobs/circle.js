import Gob from "./gob.js";

class Circle extends Gob {
  constructor({ cx, cy, r, fillStyle, showLabel, label, selected, user }) {
    if (cx === undefined) {
      throw new Error("cx required");
    }
    if (typeof cx !== "number") {
      throw new Error("cx must be a number");
    }

    if (cy === undefined) {
      throw new Error("cy required");
    }
    if (typeof cy !== "number") {
      throw new Error("cy must be a number");
    }

    if (r === undefined) {
      throw new Error("r required");
    }
    if (typeof r !== "number") {
      throw new Error("r must be a number");
    }
    if (r <= 0) {
      throw new Error("r must be greater than 0");
    }

    let x = cx - r;
    let y = cy - r;
    let w = 2 * r;
    let h = 2 * r;

    super({
      x: x,
      y: y,
      w: w,
      h: h,
      fillStyle: fillStyle,
      showLabel: showLabel,
      label: label,
      selected: selected,
      user: user,
    });
    this.cx = cx;
    this.cy = cy;
    this.r = r;
  }

  move(x, y) {
    super.move(x, y);
    this.cx += x;
    this.cy += y;
  }

  draw(ctx) {
    ctx.save();

    ctx.strokeStyle = this.lineStyle.color;
    ctx.lineWidth = this.lineStyle.lineWidth;

    ctx.beginPath();
    ctx.arc(this.cx, this.cy, this.r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    if (this.fillStyle.visible) {
      ctx.globalAlpha = this.fillStyle.alpha;
      ctx.fillStyle = this.fillStyle.color;
      ctx.fill();
    }

    ctx.restore();

    super.draw(ctx);
  }

  is_hit(x, y) {
    let v = Math.floor(
      Math.sqrt((x - this.cx) * (x - this.cx) + (y - this.cy) * (y - this.cy))
    );

    if (v <= this.r) {
      return true;
    } else {
      return false;
    }
  }
}

export default Circle;
