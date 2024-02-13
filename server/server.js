import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import setupInfomation from './configs/api/setupInfomationRouter.js';

import tokenRouter from './Router/authenticationRouter.js';
import whoIAmRouter from './Router/authorizationRouter.js';

import alertRouter from './Router/alertRouter.js';
import endpointRouter from './Router/endpointRouter.js';
import getEvents from './Router/eventRouter.js';
import websiteRouter from './Router/websiteRouter.js';
import archiveRouter from './Router/backupRouter.js';

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: 'GET, PUT, POST, DELETE',
};

app.use(cors(corsOptions));

// Set secure HTTP headers
app.use(helmet());

// Limit requests to /token to prevent abuse
app.use(
  '/token',
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // limit each IP to 100 requests per window
  })
);

app.use(bodyParser.json());

app.use('/configuration', setupInfomation);

app.use('/token', tokenRouter);

app.use('/access', whoIAmRouter);

app.use('/alert', alertRouter);

app.use('/endpoint', endpointRouter);

app.use('/events', getEvents);

app.use('/website', websiteRouter);

app.use('/backup', archiveRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
