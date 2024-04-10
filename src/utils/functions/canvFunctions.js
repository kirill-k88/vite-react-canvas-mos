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
    const job = jobCircles[i];
    if (job.hasClicked(x, y)) {
      redrowFigures(ctx, canvasEl, figures);
      job.activate();
      for (let j = 0; j < skillsTexts.length; j++) {
        const isInSkills = skillCircles[j].isInlList(job.mainSkills, job.otherSkills);
        if (isInSkills) {
          skillCircles[j].highlight();
          drowLine(
            job.x,
            job.y,
            job.activeR,
            skillCircles[j].x,
            skillCircles[j].y,
            skillCircles[j].r,
            ctx,
            isInSkills === 1 ? [MAIN_LINE, MAIN_LINE_WIDTH] : [OTHER_LINE, OTHER_LINE_WIDTH]
          );
        }
        if (skillsTexts[j].isActivated(job.getRelations())) {
          skillsTexts[j].activate();
        }
      }
      if (jobTexts[i].isActivated(job.text)) {
        jobTexts[i].activate();
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
            jobCircles[j].r,
            skill.x,
            skill.y,
            skill.activeR,
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

export const drowLine = (x1, y1, r1, x2, y2, r2, ctx, lineStyle) => {
  const a = x2 - x1;
  const b = y2 - y1;
  const c = Math.sqrt(a ** 2 + b ** 2);
  const x1Offset = a * (r1 / c);
  const y1Offset = b * (r1 / c);

  const x2Offset = a * (r2 / c);
  const y2Offset = b * (r2 / c);

  const [color, width] = lineStyle;
  ctx.beginPath();
  ctx.moveTo(x1 + x1Offset, y1 + y1Offset);
  ctx.lineTo(x2 - x2Offset, y2 - y2Offset);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
};
