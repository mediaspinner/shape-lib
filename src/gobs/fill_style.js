export default class FillStyle {
  constructor({ color: color, alpha: alpha, visible: visible } = {}) {
    if (color === undefined) {
      color = "#000000";
    }
    if (alpha === undefined) {
      alpha = 1.0;
    }
    if (visible === undefined) {
      visible = true;
    }
    this.color = color;
    this.alpha = alpha;
    this.visible = visible;
  }
}
