export class Circle {
  constructor({ text, x, y, r, lineColor, fillColor, lineWidth }, isFilled) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.r = r;
    this.fillColor = fillColor;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.isFilled = isFilled;
  }

  drow(ctx) {
    this.ctx = ctx;
    this.startDrow();
    this.fill();
    this.finishDrow();
  }

  fill() {
    if (this.isFilled) {
      this.ctx.fillStyle = this.fillColor;
      this.ctx.fill();
    }

    if (this.lineColor) {
      this.ctx.strokeStyle = this.lineColor;
    }

    this.ctx.lineWidth = this.lineWidth;
  }

  startDrow() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
  }

  finishDrow() {
    this.ctx.closePath();
    this.ctx.stroke();
  }
}
