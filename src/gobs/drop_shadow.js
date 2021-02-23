export default class DropShadow {
  constructor({
    shadowOffsetX: shadowOffsetX,
    shadowOffsetY: shadowOffsetY,
    shadowColor: shadowColor,
    shadowBlur: shadowBlur,
  } = {}) {
    if (shadowOffsetX === undefined) {
      shadowOffsetX = 10;
    }
    if (shadowOffsetY === undefined) {
      shadowOffsetY = 10;
    }
    if (shadowBlur === undefined) {
      shadowBlur = 20;
    }
    if (shadowColor === undefined) {
      shadowColor = "#000000";
    }
    this.shadowOffsetX = shadowOffsetX;
    this.shadowOffsetY = shadowOffsetY;
    this.shadowColor = shadowColor;
    this.shadowBlur = shadowBlur;
  }
}
