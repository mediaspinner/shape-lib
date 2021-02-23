import Component from "./component.js";

class ButtonComponent extends Component {
  constructor({
    x,
    y,
    w,
    h,
    fillStyle,
    showLabel,
    label,
    selected,
    user,
    down,
    move,
    up,
  }) {
    super({ x, y, w, h, fillStyle, showLabel, label, selected, user });
    this.down = down;
    this.move = move;
    this.up = up;
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

    ctx.font = "20px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(this.label, this.x, this.y + 40);

    ctx.restore();

    super.draw(ctx);
  }

  mousedown(e) {
    let x = e.offsetX;
    let y = e.offsetY;

    console.log(`mousedown ${x} ${y}`);

    if (this.down !== undefined) {
      this.down(this, e);
    }
  }

  mousemove(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    if (this.move !== undefined) {
      this.move(this, e);
    }
  }

  mouseup(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    //console.log(`mouseup ${x} ${y}`);
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

export default ButtonComponent;
