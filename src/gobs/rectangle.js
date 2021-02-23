import Gob from "./gob.js";

class Rectangle extends Gob {
  constructor({ x, y, w, h, fillStyle, showLabel, label, selected, user }) {
    super({ x, y, w, h, fillStyle, showLabel, label, selected, user });
  }

  draw(ctx) {
    ctx.save();

    ctx.strokeStyle = this.lineStyle.color;
    ctx.lineWidth = this.lineStyle.lineWidth;

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.w, this.y);
    ctx.lineTo(this.x + this.w, this.y + this.h);
    ctx.lineTo(this.x, this.y + this.h);
    ctx.lineTo(this.x, this.y);
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
    if (
      x >= this.x &&
      x <= this.x + this.w &&
      y >= this.y &&
      y <= this.y + this.h
    ) {
      return true;
    }
    return false;
  }
}

export default Rectangle;
