import { Dialect, Sequelize } from 'sequelize';

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const dbHost = process.env.NODE_ENV === 'prod' ? process.env.RDS_HOSTNAME : process.env.POSTGRES_HOST;
const dbDialect = process.env.POSTGRES_DIALECT as Dialect;
const dbPort = process.env.NODE_ENV === 'prod' ? process.env.RDS_PORT : process.env.POSTGRES_PORT;
const dbName = process.env.NODE_ENV === 'prod' ? process.env.RDS_DB_NAME : process.env.POSTGRES_DB;

const sequelizeConfig = {
  host: dbHost,
  dialect: dbDialect || 'postgres',
  port: parseInt(dbPort, 10),
  logging: process.env.NODE_ENV === 'dev' ? console.log : false,
};

// url: "postgres://postgres:<password>@<host>/<db>"
const sequelize = new Sequelize(
  process.env.NODE_ENV === 'test' ? process.env.POSTGRES_TEST_DB : dbName,
  process.env.NODE_ENV === 'prod' ? process.env.RDS_USERNAME : process.env.POSTGRES_USER,
  process.env.NODE_ENV === 'prod' ? process.env.RDS_PASSWORD : process.env.POSTGRES_PASSWORD,
  sequelizeConfig,
);

export default sequelize;
