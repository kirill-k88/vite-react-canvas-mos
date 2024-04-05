export class Circle {
  constructor({ x, y, r, lineColor, fillColor, lineWidth }) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.fillColor = fillColor;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
  }

  drow(ctx) {
    this.ctx = ctx;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    if (this.fillColor) {
      ctx.fillStyle = this.fillColor;
      ctx.fill();
    }
    if (this.lineColor) {
      ctx.strokeStyle = this.lineColor;
      ctx.lineWidth = this.lineWidth;
    }
    ctx.stroke();
    ctx.closePath();
  }
}
