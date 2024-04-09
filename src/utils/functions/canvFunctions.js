import {
  CANVAS_HEIGHT,
  CANVAS_WIdTH,
  MAIN_LINE,
  MAIN_LINE_WIDTH,
  OTHER_LINE,
  OTHER_LINE_WIDTH
} from '../constants.js/constants';

export const circleClickHandle = (e, ctx, canvasEl, figures) => {
  const { clientX, clientY } = e;
  const boundingClientRect = canvasEl.getBoundingClientRect();
  const x = clientX - boundingClientRect.left;
  const y = clientY - boundingClientRect.top;
  const { jobCircles, skillCircles, skillsTexts, jobTexts } = figures;

  for (let i = 0; i < jobCircles.length; i++) {
    if (jobCircles[i].hasClicked(x, y)) {
      redrowFigures(ctx, canvasEl, figures);
      jobCircles[i].activate();
      for (let j = 0; j < skillsTexts.length; j++) {
        const isInSkills = skillCircles[j].isInlList(
          jobCircles[i].mainSkills,
          jobCircles[i].otherSkills
        );
        if (isInSkills) {
          skillCircles[j].highlight();
          drowLine(
            jobCircles[i].x,
            jobCircles[i].y,
            skillCircles[j].x,
            skillCircles[j].y,
            ctx,
            isInSkills === 1 ? [MAIN_LINE, MAIN_LINE_WIDTH] : [OTHER_LINE, OTHER_LINE_WIDTH]
          );
        }
        jobTextsDrow(jobTexts, ctx);
        if (skillsTexts[j].isActivated(jobCircles[i].getRelations())) {
          skillsTexts[j].activate();
        }
      }
      return;
    }
  }

  for (let i = 0; i < skillCircles.length; i++) {
    if (skillCircles[i].hasClicked(x, y)) {
      const skill = skillCircles[i];
      redrowFigures(ctx, canvasEl, figures);
      skill.activate();
      for (let j = 0; j < jobCircles.length; j++) {
        const isInJob = jobCircles[j].isInlList(skill.mainJob, skill.otherJob);
        if (isInJob) {
          jobCircles[j].highlight();
          drowLine(
            jobCircles[j].x,
            jobCircles[j].y,
            skill.x,
            skill.y,
            ctx,
            isInJob === 1 ? [MAIN_LINE, MAIN_LINE_WIDTH] : [OTHER_LINE, OTHER_LINE_WIDTH]
          );
        }
      }
      for (let j = 0; j < skillsTexts.length; j++) {
        if (skillsTexts[j].isActivated(skill.text)) {
          skillsTexts[j].activate();
          break;
        }
      }
      return;
    }
  }
};

export const redrowFigures = (
  ctx,
  canvasEl,
  { jobCircles, jobTexts, skillCircles, skillsTexts, internalCircle, externalCircle }
) => {
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  internalCircle.drow(ctx);
  externalCircle.drow(ctx);
  jobsDrow(jobCircles, ctx);
  skillsDrow(skillCircles, ctx);
  jobTextsDrow(jobTexts, ctx);
  skillTextsDrow(skillsTexts, ctx);
};

export const initCanvas = canvas => {
  const canvasEl = canvas.current;
  canvasEl.width = CANVAS_WIdTH;
  canvasEl.height = CANVAS_HEIGHT;
  const ctx = canvasEl.getContext('2d');
  ctx.mozImageSmoothingEnabled = true;
  ctx.imageSmoothingEnabled = true;

  return [ctx, canvasEl];
};

export const jobsDrow = (jobCircales, context) => {
  jobCircales.forEach(j => {
    j.drow(context);
  });
};

export const jobTextsDrow = (jobTexts, context) => {
  jobTexts.forEach(t => {
    t.drow(context);
  });
};

export const skillsDrow = (skillCircales, context) => {
  skillCircales.forEach(s => {
    s.drow(context);
  });
};

export const skillTextsDrow = (skillsTexts, context) => {
  skillsTexts.forEach(t => {
    t.drow(context);
  });
};

export const drowLine = (x1, y1, x2, y2, ctx, lineStyle) => {
  const [color, width] = lineStyle;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
};
