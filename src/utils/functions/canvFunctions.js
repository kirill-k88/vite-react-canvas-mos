import { CANVAS_HEIGHT, CANVAS_WIdTH } from '../constants.js/constants';

export const circleClickHandle = (e, ctx, canvasEl, figures) => {
  const { clientX, clientY } = e;
  const boundingClientRect = canvasEl.getBoundingClientRect();
  const x = clientX - boundingClientRect.left;
  const y = clientY - boundingClientRect.top;
  const { jobCircles, skillCircles, skillsTexts } = figures;

  for (let i = 0; i < jobCircles.length; i++) {
    if (jobCircles[i].hasClicked(x, y)) {
      redrowFigures(ctx, canvasEl, figures);
      jobCircles[i].activate();
      for (let j = 0; j < skillsTexts.length; j++) {
        if (skillsTexts[j].isActivated(jobCircles[i].getRelations())) {
          skillsTexts[j].activate();
        }
        if (skillCircles[j].isInlList(jobCircles[i].getRelations())) {
          skillCircles[j].highlight();
        }
      }
      break;
    }
  }

  for (let i = 0; i < skillCircles.length; i++) {
    if (skillCircles[i].hasClicked(x, y)) {
      const skill = skillCircles[i];
      redrowFigures(ctx, canvasEl, figures);
      skill.activate();
      for (let j = 0; j < skillsTexts.length; j++) {
        if (skillsTexts[j].isActivated(skill.text)) {
          skillsTexts[j].activate();
          break;
        }
      }
      for (let j = 0; j < jobCircles.length; j++) {
        if (jobCircles[j].isInlList(skill.getAllJobs())) {
          jobCircles[j].highlight();
        }
      }
      break;
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
  jobsDrow(jobCircles, jobTexts, ctx);
  skillsDrow(skillCircles, skillsTexts, ctx);
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

export const jobsDrow = (jobCircales, jobTexts, context) => {
  jobCircales.forEach(j => {
    j.drow(context);
  });
  jobTexts.forEach(t => {
    t.drow(context);
  });
};

export const skillsDrow = (skillCircales, skillsTexts, context) => {
  skillCircales.forEach(s => {
    s.drow(context);
  });
  skillsTexts.forEach(t => {
    t.drow(context);
  });
};
