/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
import { DataTypes } from 'sequelize';
import sequelize from './db';
import { UserFunction } from '../models/user';

const User = UserFunction(sequelize, DataTypes);

async function clearDatabase() {
  await User.destroy({ where: {} });
}

async function initDatabase() {
  await clearDatabase();

  await User.create({
  });
}

export {
  clearDatabase, initDatabase,
};
