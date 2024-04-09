import { Circle } from './Circle';

export class SkillCircle extends Circle {
  constructor(
    {
      text,
      mainJob,
      otherJob,
      x,
      y,
      r,
      lineColor,
      fillColor,
      lineWidth,
      fillActive,
      lineActive,
      activeR,
      backColor
    },
    isFilled
  ) {
    super({ text, x, y, r, lineColor, fillColor, lineWidth }, isFilled);
    this.fillActive = fillActive;
    this.lineActive = lineActive;
    this.activeR = activeR;
    this.backColor = backColor;
    this.mainJob = mainJob;
    this.otherJob = otherJob;
  }

  activate() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.activeR, 0, Math.PI * 2, false);
    this.activeFillBack();
    this.finishDrow();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    this.highlightFill();
    this.finishDrow();
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

  highlight() {
    this.startDrow();
    this.highlightFill();
    this.finishDrow();
  }

  highlightFill() {
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

  isInlList(mainList, otherList) {
    if (mainList.includes(this.text)) return 1;
    if (otherList.includes(this.text)) return 2;
    return 0;
  }

  getAllJobs() {
    return [...this.mainJob, ...this.otherJob];
  }
}
