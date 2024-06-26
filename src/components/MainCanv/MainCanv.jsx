import { useLayoutEffect } from 'react';
import { useRef } from 'react';
import { circleClickHandle, initCanvas, redrowFigures } from '../../utils/functions/canvFunctions';
import { JobCircle } from '../../utils/classes/JobCircle';
import styles from './MainCanv.module.scss';
import {
  getSkillsParams,
  getAllSkills,
  getJobs,
  getSkillsTextParams,
  getJobTextParams,
  getInternalCircle,
  getExternalCircle,
  getSkillDictionary
} from '../../utils/functions/functions';
import { Text } from '../../utils/classes/Text';
import { SkillCircle } from '../../utils/classes/SkillCircle';
import { JobText } from '../../utils/classes/JobText';

export const MainCanv = () => {
  const canvas = useRef();

  const internalCircle = getInternalCircle();
  const externalCircle = getExternalCircle();

  const jobCircles = getJobs().map(j => new JobCircle(j, true));
  const jobTexts = getJobTextParams().map(j => new JobText(j, true));
  const skills = getAllSkills();
  const skillDictionary = getSkillDictionary(skills);
  const skillCircles = getSkillsParams(skills, skillDictionary).map(j => new SkillCircle(j, true));
  const skillsTexts = getSkillsTextParams().map(t => new Text(t, true));

  useLayoutEffect(() => {
    const [context, canvasElement] = initCanvas(canvas);

    const figures = {
      jobCircles,
      jobTexts,
      skillCircles,
      skillsTexts,
      internalCircle,
      externalCircle,
      skills
    };

    redrowFigures(context, canvasElement, figures);

    function clickhandle(e) {
      circleClickHandle(e, context, canvasElement, figures);
    }

    canvasElement.addEventListener('click', clickhandle);

    return () => {
      canvasElement.removeEventListener('click', clickhandle);
    };
  }, []);

  return (
    <canvas
      ref={canvas}
      className={styles.canv}
    />
  );
};
