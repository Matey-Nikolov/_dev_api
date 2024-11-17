import { express, CryptoJS } from '../../globalImports.js';

import { body, validationResult } from 'express-validator';

const router = express.Router();

const SECRET_KEY = process.env.DB_SECRET_KEY;

router.post(
  '/',
  [
    body('encryptedData').notEmpty().trim().escape()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { encryptedData } = req.body;

    console.log(encryptedData);
    
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      const { email, password } = decryptedData;

      console.log('Decrypted Email:', email);
      console.log('Decrypted Password:', password);

      res.json({
        success: true
      });

    } catch (error) {
      console.error('Decryption Error:', error);
      res.status(500).json({ success: false, message: 'Invalid encrypted data' });
    }
  }
);

export default router;