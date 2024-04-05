import { useEffect } from 'react';
import { useRef } from 'react';
import { Circle } from '../../utils/functions/Circle';
import { circleClickHandle, getJobs } from '../../utils/functions/canvFunctions';
import {
  CANVAS_CENTER,
  CANVAS_HEIGHT,
  CANVAS_WIdTH,
  INERNAL_LINE_WIDTH,
  INERNAL_RADIUS,
  INTERNAL_CIRCLE_COLOR
} from '../../utils/constants.js/constants';
import { JobCircle } from '../../utils/functions/JobCircle';

export const MainCanv = () => {
  const canvas = useRef();

  const internalCercle = new Circle({
    x: CANVAS_CENTER,
    y: CANVAS_CENTER,
    r: INERNAL_RADIUS,
    fillColor: null,
    lineColor: INTERNAL_CIRCLE_COLOR,
    lineWidth: INERNAL_LINE_WIDTH
  });

  const jobCercales = getJobs().map(j => new JobCircle(j));

  let canvasEle = null;
  let ctx = null;

  useEffect(() => {
    canvasEle = canvas.current;
    canvasEle.width = CANVAS_WIdTH;
    canvasEle.height = CANVAS_HEIGHT;
    ctx = canvasEle.getContext('2d');

    jobCercales.forEach(j => {
      j.drow(ctx);
    });
    internalCercle.drow(ctx);
  }, [jobCercales]);

  return <canvas ref={canvas} onClick={e => circleClickHandle(e, ctx, canvasEle, jobCercales)} />;
};
