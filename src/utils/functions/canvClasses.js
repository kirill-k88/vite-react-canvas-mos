export class Circle {
  constructor({ x, y, r, circleColor }) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.circleColor - circleColor;
  }

  drow(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.circleColor;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  hasClicked(xmouse, ymouse, fn) {
    const dist = Math.sqrt((xmouse - this.x) ** 2 + (ymouse - this.y) ** 2);
    if (dist < this.r) {
      return true;
    }
    return false;
  }
}
