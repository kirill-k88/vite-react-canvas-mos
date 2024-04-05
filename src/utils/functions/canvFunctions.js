import {
  ACTIVE_JOB_COLOR,
  CANVAS_CENTER,
  CANVAS_WIdTH,
  DATA,
  INACTIVE_JOB_COLOR,
  INERNAL_RADIUS,
  JOB_LINE_WIDTH,
  JOB_RADIUS
} from '../constants.js/constants';

export const circleClickHandle = (e, ctx, canvasEle, circles) => {
  const { clientX, clientY } = e;
  const boundingClientRect = canvasEle.getBoundingClientRect();
  const x = clientX - boundingClientRect.left;
  const y = clientY - boundingClientRect.top;

  circles.forEach((c, i) => {
    if (c.hasClicked(x, y)) {
      //c.activate();
      console.log(`circle_${i}`);
    } else {
      //c.disactivate();
    }
  });
};

export const getJobs = () => {
  const angle = (2 * Math.PI) / DATA.length;

  const circles = DATA.map((job, i) => {
    const x = INERNAL_RADIUS * Math.cos(angle * i) + CANVAS_CENTER;
    const y = INERNAL_RADIUS * Math.sin(angle * i) + CANVAS_CENTER;

    return {
      x,
      y,
      r: JOB_RADIUS,
      fillColor: INACTIVE_JOB_COLOR,
      lineColor: INACTIVE_JOB_COLOR,
      lineWidth: JOB_LINE_WIDTH,
      fillActive: ACTIVE_JOB_COLOR,
      lineActive: ACTIVE_JOB_COLOR
    };
  });

  return circles;
};
