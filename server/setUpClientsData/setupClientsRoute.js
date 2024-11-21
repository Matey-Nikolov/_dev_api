import { express } from '../globalImports.js';
import { ID } from '../Routers/DatabaseRoutes/apiRouteLogin.js';
import encryptData from '../help/encrypt.js';

import setupClients from '../../database/setupEnvironmentDatabse.js';

const router = express.Router();

router.get(
  '/',
  [],
  async (req, res) => {

    try {
      const clients = await setupClients(ID);

      let uniqueIdArray = [...new Set(clients.map(client => client.uniqueId))];

      uniqueIdArray = encryptData(uniqueIdArray);

      for (const client of clients) {
        await client.setupEnvironment();    
      };

      console.log(clients);
      

      // res.json({
      //     success: true,
      //     accessToken: accessToken
      // });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: 'Failed'
      });
    };
  }
);


export default router;