export default class LineStyle {
  constructor({ color: color, lineWidth: lineWidth } = {}) {
    if (color === undefined) {
      color = "#000000";
    }
    if (lineWidth === undefined) {
      lineWidth = 1;
    }
    this.color = color;
    this.lineWidth = lineWidth;
  }
}
