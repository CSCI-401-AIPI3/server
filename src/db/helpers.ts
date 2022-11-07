/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
import { DataTypes } from 'sequelize';
import { AnswerType, Category, TechMaturity } from '../../utils/enum';
import sequelize from './db';
import { UserFunction } from '../models/user';
import { QuestionFunction } from '../../src/models/questions';
import { UserAnswerFunction } from '../../src/models/userAnswer';
import { IndustryAverageFunction } from '../../src/models/industryAverages';
import { UserResultFunction } from '../../src/models/userResults';

const User = UserFunction(sequelize, DataTypes);
const Question = QuestionFunction(sequelize, DataTypes);
const Answer = UserAnswerFunction(sequelize, DataTypes);
const IndustryAverage = IndustryAverageFunction(sequelize, DataTypes);
const UserResult = UserResultFunction(sequelize, DataTypes);

const email = 'rzhang139@gmail.com';

async function clearDatabase() {
  await User.destroy({ where: {} });
  await Question.destroy({ where: {} });
  await Answer.destroy({ where: {} });
  await IndustryAverage.destroy({ where: {} });
  await UserResult.destroy({ where: {} });
}

async function initDatabase() {
  await clearDatabase();

  await User.create({
    name: 'richard',
    company: 'Amazon',
    email,
    password: '$2a$08$5nZvEem1PqgiT1xW6sk2uu7IhT1IbbgArxk0PSjeFI7FOmFL.oV2S',
    technicalMaturity: TechMaturity.INITIAL,
    pointOfContact: 'adam',
  });

  await Question.bulkCreate([
    {
      category: Category.FRONTEND,
      questionString: 'How do users interact with your company online?',
      answerType: AnswerType.MC,
      answerOptionsList: [
        'Chat-bots',
        'Data entry',
        'Data viewing',
        'Routing to third-party software',
      ],
      weight: 1,
    },
    {
      category: Category.FRONTEND,
      questionString: 'Are user interfaces optimized across devices?',
      answerType: AnswerType.SC,
      answerOptionsList: [
        'Yes, our user-facing interfaces are optimized for mobile, tablet, and desktop',
        'Our interfaces are optimized for some but not all of the above categories',
        'No, we only work on desktop',
      ],
      weight: 1,
    },
    {
      category: Category.FRONTEND,
      questionString:
        'Are you satisfied with your current automated testing suite?',
      answerType: AnswerType.SC,
      answerOptionsList: ['Yes', 'No', "I'm not sure"],
      weight: 1,
    },
    {
      category: Category.FRONTEND,
      questionString: 'How long does it take to resolve user-flagged bugs?',
      answerType: AnswerType.SC,
      answerOptionsList: [
        'Less than 24 hours',
        'Within the week',
        'Bugs are not prioritized and are resolved when convenient',
      ],
      weight: 1,
    },
    {
      category: Category.BACKEND,
      questionString:
        'Is backend documentation easily accessed and consulted by non-technical users?',
      answerType: AnswerType.SC,
      answerOptionsList: [
        'Yes, we have comprehensive documentation that improves how we onboard new employees and customers',
        'We have documentation but it is not accessible by non-technical users',
        'No, we do not have documentation',
      ],
      weight: 1,
    },
    {
      category: Category.BACKEND,
      questionString: 'Is your backend infrastructure efficient and scalable?',
      answerType: AnswerType.SC,
      answerOptionsList: [
        'Yes, we have optimized it routinely to accomodate the scale we expect to meet',
        'We have a bulky infrastructure which may need some cost or speed optimization',
        'No, we have not optimized our backend infrastructure past a minimum viable stage',
      ],
      weight: 1,
    },
    {
      category: Category.NETWORKING,
      questionString:
        'Is application availability (downtime of user-facing apps and internal APIs) being monitored?',
      answerType: AnswerType.SC,
      answerOptionsList: ['Yes', 'No'],
      weight: 1,
    },
    {
      category: Category.NETWORKING,
      questionString: 'Which best describes your wired infrastructure?',
      answerType: AnswerType.SC,
      answerOptionsList: [
        'Focus is on reducing risk and increasing quality of service. Uptime requirements are > 99.999%',
        'Our infrastructure handles redundancy and fault-tolerance to accomodate heavy traffic',
        'Our company has basic wireless access that is unautomated',
      ],
      weight: 1,
    },
    {
      category: Category.NETWORKING,
      questionString: 'Which best describes your wireless infrastructure?',
      answerType: AnswerType.SC,
      answerOptionsList: [
        'We balance reliance between on-prem and cloud infrastructure to achieve fast network speeds with tight security and high bandwidth.',
        'The system dials up bandwidth and security in real time with secure roaming and seamless authentication',
        'We have basic wireless access with guest use policies and simple management',
      ],
      weight: 1,
    },
    {
      category: Category.SECURITY,
      questionString:
        'Has your company experienced any phishing, ransomware, DDoS, or Injection attacks in the past year?',
      answerType: AnswerType.SC,
      answerOptionsList: [
        'Yes, the company has experienced attacks this year and stopped it.',
        'Yes, the company has experienced attacks this year but did not stop it.',
        'No, but the company has experienced attacks in the past.',
        'No, the company has never experienced an attack.',
      ],
      weight: 1,
    },
    {
      category: Category.SECURITY,
      questionString:
        'Does your company have dedicated cybersecurity engineers?',
      answerType: AnswerType.SC,
      answerOptionsList: ['Yes', 'No'],
      weight: 1,
    },
    {
      category: Category.SECURITY,
      questionString:
        'Does your company have mandatory cybersecurity training?',
      answerType: AnswerType.SC,
      answerOptionsList: [
        'Yes, all employees complete some level of training',
        'Yes, technical employees complete some level of training',
        'No, there is no dedicated training',
      ],
      weight: 1,
    },
    {
      category: Category.DATA_AND_ML,
      questionString: 'How is most data generated in your company?',
      answerType: AnswerType.SC,
      answerOptionsList: [
        'Machine learning triggers',
        'Automatic business app observation',
        'Manual inputs from the field',
      ],
      weight: 1,
    },
    {
      category: Category.DATA_AND_ML,
      questionString:
        'How is time divided between ad-hoc reporting, strategic analysis, and production model development?',
      answerType: AnswerType.SC,
      answerOptionsList: [
        'It is split evenly',
        'It is split between reporting and analysis',
        'It is focused on reporting',
      ],
      weight: 1,
    },
    {
      category: Category.TOOLS,
      questionString:
        'Which of the following tools do you not use or are dissatisfied with?',
      answerType: AnswerType.MC,
      answerOptionsList: [
        'Task management',
        'Deployment management',
        'Code management',
        'Testing infrastructure',
        'Data monitoring',
      ],
      weight: 1,
    },
    {
      category: Category.PEOPLE,
      questionString:
        'Do decision makers favor experience or data in day-to-day decisions?',
      answerType: AnswerType.SC,
      answerOptionsList: ['Experience', 'Data'],
      weight: 1,
    },
    {
      category: Category.PEOPLE,
      questionString:
        'Do decision makers favor experience or data in strategic decisions?',
      answerType: AnswerType.SC,
      answerOptionsList: ['Experience', 'Data'],
      weight: 1,
    },
    {
      category: Category.PROCESSES,
      questionString: 'Does your company engage in any of the following?',
      answerType: AnswerType.MC,
      answerOptionsList: [
        'Exploratory analytics',
        'Bug bashes',
        'New feature hackathons',
        'Learning events',
      ],
      weight: 1,
    },
    {
      category: Category.INFRASTRUCTURE_FIT,
      questionString:
        'When are tasks completed relative to their projected completion times?',
      answerType: AnswerType.SC,
      answerOptionsList: [
        'Ahead of schedule',
        'Within the week',
        '2-4 weeks',
        '1+ months',
      ],
      weight: 1,
    },
    {
      category: Category.INFRASTRUCTURE_FIT,
      questionString:
        'What percentage of normal, in-person functions can customers perform on their own through digital platforms?',
      answerType: AnswerType.SC,
      answerOptionsList: ['100%', '75%', '50%', '25%', '0%'],
      weight: 1,
    },
    {
      category: Category.INFRASTRUCTURE_FIT,
      questionString:
        'Are there problems that the company addresses more efficiently via digital solutions than in-person interactions?',
      answerType: AnswerType.SC,
      answerOptionsList: [
        'Yes, taking cost efficiency and user satisfaction into account',
        'Yes, taking either efficiency or satisfaction into account',
        'No, customers always prefer our in-person solutions',
      ],
      weight: 1,
    },
    {
      category: Category.INFRASTRUCTURE_FIT,
      questionString:
        'Does your business use digital solutions for any of these business problems?',
      answerType: AnswerType.MC,
      answerOptionsList: [
        'Customer acquisition',
        'Financial fraud detection',
        'Customer support',
        'Process automation',
        'Customer data insights',
        'Credit underwriting',
        'Algorithmic pricing',
      ],
      weight: 1,
    },
  ]);

  await Answer.create({
    userAnswerID: 1 + ' ' + 1,
    questionID: 1,
    userID: 1,
    answerList: ['yes'],
  });

  await IndustryAverage.bulkCreate([
    {
      category: Category.FRONTEND,
      score: 0,
      entries: 0,
    },
    {
      category: Category.BACKEND,
      score: 0,
      entries: 0,
    },
    {
      category: Category.NETWORKING,
      score: 0,
      entries: 0,
    },
    {
      category: Category.DATA_AND_ML,
      score: 0,
      entries: 0,
    },
    {
      category: Category.PROCESSES,
      score: 0,
      entries: 0,
    },
    {
      category: Category.INFRASTRUCTURE_FIT,
      score: 0,
      entries: 0,
    },
    {
      category: Category.SECURITY,
      score: 0,
      entries: 0,
    },
    {
      category: Category.PEOPLE,
      score: 0,
      entries: 0,
    },
    {
      category: Category.TOOLS,
      score: 0,
      entries: 0,
    },
  ]);

  await UserResult.create({
    userResultID: 1 + ' ' + Category.DATA_AND_ML,
    userID: 1,
    score: 1,
    category: Category.DATA_AND_ML,
  });
}

export { clearDatabase, initDatabase, email };
