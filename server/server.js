import express from 'express';

import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { env } from './globalImports.js';

import apiRouteLoginDatabse from './Routers/DatabaseRoutes/apiRouteLogin.js'

import setupInfomation from './configs/api/setupInfomationRouter.js';

import tokenRouter from './Routers/authenticationRouter.js';
import whoIAmRouter from './Routers/authorizationRouter.js';

import alertRouter from './Routers/alertRouter.js';
import endpointRouter from './Routers/endpointRouter.js';
import getEvents from './Routers/eventRouter.js';
import websiteRouter from './Routers/websiteRouter.js';
import archiveRouter from './Routers/backupRouter.js';

const app = express();
const port = env.PORT;
const host = env.DB_HOST;

const corsOptions = {
  origin: [`http://${host}:${port}`, `http://${host}:3001`],
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

app.use('/loginInApp', apiRouteLoginDatabse)

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

export default app;