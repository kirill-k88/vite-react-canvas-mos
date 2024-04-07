import { useEffect } from 'react';
import { useRef } from 'react';
import { Circle } from '../../utils/functions/Circle';
import { circleClickHandle } from '../../utils/functions/canvFunctions';
import {
  CANVAS_CENTER,
  CANVAS_HEIGHT,
  CANVAS_WIdTH,
  EXTERNAL_CIRCLE_COLOR,
  EXTERNAL_LINE_WIDTH,
  EXTERNAL_RADIUS,
  INTERNAL_LINE_WIDTH,
  INTERNAL_RADIUS,
  INTERNAL_CIRCLE_COLOR
} from '../../utils/constants.js/constants';
import { JobCircle } from '../../utils/functions/JobCircle';
import styles from './MainCanv.module.scss';
import {
  getSkillsParams,
  getJobs,
  getSkillsTextParams,
  getJobTextParams
} from '../../utils/functions/functions';
import { Text } from '../../utils/functions/Text';
import { SkillCircle } from '../../utils/functions/SkillCircle';

export const MainCanv = () => {
  const canvas = useRef();

  const internalCercle = new Circle(
    {
      x: CANVAS_CENTER,
      y: CANVAS_CENTER,
      r: INTERNAL_RADIUS,
      fillColor: null,
      lineColor: INTERNAL_CIRCLE_COLOR,
      lineWidth: INTERNAL_LINE_WIDTH
    },
    false
  );

  const externalCercle = new Circle(
    {
      x: CANVAS_CENTER,
      y: CANVAS_CENTER,
      r: EXTERNAL_RADIUS,
      fillColor: null,
      lineColor: EXTERNAL_CIRCLE_COLOR,
      lineWidth: EXTERNAL_LINE_WIDTH
    },
    false
  );

  const jobCercales = getJobs().map(j => new JobCircle(j, true));
  const jobTexts = getJobTextParams().map(j => new Text(j, true));
  const skillCercales = getSkillsParams().map(j => new SkillCircle(j, true));
  const skillsTexts = getSkillsTextParams().map(t => new Text(t, true));

  let canvasEle = null;
  let ctx = null;

  useEffect(() => {
    canvasEle = canvas.current;
    canvasEle.width = CANVAS_WIdTH;
    canvasEle.height = CANVAS_HEIGHT;
    ctx = canvasEle.getContext('2d');
    ctx.mozImageSmoothingEnabled = true;
    ctx.imageSmoothingEnabled = true;

    ctx.save();
    internalCercle.drow(ctx);
    externalCercle.drow(ctx);
    ctx.restore();
    jobCercales.forEach(j => {
      j.drow(ctx);
    });
    ctx.restore();
    jobTexts.forEach(t => {
      t.drow(ctx);
    });
    ctx.restore();
    skillCercales.forEach(s => {
      s.drow(ctx);
    });
    ctx.restore();
    skillsTexts.forEach(t => {
      t.drow(ctx);
    });
  }, [jobCercales]);

  return (
    <canvas
      ref={canvas}
      onClick={e => circleClickHandle(e, ctx, canvasEle, jobCercales, skillCercales)}
      className={styles.canv}
    />
  );
};
