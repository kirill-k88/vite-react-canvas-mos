import { Circle } from './Circle';

export class SkillCircle extends Circle {
  constructor(
    { text, x, y, r, lineColor, fillColor, lineWidth, fillActive, lineActive },
    isFilled
  ) {
    super({ text, x, y, r, lineColor, fillColor, lineWidth }, isFilled);
    this.fillActive = fillActive;
    this.lineActive = lineActive;
  }

  activate() {
    this.startDrow();
    this.activeFill();
    this.finishDrow();
  }

  activeFill() {
    if (this.isFilled) {
      this.ctx.fillStyle = this.fillActive;
      this.ctx.fill();
    }

    if (this.lineActive) {
      this.ctx.strokeStyle = this.lineActive;
    }

    this.ctx.lineWidth = this.lineWidth;
  }

  hasClicked(xmouse, ymouse) {
    const dist = Math.sqrt((xmouse - this.x) ** 2 + (ymouse - this.y) ** 2);
    if (dist < this.r) {
      return true;
    }
    return false;
  }

  isInlList(skillList) {
    return skillList.includes(this.text);
  }
}
