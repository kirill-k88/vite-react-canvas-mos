import { SkillCircle } from './SkillCircle';

export class JobCircle extends SkillCircle {
  constructor(
    { x, y, r, lineColor, fillColor, lineWidth, fillActive, lineActive, activeR, backColor },
    isFilled
  ) {
    super({ x, y, r, lineColor, fillColor, lineWidth }, isFilled);
    this.fillActive = fillActive;
    this.lineActive = lineActive;
    this.activeR = activeR;
    this.backColor = backColor;
  }

  activate() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.activeR, 0, Math.PI * 2, false);
    this.activeFillBack();
    this.finishDrow();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    this.activeFill();
    this.finishDrow();
  }

  disactivate() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.activeR, 0, Math.PI * 2, false);
    this.inactiveFillBack();
    this.finishDrow();
    super.disactivate();
  }

  activeFillBack() {
    if (this.isFilled) {
      this.ctx.fillStyle = this.backColor;
      this.ctx.fill();
    }

    if (this.lineActive) {
      this.ctx.strokeStyle = this.lineActive;
    }

    this.ctx.lineWidth = this.lineWidth;
  }

  inactiveFillBack() {
    if (this.isFilled) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      this.ctx.fill();
    }

    if (this.lineActive) {
      this.ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
    }

    this.ctx.lineWidth = this.lineWidth;
  }
}
