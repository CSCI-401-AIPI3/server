/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import express, { Application, Request, Response } from 'express';
// import { DataTypes } from 'sequelize';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { DataTypes } from 'sequelize';
import cors from 'cors';
import { body, check, validationResult } from 'express-validator';
import { IQuestion, QuestionFunction } from './models/questions';
import {
  IIndustryAverage,
  IndustryAverageFunction,
} from './models/industryAverages';
import { IUser, UserFunction } from './models/user';
import { IUserAnswer, UserAnswerFunction } from './models/userAnswer';
import { IUserResult, UserResultFunction } from './models/userResults';
import sequelize from './db/db';
import { TechMaturity, AnswerType } from '../utils/enum';

const Question = QuestionFunction(sequelize, DataTypes);
const IndustryAverage = IndustryAverageFunction(sequelize, DataTypes);
const User = UserFunction(sequelize, DataTypes);
const UserAnswer = UserAnswerFunction(sequelize, DataTypes);
const UserResult = UserResultFunction(sequelize, DataTypes);
require('babel-core/register');
require('babel-polyfill');

// Initializing express
const app: Application = express();

app.use(cors());

/**
 // Express Middleware
* */
app.use(morgan('dev'));
app.options('/*', (_, res) => {
  res.sendStatus(200);
});
const sessionConfig: any = {
  secret: 'keyboard cat',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 10000,
    sameSite: process.env.NODE_ENV === 'prod' ? 'none' : 'strict',
  },
  rolling: true,
  resave: false,
  saveUninitialized: true,
};
if (process.env.NODE_ENV === 'prod') {
  app.set('trust proxy', 1); // trust first proxy
  sessionConfig.cookie.secure = true; // serve secure cookies
}
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// MUST PLACE BODYPARSER AFTER WEBHOOK ROUTE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// HEALTH CHECK
app.get('/health', (req: Request, res: Response) => {
  res.status(200).send();
});

passport.use(
  'local-login',
  new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email

      usernameField: 'email',

      passwordField: 'password',

      passReqToCallback: true, // allows us to pass back the entire request to the callback
    },
    async (req, email, password, done) => {
      try {
        console.log(email);
        const user = await User.findOne({ where: { email } }) as IUser;
        console.log(user);
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        const passVal = user.validPassword(password); console.log('hello');
        if (!passVal) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log('hello');
        return done(null, user, { message: 'Login Successful.' });
      } catch (err) {
        console.log('err');
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user: IUser, done) => {
  done(null, user);
});

passport.deserializeUser((user: IUser, done) => {
  // eslint-disable-next-line no-shadow
  User.findByPk(user.userID).then((user: any) => {
    done(null, user);
  });
});

/**
 * Sign in using email and password.
 * @route POST /login
 * @params email, password
 */
app.post('/login', async (req: Request, res: Response, next: any) => {
  // const { email } = req.body;
  console.log('hello');
  await check('email', 'Email is not valid').isEmail().run(req);
  await check('password', 'Password cannot be blank').isLength({ min: 1 }).run(req);
  await body('email').normalizeEmail({ gmail_remove_dots: false }).run(req);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const message = errors['errors'][0].msg;
      throw new Error(message);
    }
    console.log('hello');
    passport.authenticate('local-login', async (err: Error, user: IUser, message: Object) => {
      if (err) {
        return res.status(401).json(message);
      }
      if (!user) {
        return res.status(401).json(message);
      }
      console.log('hello');
      req.logIn(user, async (_err) => {
        if (_err) { return res.status(401).json({ message: 'Error Loggin In' }); }
        res.status(200).send({ message: 'Login Successfully' });
      });
    })(req, res, next);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message });
  }
});

/**
 * Sign up using email and password.
 * @route POST /register
 * @params email, password
 */
app.post('/register', async (req: Request, res: Response) => {
  await check('email', 'Email is not valid').isEmail().run(req);
  await check('password', 'Password must be at least 8 characters long').isLength({ min: 8 }).run(req);
  await body('email').normalizeEmail({ gmail_remove_dots: false }).run(req);
  const errors = validationResult(req);

  const {
    email, password,
  } = req.body;
  try {
    if (!errors.isEmpty()) {
      const message = errors['errors'][0].msg;
      throw new Error(message);
    }
    let user = await User.findOne({ where: { email } }) as IUser;
    // check to see if theres already a user with that email
    if (user) {
      throw new Error('Email Exists');
    }
    // insert a new user!!! Registration is DONE
    user = await User.create({
      email,
      password,
    });
    // Log In !
    req.logIn(user, async (err) => {
      if (err) return res.status(400).json({ message: 'Error Logging In' });
      return res.status(200).json({ message: 'Register Successful.' });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message });
  }
});

/**
 * Logout
 * @route POST /logout
 */
app.post('/logout', (req: Request, res: Response) => {
  req.logout();
  res.status(200).send({ message: 'Logged out' });
});

const isAuthenticated = (req: Request, res: Response, next: any) => {
  if (req.user) return next();
  return res.status(401).json({
    success: false,
    message: 'User not authenticated',
  });
};

