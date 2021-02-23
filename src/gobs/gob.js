import LineStyle from "./line_style.js";
import FillStyle from "./fill_style.js";
import DropShadow from "./drop_shadow.js";

class Gob {
  // https://www.smashingmagazine.com/2016/07/how-to-use-arguments-and-parameters-in-ecmascript-6/
  // Destructuring assignment
  constructor({
    x: x,
    y: y,
    w: w,
    h: h,
    lineStyle: lineStyle,
    fillStyle: fillStyle,
    showLabel: showLabel,
    dropShadow: dropShadow,
    label: label,
    selected: selected = false,
    user: user,
  } = {}) {
    if (x === undefined) {
      throw new Error("x required");
    } else {
      if (typeof x === "number") {
        this.x = x;
      } else {
        throw new Error("x must be a number");
      }
    }

    this.y = y;
    this.w = w;
    this.h = h;

    if (lineStyle === undefined) {
      this.lineStyle = new LineStyle();
    } else {
      this.lineStyle = lineStyle;
    }

    if (fillStyle === undefined) {
      this.fillStyle = null;
    } else {
      this.fillStyle = fillStyle;
    }

    if (dropShadow === undefined) {
      this.dropShadow = new FillStyle();
    } else {
      this.dropShadow = fillStyle;
    }

    this.showLabel = showLabel;
    this.label = label;
    this.selected = selected;
    this.user = user;
    this.children = [];
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }

  is_selected() {
    return this.selected;
  }

  toggle_selection() {
    this.selected = !this.selected;
  }

  select() {
    if (!this.selected) {
      this.selected = true;
    }
  }

  deselect() {
    if (this.selected) {
      this.selected = false;
    }
  }

  outer(ctx) {}
  inner(ctx) {}

  draw_selection(ctx) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ff0000";
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    ctx.stroke();
    ctx.closePath();
  }

  draw(ctx) {
    // if (this.dropShadow) {
    //   ctx.shadowOffsetX = this.dropShadow.shadowOffsetX;
    //   ctx.shadowOffsetY = this.dropShadow.shadowOffsetY;
    //   ctx.shadowColor = this.dropShadow.shadowColor;
    //   ctx.shadowBlur = this.dropShadow.shadowBlur;
    // }

    if (this.selected) {
      ctx.save();
      this.draw_selection(ctx);
      ctx.restore();
    }
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

export default Gob;
