/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
import { DataTypes } from 'sequelize';
import { AnswerType, Category, TechMaturity } from '../../utils/enum';
import sequelize from './db';
import { UserFunction } from '../models/user';
import { QuestionFunction } from '../../src/models/questions';
import { UserAnswerFunction } from '../../src/models/userAnswer';

const User = UserFunction(sequelize, DataTypes);
const Question = QuestionFunction(sequelize, DataTypes);
const Answer = UserAnswerFunction(sequelize, DataTypes);

async function clearDatabase() {
  await User.destroy({ where: {} });
}

async function initDatabase() {
  await clearDatabase();

  await User.create({
    name: 'richard',
    company: 'Amazon',
    email: 'rzhang139@gmail.com',
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
    userID: 1,
    answerList: ['yes'],
  });
}

export {
  clearDatabase, initDatabase,
};
