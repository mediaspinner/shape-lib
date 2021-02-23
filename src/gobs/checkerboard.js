import Gob from "./gob.js";

class CheckerBoard extends Gob {
  constructor({ x, y, w, h, rows, cols, fillStyle1, fillStyle2, user }) {
    let fill = true;
    let color = null;
    let showLabel = false;
    let label = "";
    let selected = false;

    super({ x, y, w, h, showLabel, label, selected, user });
    this.rows = rows;
    this.cols = cols;
    this.fillStyle1 = fillStyle1;
    this.fillStyle2 = fillStyle2;
  }

  draw(ctx) {
    ctx.save();

    let sw = this.w / this.cols;
    let sh = this.h / this.rows;

    for (let i = 0; i < this.rows; ++i) {
      for (let j = 0; j < this.cols; ++j) {
        let x = this.x + sw * i;
        let y = this.y + sh * j;
        if (i % 2 == j % 2) {
          ctx.globalAlpha = this.fillStyle1.alpha;
          ctx.fillStyle = this.fillStyle1.color;
        } else {
          ctx.globalAlpha = this.fillStyle2.alpha;
          ctx.fillStyle = this.fillStyle2.color;
        }
        ctx.fillRect(x, y, sw, sh);
      }
    }

    ctx.globalAlpha = 1.0;
    ctx.strokeStyle = this.lineStyle.color;
    ctx.lineWidth = this.lineStyle.lineWidth;
    ctx.strokeRect(this.x, this.y, this.w, this.h);

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

export default CheckerBoard;
