export class Text {
  constructor({ x, y, text, font, textColor, textActiveColor, lineHeight }) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.splitedText = text.split(' ');
    this.font = font;
    this.textColor = textColor;
    this.textActiveColor = textActiveColor;
    this.lineHeight = lineHeight;
  }

  drow(ctx) {
    this.ctx = ctx;
    this.startDrow();
    this.styleText();
    this.fillText();
  }

  startDrow() {
    this.ctx.font = this.font;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';
  }

  styleText() {
    this.ctx.fillStyle = this.textColor;
  }

  getHeight() {
    return this.splitedText.length * this.lineHeight + 6;
  }

  getY() {
    return this.y - this.getHeight() / 2;
  }

  getTextY() {
    return this.getY() + 3;
  }

  fillText() {
    const y = this.getTextY();
    this.splitedText.forEach((w, i) => {
      this.ctx.fillText(w, this.x, y + this.lineHeight * i);
    });
  }

  activate() {
    this.startDrow();
    this.ctx.fillStyle = this.textActiveColor;
    this.fillText();
  }

  isActivated(data) {
    if (Array.isArray(data)) {
      return data.includes(this.text);
    }

    return this.text === data;
  }
}
