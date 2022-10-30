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

  await Question.create({
    category: Category.DATABASE,
    questionString: 'how old are you?',
    answerType: AnswerType.MC,
    answerOptionsList: ['12'],
    weight: 1,
  });

  await Answer.create({
    questionID: 1,
    userID: 1,
    answerList: ['yes'],
  });

  await IndustryAverage.create({
    category: Category.DATABASE,
    score: 1,
    entries: 2,
  });

  await UserResult.create({
    userID: 1,
    score: 1,
    category: Category.DATABASE,
    timestamp: 30,
  });
}

export {
  clearDatabase, initDatabase, email,
};
