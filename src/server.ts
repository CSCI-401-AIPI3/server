/* eslint-disable no-unused-vars */
import app from './app';
import sequelize from './db/db';
import { initDatabase } from './db/helpers';

const testing = process.env.NODE_ENV !== 'dev' && process.env.NODE_ENV !== 'prod';

app.listen(testing ? process.env.TEST_PORT : process.env.PORT, async () => {
  console.log(`listening at http://localhost:${testing ? process.env.TEST_PORT : process.env.PORT}`);
  try {
    await sequelize.sync();
    if (process.env.NODE_ENV === 'dev') {
      await initDatabase();
    }
    console.log('Connected to database');
  } catch (error) {
    console.error(`Error: Cannot connect to database ${error}`);
  }
});
