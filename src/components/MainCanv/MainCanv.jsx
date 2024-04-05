import { useEffect, useMemo } from 'react';
import { useRef } from 'react';
import { createCircle } from '../../utils/functions/canvFunctions';
import { Circle } from '../../utils/functions/canvClasses';

export const MainCanv = () => {
  const canvas = useRef();

  const circles = [
    { x: 100, y: 100, r: 50, circleColor: '#000' },
    { x: 300, y: 100, r: 50, circleColor: '#000' }
  ];

  const cirkleClickHandle = (e, ctx, canvasEle, circles) => {
    const { clientX, clientY } = e;
    console.log(clientX, clientY);
    const boundingClientRect = canvasEle.getBoundingClientRect();
    const x = clientX - boundingClientRect.left;
    const y = clientY - boundingClientRect.top;
  };

  useEffect(() => {
    let canvasEle = canvas.current;
    canvasEle.width = 750;
    canvasEle.height = 750;
    const ctx = canvasEle.getContext('2d');
    canvasEle.addEventListener('click', e => cirkleClickHandle(e, ctx, canvasEle, circles));

    const cercle1 = new Circle(circles[0]);
    cercle1.drow(ctx);
    const cercle2 = new Circle(circles[1]);
    cercle2.drow(ctx);
  }, [circles]);

  return <canvas ref={canvas} />;
};
