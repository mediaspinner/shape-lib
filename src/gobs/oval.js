import Gob from "./gob.js";

class Oval extends Gob {
  constructor({
    x: x,
    y: y,
    cx: cx,
    cy: cy,
    radiusX: radiusX,
    radiusY: radiusY,
    fillStyle: fillStyle,
    showLabel: showLabel,
    label: label,
    selected: selected,
    user: user,
  }) {
    let mode;
    if (x !== undefined && y !== undefined) {
      if (typeof x !== "number") {
        throw new Error("x must be a number");
      }
      if (typeof y !== "number") {
        throw new Error("y must be a number");
      }
      mode = "xy";
    } else if (cx !== undefined && cy !== undefined) {
      if (typeof cx !== "number") {
        throw new Error("cx must be a number");
      }
      if (typeof cy !== "number") {
        throw new Error("cy must be a number");
      }
      mode = "center";
    }

    if (radiusX === undefined) {
      throw new Error("radiusX required");
    }
    if (typeof radiusX !== "number") {
      throw new Error("radiusX must be a number");
    }
    if (radiusX <= 0) {
      throw new Error("radiusX must be greater than 0");
    }

    if (radiusY === undefined) {
      throw new Error("radiusY required");
    }
    if (typeof radiusY !== "number") {
      throw new Error("radiusY must be a number");
    }
    if (radiusY <= 0) {
      throw new Error("radiusY must be greater than 0");
    }

    if (mode === "xy") {
      cx = x + radiusX;
      cy = y + radiusY;
    } else if (mode === "center") {
      x = cx - radiusX;
      y = cy - radiusY;
    }

    let w = 2 * radiusX;
    let h = 2 * radiusY;

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
    this.radiusX = radiusX;
    this.radiusY = radiusY;
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
    ctx.ellipse(
      this.cx,
      this.cy,
      this.radiusX,
      this.radiusY,
      0,
      0,
      4 * Math.PI,
      false
    );
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
    let h = this.cx;
    let k = this.cy;
    let a = this.radiusX;
    let b = this.radiusY;

    let res =
      Math.pow(x - h, 2) / Math.pow(a, 2) + Math.pow(y - k, 2) / Math.pow(b, 2);
    if (res <= 1) {
      return true;
    } else {
      return false;
    }
  }
}

export default Oval;
