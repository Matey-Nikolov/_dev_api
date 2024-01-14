import { express } from '../globalImports.js';
import { pageSolution } from './pageSolution.js';
import { query, validationResult } from 'express-validator';

const router = express.Router();

router.get(
    '/',
    [
        query('accessToken').isLength({ min: 1 }).trim().escape(),
        query('id').isLength({ min: 1 }).trim().escape()
    ],
    async (req, res) => {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { accessToken, id } = req.query;

        const axiosConfig = {
            headers: {
              'X-Tenant-ID': id,
              'Authorization': `Bearer ${accessToken}`
            }
        };

        let params = {
            "pageSize": 10,
           // "product": "firewall",
           // "category": "connectivity"
        };

        try{       
            const url = `https://api-eu01.central.sophos.com/common/v1/alerts`; 

             const response = await pageSolution(url, params, axiosConfig);
 
             res.json(response);
        }
        catch(error){
            console.error('Error posting data to external URL:', error.message);
  
            res.status(500).json({ success: false, message: 'Error posting data to external URL' });
        };
    }
);

export default router;