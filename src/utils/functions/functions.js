import {
  ACTIVE_JOB_BACKCOLOR,
  ACTIVE_JOB_COLOR,
  ACTIVE_SKILL_BACKCOLOR,
  ACTIVE_SKILL_COLOR,
  CANVAS_CENTER,
  CANVAS_WIdTH,
  DATA,
  EXTERNAL_CIRCLE_COLOR,
  EXTERNAL_LINE_WIDTH,
  EXTERNAL_RADIUS,
  EXTERNAL_TEXT_ACTIVE_COLOR,
  EXTERNAL_TEXT_COLOR,
  EXTERNAL_TEXT_FONT,
  EXTERNAL_TEXT_LINEHEIGHT,
  EXTERNAL_TEXT_RADIUS,
  INACTIVE_JOB_COLOR,
  INACTIVE_SKILL_COLOR,
  INTERNAL_CIRCLE_COLOR,
  INTERNAL_LINE_WIDTH,
  INTERNAL_RADIUS,
  INTERNAL_TEXT_ACTIVE_COLOR,
  INTERNAL_TEXT_COLOR,
  INTERNAL_TEXT_FONT,
  INTERNAL_TEXT_LINEHEIGHT,
  INTERNAL_TEXT_RADIUS,
  JOB_ACTIVE_RADIUS,
  JOB_LINE_WIDTH,
  JOB_RADIUS,
  SKILL_ACTIVE_RADIUS,
  SKILL_LINE_WIDTH,
  SKILL_RADIUS
} from '../constants.js/constants';
import { Circle } from '../classes/Circle';

export const getAllSkills = () => {
  const skillList = [];
  DATA.forEach(j => {
    j.mainSkills.forEach(ms => {
      skillList.push(ms);
    });
    j.otherSkills.forEach(os => {
      skillList.push(os);
    });
  });

  const skillSet = new Set(skillList);

  return Array.from(skillSet);
};

export const getSkillDictionary = allSkills => {
  const dictionary = {};
  allSkills.forEach(s => {
    DATA.forEach(j => {
      if (j.mainSkills.includes(s)) {
        if (dictionary[s]) {
          if (dictionary[s].main) {
            dictionary[s].main.push(j.name);
          } else {
            dictionary[s].main = [j.name];
          }
        } else {
          dictionary[s] = { main: [j.name] };
        }
      }
      if (j.otherSkills.includes(s)) {
        if (dictionary[s]) {
          if (dictionary[s].other) {
            dictionary[s].other.push(j.name);
          } else {
            dictionary[s].other = [j.name];
          }
        } else {
          dictionary[s] = { other: [j.name] };
        }
      }
    });
  });

  return dictionary;
};

export const getSkillsParams = (skills, skillDictionary) => {
  const angle = (2 * Math.PI) / skills.length;

  const circles = skills.map((skill, i) => {
    const x = EXTERNAL_RADIUS * Math.cos(angle * i) + CANVAS_CENTER;
    const y = EXTERNAL_RADIUS * Math.sin(angle * i) + CANVAS_CENTER;

    return {
      text: skill,
      mainJob: skillDictionary[skill].main || [],
      otherJob: skillDictionary[skill].other || [],
      x,
      y,
      r: SKILL_RADIUS,
      fillColor: INACTIVE_SKILL_COLOR,
      lineColor: INACTIVE_SKILL_COLOR,
      lineWidth: SKILL_LINE_WIDTH,
      fillActive: ACTIVE_SKILL_COLOR,
      lineActive: ACTIVE_SKILL_COLOR,
      activeR: SKILL_ACTIVE_RADIUS,
      backColor: ACTIVE_SKILL_BACKCOLOR
    };
  });

  return circles;
};

export const getJobs = () => {
  const angle = (2 * Math.PI) / DATA.length;

  const circles = DATA.map((job, i) => {
    const x = INTERNAL_RADIUS * Math.cos(angle * i) + CANVAS_CENTER;
    const y = INTERNAL_RADIUS * Math.sin(angle * i) + CANVAS_CENTER;

    return {
      text: job.name,
      mainSkills: job.mainSkills,
      otherSkills: job.otherSkills,
      x,
      y,
      r: JOB_RADIUS,
      fillColor: INACTIVE_JOB_COLOR,
      lineColor: INACTIVE_JOB_COLOR,
      lineWidth: JOB_LINE_WIDTH,
      fillActive: ACTIVE_JOB_COLOR,
      lineActive: ACTIVE_JOB_COLOR,
      activeR: JOB_ACTIVE_RADIUS,
      backColor: ACTIVE_JOB_BACKCOLOR
    };
  });

  return circles;
};

export const getSkillsTextParams = () => {
  const skills = getAllSkills();
  const angle = (2 * Math.PI) / skills.length;

  const skillsTexts = skills.map((skill, i) => {
    const x = EXTERNAL_TEXT_RADIUS * Math.cos(angle * i) + CANVAS_CENTER;
    const y = EXTERNAL_TEXT_RADIUS * Math.sin(angle * i) + CANVAS_CENTER;

    return {
      x,
      y,
      text: skill,
      font: EXTERNAL_TEXT_FONT,
      textColor: EXTERNAL_TEXT_COLOR,
      textActiveColor: EXTERNAL_TEXT_ACTIVE_COLOR,
      lineHeight: EXTERNAL_TEXT_LINEHEIGHT
    };
  });

  return skillsTexts;
};

export const getJobTextParams = () => {
  const angle = (2 * Math.PI) / DATA.length;

  const jobTexts = DATA.map((job, i) => {
    const x = INTERNAL_TEXT_RADIUS * Math.cos(angle * i) + CANVAS_CENTER;
    const y = INTERNAL_TEXT_RADIUS * Math.sin(angle * i) + CANVAS_CENTER;

    return {
      x,
      y,
      text: job.name,
      font: INTERNAL_TEXT_FONT,
      textColor: INTERNAL_TEXT_COLOR,
      textActiveColor: INTERNAL_TEXT_ACTIVE_COLOR,
      lineHeight: INTERNAL_TEXT_LINEHEIGHT
    };
  });

  return jobTexts;
};

export const getInternalCircle = () =>
  new Circle(
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

export const getExternalCircle = () =>
  new Circle(
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