app.use(isAuthenticated);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'User authenticated',
  });
});

app.get('/questions', async (req: Request, res: Response) => {
  const questions = (await Question.findAll({})) as IQuestion[];
  res.status(200).json(questions);
});

app.get('/getUserAnswers', async (req: Request, res: Response) => {
  const answers = (await UserAnswer.findAll({
    where: {
      userID: req.query.userID,
    },
  })) as IUserAnswer[];
  res.status(200).json(answers);
});

app.post('/submitUserAnswers', async (req: Request, res: Response) => {
  const userAnswers = req.body.userAnswers;
  const user = req.body.userId;
  const timestamp = Date.now();
  const answerScores = {
    DATABASE: 0,
    DATA_ANALYTICS: 0,
    SECURITY: 0,
    CULTURE: 0,
    PEOPLE: 0,
    TOOLS: 0,
  };

  await userAnswers.map(async (element: any) => {
    // create UserAnswer entry for each question's answer
    // this means that we have a user's entries for each question saved
    await UserAnswer.upsert({
      userID: user,
      questionID: element.questionID,
      answerList: element.answerList,
    });

    // need to give each answer a score
    const elementQuestion = await Question.findOne({
      where: {
        questionID: element.questionID,
      },
    });
    let questionScore;
    if (elementQuestion.answerType === AnswerType.SC) {
      const numAnswers = elementQuestion.answerOptionsList.length;
      const answerPosition = elementQuestion.answerOptionsList.indexOf(
        element.answerList[0],
      );
      questionScore = 1 - answerPosition / numAnswers;
      answerScores[elementQuestion.category]
        += questionScore * elementQuestion.weight;
    } else if (elementQuestion.answerType === AnswerType.MC) {
      const numAnswers = elementQuestion.answerOptionsList.length;
      questionScore = element.answerList.length / numAnswers;
      answerScores[elementQuestion.category]
        += questionScore * elementQuestion.weight;
    }
  });

  // need to give each category a score
  const visibleQuestions = (await Question.findAll({
    where: { visible: true },
  })) as IQuestion[];
  const totalScoresPossible = {
    DATABASE: 0,
    DATA_ANALYTICS: 0,
    SECURITY: 0,
    CULTURE: 0,
    PEOPLE: 0,
    TOOLS: 0,
  };
  visibleQuestions.forEach((question) => {
    totalScoresPossible[question.category] += question.weight;
  });

  // insert category scores into UserResults table
  const finalScores: FS[] = [];
  Object.keys(totalScoresPossible).forEach(async (key) => {
    finalScores.push(new FS(key, answerScores[key] / totalScoresPossible[key]));
    await UserResult.create({
      userID: user,
      category: key,
      score: answerScores[key] / totalScoresPossible[key],
      timestamp,
    });
  });

  res.status(200).json(finalScores);
});

class FS {
  category: string;

  score: number;

  constructor(cat: string, sc: number) {
    this.category = cat;
    this.score = sc;
  }
}

app.get('/getUserScores', async (req: Request, res: Response) => {
  // find results at that timestamp
  const historyOfUserResults = (await UserResult.findAll({
    where: {
      userID: req.query.userId,
    },
  })) as IUserResult[];
  res.status(200).json(historyOfUserResults);
});

app.post('/insertUser', async (req: Request, res: Response) => {
  await User.create({
    name: req.body.name,
    company: req.body.company,
    email: req.body.email,
    technicalMaturity: TechMaturity.INITIAL,
    pointOfContact: '',
  });
  res.status(200);
});

app.get('/getUncontactedUsers', async (req: Request, res: Response) => {
  const uncontactedUsers = await User.findAll({
    where: {
      pointOfContact: '',
    },
  });
  res.status(200).json(uncontactedUsers);
});

app.post('/insertQuestion', async (req: Request, res: Response) => {
  await Question.create({
    category: req.body.category,
    questionString: req.body.questionString,
    answerType: req.body.answerType,
    answerOptionsList: req.body.answerOptionsList,
    weight: req.body.weight,
    visible: req.body.visible,
  });
  res.status(200);
});

app.post('/updateQuestionVisibility', async (req: Request, res: Response) => {
  await Question.update(
    { visibility: req.body.visibility },
    {
      where: {
        questionId: req.body.questionID,
      },
    },
  );
  res.status(200);
});

app.get('/getIndustryAverages', async (req: Request, res: Response) => {
  const averages = (await IndustryAverage.findAll({})) as IIndustryAverage[];
  res.status(200).json(averages);
});

app.post('/updateIndustryAverages', async (req: Request, res: Response) => {
  const averages = (await IndustryAverage.findAll({})) as IIndustryAverage[];

  // user is passing in object of structure {category: score}
  // --> access incoming score for category as scores[category]
  averages.forEach(async (element) => {
    await IndustryAverage.update(
      {
        score:
          (element.score * element.entries
            + req.body.scores[element.category])
          / (element.entries + 1),
        entries: element.entries + 1,
      },
      {
        where: {
          industryAverageID: element.industryAverageID,
        },
      },
    );
  });

  res.status(200);
});

export default app;
