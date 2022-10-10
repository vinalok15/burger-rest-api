import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import { connectionPassport } from './utils/Provider.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.js';
import orderRoute from './routes/order.js';
import passport from 'passport';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import cors from 'cors';

const app = express();
export default app;

dotenv.config({
  path: './config/config.env',
});

//using middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'development' ? false : true,
      httpOnly: process.env.NODE_ENV === 'development' ? false : true,
      sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTED_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());
app.enable('trust proxy');

connectionPassport();

//importing Routes
app.use('/api/v1', userRoute);
app.use('/api/v1', orderRoute);

app.use(errorMiddleware);
