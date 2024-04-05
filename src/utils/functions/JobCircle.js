import { Circle } from './Circle';

export class JobCircle extends Circle {
  constructor({ x, y, r, lineColor, fillColor, lineWidth, fillActive, lineActive }) {
    super({ x, y, r, lineColor, fillColor, lineWidth });
    this.fillActive = fillActive;
    this.lineActive = lineActive;
  }

  activate() {
    if (this.fillActive) {
      this.drow(this.ctx);
      this.ctx.fillStyle = this.fillActive;
      this.ctx.fill();
    }
  }

  disactivate() {
    this.drow(this.ctx);
    this.ctx.fillColor = this.fillColor;
    this.ctx.fill();
  }

  hasClicked(xmouse, ymouse, clickHandle) {
    const dist = Math.sqrt((xmouse - this.x) ** 2 + (ymouse - this.y) ** 2);
    if (dist < this.r) {
      this.activate();
      return true;
    }
    this.disactivate();
    return false;
  }
}
