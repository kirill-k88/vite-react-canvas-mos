import { SkillCircle } from './SkillCircle';

export class JobCircle extends SkillCircle {
  constructor(
    {
      text,
      mainSkills,
      otherSkills,
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
    super(
      {
        text,
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
    );
    this.mainSkills = mainSkills;
    this.otherSkills = otherSkills;
  }

  getRelations() {
    return [...this.mainSkills, ...this.otherSkills];
  }
}
