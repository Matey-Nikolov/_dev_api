import { express, body, validationResult } from '../../globalImports.js';

import decryptData from '../../help/decryptData.js';

import { loginToApp, findUserInDatabase_ID } from '../../../database/login.js';

const router = express.Router();
let ID = '';

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

      const accessToken = await loginToApp(decryptedInformation.email, decryptedInformation.password);
      
      res.json({
        success: true,
        accessToken: accessToken
      });
    } catch (error) {
      console.error('Decryption Error:', error.message);

      res.status(500).json({
        success: false,
        message: 'Invalid encrypted data or decryption failed'
      });
    };
  }
);

router.post(
  '/findUser',
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

      ID = await findUserInDatabase_ID(decryptedInformation);

      res.json({
        success: true
      });
    } catch (error) {

      res.status(500).json({
        success: false,
        message: 'Not found id.'
      });
    };
  }
);

export default router;
export { ID };