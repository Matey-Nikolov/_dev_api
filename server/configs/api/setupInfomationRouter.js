import { express } from '../../globalImports.js';
import { query, validationResult } from 'express-validator';

import getApiConfigurationInstance from './setupApiConfig.js';

const router = express.Router();

router.get(
    '/',
    [
        query('accessToken').isLength({ min: 1 }).trim().escape(),
        query('access_Id').isLength({ min: 1 }).trim().escape()
    ],
    async (req, res) => {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { accessToken, access_Id } = req.query;

        const api = getApiConfigurationInstance(accessToken, access_Id);

        res.json(
            { 
                'status': 200
            }
        );

    }
);

export default router;