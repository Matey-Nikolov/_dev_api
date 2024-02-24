import { express, axios } from '../globalImports.js';

import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post(
  '/',
  [
    body('client_Id_Db').isLength({ min: 35 }).trim().escape(),
    body('client_secret_Db').isLength({ min: 35 }).trim().escape(),
  ],
  async  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { client_Id_Db, client_secret_Db } = req.body;

    const dataToSend = {
      grant_type: 'client_credentials',
      scope: 'token',
      client_id: client_Id_Db,
      client_secret: client_secret_Db
    };

    try {
      const response = await axios.post('https://id.sophos.com/api/v2/oauth2/token', dataToSend, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
      });
  
      res.json({ success: true, message: 'Token received successfully', responseData: response.data });
    } catch (error) {
      console.error('Error posting data to external URL:', error.message);

      res.status(500).json({ success: false, message: 'Error posting data to external URL' });
    };
  
});

export default router;