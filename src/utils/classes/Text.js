export class Text {
  constructor({ x, y, text, font, textColor, textActiveColor, lineHeight }) {
    this.x = x;
    this.y = y;
    this.text = text;
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
    this.ctx.textBaseline = 'middle';
  }

  styleText() {
    this.ctx.fillStyle = this.textColor;
  }

  fillText() {
    const lines = this.text.split(' ');
    const y = lines.length > 1 ? this.y - (lines.length / 2) * this.lineHeight : this.y;
    lines.forEach((w, i) => {
      console.log();
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
