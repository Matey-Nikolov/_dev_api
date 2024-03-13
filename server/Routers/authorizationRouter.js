import { express, axios } from '../globalImports.js';

import { query, validationResult } from 'express-validator';

const router = express.Router();

router.get(
    '/',
    [
        query('accessToken').isLength({ min: 800 }).trim().escape()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { accessToken } = req.query;

        try {

            const axiosConfig = {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            };
            
            const response = await axios.get(`https://api.central.sophos.com/whoami/v1`, axiosConfig);

            res.json({
                success: true,
                message: 'Authorization successful',
                responseData:  response.data
            });

        } catch (error) {
            res.status(400).json({ success: false, message: 'Error processing request authorization.' });
        };
});

export default router;