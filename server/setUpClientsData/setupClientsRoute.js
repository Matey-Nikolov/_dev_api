import { express } from '../globalImports.js';
import { ID } from '../Routers/DatabaseRoutes/apiRouteLogin.js';

import setupClients from '../../database/setupEnvironmentDatabse.js';

const router = express.Router();

router.get(
  '/',
  [],
  async (req, res) => {

    try {
      // const clients = await setupClients(ID);

      // for (const client of clients) {
      //   console.log(client);

      //   await client.setupEnvironment();    
      // };


        

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