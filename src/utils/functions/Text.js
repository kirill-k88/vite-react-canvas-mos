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
    this.ctx.font = this.font;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = this.textColor;
    const lines = this.text.split(' ');
    const y = lines.length > 1 ? this.y - (lines.length / 2) * this.lineHeight : this.y;
    lines.forEach((w, i) => {
      console.log();
      this.ctx.fillText(w, this.x, y + this.lineHeight * i);
    });
  }
}
