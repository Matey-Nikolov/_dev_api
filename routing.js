import path from 'path';
import express from 'express';

import { setGlobal, apiHost, authorization, setDelete, setAllowPOST, websiteURL } from './public/src/Js/global.js';

const routerS = express.Router();


// Define an API routes
// ------------------/alerts--------------------------------------
routerS.get('/alerts/all', async (request, res) => {
    
});
// -----------------------------------------------------------------

export default routerS;