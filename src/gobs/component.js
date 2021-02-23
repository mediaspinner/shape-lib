import Gob from "./gob.js";

class Component extends Gob {
  constructor({ x, y, w, h, fillStyle, showLabel, label, selected, user }) {
    super({ x, y, w, h, fillStyle, showLabel, label, selected, user });
  }

  draw(ctx) {
    super.draw(ctx);
  }

  mousedown(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    //console.log(`mousedown ${x} ${y}`);
  }

  mousemove(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    //console.log(`mousemove ${x} ${y}`);
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

export default Component;
