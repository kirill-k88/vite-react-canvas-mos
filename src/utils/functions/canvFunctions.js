export const circleClickHandle = (e, ctx, canvasEle, jobCircles, skillCircles) => {
  const { clientX, clientY } = e;
  const boundingClientRect = canvasEle.getBoundingClientRect();
  const x = clientX - boundingClientRect.left;
  const y = clientY - boundingClientRect.top;

  jobCircles.forEach((c, i) => {
    if (c.hasClicked(x, y)) {
    }
  });

  skillCircles.forEach((c, i) => {
    if (c.hasClicked(x, y)) {
    }
  });
};
