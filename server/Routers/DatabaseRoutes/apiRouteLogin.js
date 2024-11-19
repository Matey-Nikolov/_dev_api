import { express, body, validationResult } from '../../globalImports.js';

import decryptData from '../../help/decryptData.js';

const router = express.Router();

router.post(
  '/',
  [
    body('iv').isString().notEmpty().withMessage('IV is required and must be a non-empty string'),
    body('encryptedData').isString().notEmpty().withMessage('Encrypted data is required and must be a non-empty string')
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    };

    const { encryptedData, iv } = req.body;

    try {
      const decryptedInformation = decryptData(encryptedData, iv);

      // res.json({
      //   success: true,
      //   data: decryptedInformation,
      // });
    } catch (error) {
      console.error('Decryption Error:', error.message);

      res.status(500).json({
        success: false,
        message: 'Invalid encrypted data or decryption failed',
      });
    };
  }
);

export default router;