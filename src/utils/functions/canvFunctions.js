export const createCircle = (ctx, params) => {
  const { x, y, r, circleColor } = params;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = circleColor;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
};
