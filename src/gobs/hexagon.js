import Gob from "./gob.js";
import point_in_polygon from "./point_in_polygon.js";

class Hexagon extends Gob {
  constructor({
    x,
    y,
    r,
    pointy,
    lineStyle,
    fillStyle,
    showLabel,
    label,
    selected,
    user,
  }) {
    let w;
    let h;

    if (pointy) {
      h = Math.sin(Math.PI / 2) * r * 2; // 90 degress
      w = Math.cos(Math.PI / 6) * r * 2; // 30 degress
    } else {
      w = Math.sin(Math.PI / 2) * r * 2; // 90 degress
      h = Math.cos(Math.PI / 6) * r * 2; // 30 degress
    }

    super({
      x,
      y,
      w: w,
      h: h,
      lineStyle,
      fillStyle,
      showLabel,
      label,
      selected,
      user,
    });
    this.r = r;
    this.pts = [];
    this.pointy = pointy;

    this.pts = this.create_pts(x, y, w, h, r, pointy);
  }

  create_pts(x, y, w, h, r, pointy) {
    const turnHexagon = pointy ? 30 : 0;

    let x_offset = x + w / 2;
    let y_offset = y + h / 2;

    let pts = [0, 1, 2, 3, 4, 5, 6].map((n) => {
      const degrees = 60 * n - turnHexagon;
      const radians = (Math.PI / 180) * degrees;
      return [
        x_offset + r * Math.cos(radians),
        y_offset + r * Math.sin(radians),
      ];
    });

    return pts;
  }

  move(x, y) {
    super.move(x, y);
    this.pts = this.create_pts(
      this.x,
      this.y,
      this.w,
      this.h,
      this.r,
      this.pointy
    );
  }

  draw_hexagon(ctx, x, y, w, h, r) {
    ctx.beginPath();
    this.pts.forEach((pt, index) => {
      if (index === 0) {
        ctx.moveTo(pt[0], pt[1]);
      } else {
        ctx.lineTo(pt[0], pt[1]);
      }
    });
    ctx.stroke();
    ctx.closePath();
  }

  draw(ctx) {
    //draw_center(ctx, this.x, this.y, this.w, this.h);
    ctx.save();

    ctx.strokeStyle = this.lineStyle.color;
    ctx.lineWidth = this.lineStyle.lineWidth;

    this.draw_hexagon(ctx, this.x, this.y, this.w, this.h, this.r, this.pointy);

    if (this.fillStyle.visible) {
      ctx.globalAlpha = this.fillStyle.alpha;
      ctx.fillStyle = this.fillStyle.color;
      ctx.fill();
    }
    ctx.restore();

    super.draw(ctx);
  }

  is_hit(x, y) {
    if (
      x >= this.x &&
      x <= this.x + this.w &&
      y >= this.y &&
      y <= this.y + this.h
    ) {
      if (point_in_polygon(x, y, this.pts)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
}

export default Hexagon;
