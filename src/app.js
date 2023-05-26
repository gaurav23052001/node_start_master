import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { connectToDB } from './configs/dbConfig';
import router from './routes';
import logger from './configs/logger';
import 'dotenv/config';

// Use parsing middleware
const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(
  bodyParser.json({
    type: 'application/json',
    limit: '300mb',
    extended: false,
  }),
);
app.use(morgan('combined'));
app.use(cors());
app.use(compression());

// Routers
app.use('/api', router);

// Connect to database
connectToDB();


process.on('uncaughtException', (err) => {
  logger.error(`There was an uncaught error: => ${err}`);
});

process.on('unhandledRejection', (reason, p) => {
  logger.info(`Unhandled Rejection at: ${p}, reason:, ${reason}`);
});

export default app;
