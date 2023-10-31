import express from 'express';
import cors from 'cors';
import path from 'path';
import router from './apiRouting.js';

import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3000/api'],
  methods: 'GET, PUT, POST, DELETE'
};

app.use(cors(corsOptions));


const __filename = fileURLToPath(import.meta.url); // Convert the current module's URL to a file path
const __dirname = path.dirname(__filename); // Derive the directory name

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
