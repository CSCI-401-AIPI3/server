/* eslint-disable camelcase */
import express, {
  Application, Request, Response,
} from 'express';
// import { DataTypes } from 'sequelize';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';

// Initializing express
const app: Application = express();

/**
 // Express Middleware
* */
app.use(morgan('dev'));
app.options('/*', (_, res) => {
  res.sendStatus(200);
});
const sessionConfig : any = {
  secret: 'keyboard cat', cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 * 10000, sameSite: process.env.NODE_ENV === 'prod' ? 'none' : 'strict' }, rolling: true, resave: false, saveUninitialized: true,
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

export default app;
