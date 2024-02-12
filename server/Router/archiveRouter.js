import { express, axios } from '../globalImports.js';

import { query, validationResult } from 'express-validator';

import createFileForBackUp from '../help/createFile.js';

const router = express.Router();

router.get(
    '/items',
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

        const axiosConfig = {
            headers: {
              'X-Tenant-ID': access_Id,
              'Authorization': `Bearer ${accessToken}`
            }
        };
        
        try{
            //https://api-{{dataRegion}}.central.sophos.com/endpoint/v1/settings/allowed-items?pageTotal=true
            // https://api-eu01.central.sophos.com
            const response = await axios.get(`https://api-eu01.central.sophos.com/endpoint/v1/settings/allowed-items?pageTotal=true`, axiosConfig);

            createFileForBackUp(response.data);
            
            res.json(
                { 
                    'status': 201
                }
            );
        }
        catch(error){
            console.error('Error posting data to external URL:', error.message);
  
            res.status(500).json({ success: false, message: 'Error posting data to external URL' });
        };
    }
);


export default router;