import { express } from '../../globalImports.js';
import { query, validationResult } from 'express-validator';

import getApiConfigurationInstance from './setupApiConfig.js';

const router = express.Router();

router.get(
    '/',
    [
        query('accessToken').isLength({ min: 50 }).trim().escape(),
        query('access_Id').isLength({ min: 20 }).trim().escape(),
        query('uniqueId').isLength({ min: 0 }).trim().escape()
    ],
    async (req, res) => {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { accessToken, access_Id, uniqueId } = req.query;

        const api = getApiConfigurationInstance(uniqueId, access_Id, accessToken);

        res.json(
            { 
                'status': 200
            }
        );
    }
);

export default router;