import { Text } from './Text';

export class JobText extends Text {
  constructor({
    x,
    y,
    text,
    font,
    textColor,
    textActiveColor,
    lineHeight,
    backgroundColor,
    borderWidth,
    borderColor,
    borderRadius
  }) {
    super({ x, y, text, font, textColor, textActiveColor, lineHeight });
    this.backgroundColor = backgroundColor;
    this.borderColor = borderColor;
    this.borderRadius = borderRadius;
    this.borderWidth = borderWidth;
  }

  fillBackground() {
    this.ctx.fillStyle = this.backgroundColor;
  }

  drowBorder() {
    this.ctx.strokeStyle = this.borderColor;
    this.ctx.lineWidth = this.borderWidth;
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(this.x - 50, this.getY(), 100, this.getHeight());
    this.ctx.strokeRect(this.x - 50, this.getY(), 100, this.getHeight());
  }

  activate() {
    this.drowBorder();
    this.ctx.fillStyle = this.textActiveColor;
    this.startDrow();
    this.fillText();
  }
}
