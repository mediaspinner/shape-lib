import Gob from "./gob.js";

class Triangle extends Gob {
  constructor({ x, y, w, h, fillStyle, showLabel, label, selected, user }) {
    super({ x, y, w, h, fillStyle, showLabel, label, selected, user });

    this.pts = [];
    this.pts.push([this.x + this.w / 2, this.y]);
    this.pts.push([this.x + this.w / 2 + this.w / 2, this.y + this.h]);
    this.pts.push([this.x - this.w / 2 + this.w / 2, this.y + this.h]);
  }

  move(x, y) {
    super.move(x, y);
    this.pts = this.pts.map((pt) => {
      pt[0] += x;
      pt[1] += y;
      return pt;
    });
  }

  draw(ctx) {
    ctx.save();

    ctx.strokeStyle = this.lineStyle.color;
    ctx.lineWidth = this.lineStyle.lineWidth;

    ctx.beginPath();
    for (let i = 0; i < this.pts.length; i++) {
      if (i === 0) {
        ctx.moveTo(this.pts[i][0], this.pts[i][1]);
      } else {
        ctx.lineTo(this.pts[i][0], this.pts[i][1]);
      }
    }
    ctx.lineTo(this.pts[0][0], this.pts[0][1]);
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

  inner(ctx) {
    ctx.save();
    ctx.globalAlpha = this.fillStyle.alpha;
    ctx.fillStyle = this.fillStyle.color;
    ctx.fill();
    ctx.restore();
  }

  // Barycentric coordinate method
  // https://blackpawn.com/texts/pointinpoly/default.html
  is_hit(px, py) {
    let ax, ay;
    [ax, ay] = this.pts[0];
    let bx, by;
    [bx, by] = this.pts[1];
    let cx, cy;
    [cx, cy] = this.pts[2];

    let v0 = [cx - ax, cy - ay];
    let v1 = [bx - ax, by - ay];
    var v2 = [px - ax, py - ay];

    let dot00 = v0[0] * v0[0] + v0[1] * v0[1];
    let dot01 = v0[0] * v1[0] + v0[1] * v1[1];
    let dot02 = v0[0] * v2[0] + v0[1] * v2[1];
    let dot11 = v1[0] * v1[0] + v1[1] * v1[1];
    let dot12 = v1[0] * v2[0] + v1[1] * v2[1];

    let invDenom = 1 / (dot00 * dot11 - dot01 * dot01);

    let u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    let v = (dot00 * dot12 - dot01 * dot02) * invDenom;

    return u >= 0 && v >= 0 && u + v < 1;
  }
}

export default Triangle;
