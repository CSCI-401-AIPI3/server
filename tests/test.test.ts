/* eslint-disable max-len */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import request from 'supertest';
import { DataTypes } from 'sequelize';
import { expect } from 'chai';
import sequelize from '../src/db/db';
import { initDatabase, clearDatabase, email } from '../src/db/helpers';
import app from '../src/app';
import { IUser, UserFunction } from '../src/models/user';
import { IUserAnswer } from '../src/models/userAnswer';

const User = UserFunction(sequelize, DataTypes);

describe('Tests', () => {
  let server;
  let agent;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await initDatabase();
  });

  beforeEach((done) => {
    server = app.listen(4000, () => {
      agent = request.agent(server);
      done();
    });
  });

  afterEach((done) => {
    server.close(done);
  });

  afterAll(async () => {
    // delete any test data
    await clearDatabase();
    await sequelize.close();
  });

  describe('questions', () => {
    it('get questions', async () => {
      const res = await agent.get('/questions');
      expect(res.status).equal(200);
      const questionsArray = JSON.parse(res.text);
      expect(questionsArray.length).equal(1);
    });
  });

  describe('answers', () => {
    it('getUserAnswers', async () => {
      const userID = 1;
      const res = await agent.get('/getUserAnswers').query({ userID });
      expect(res.status).equal(200);
      const userAnswersArray = JSON.parse(res.text) as IUserAnswer[];
      expect(userAnswersArray.length).equal(1);
      const { email: returnedEmail } = await User.findOne({ where: { userID } }) as IUser;
      expect(returnedEmail).equal(email);
    });
  });
});
