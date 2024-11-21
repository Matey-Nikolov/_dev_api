import { express } from '../globalImports.js';
import { ID } from '../Routers/DatabaseRoutes/apiRouteLogin.js';
import encryptData from '../help/encrypt.js';

import setupClients from '../../database/setupEnvironmentDatabse.js';

const router = express.Router();
const clients = [];

const findClientById = (clientId) => {
  const client = clients.find(client => client.uniqueId === clientId);
  return client !== undefined ? client : -1;
};

router.get(
  '/',
  [],
  async (req, res) => {

    try {
      clients = await setupClients(ID);

      for (const client of clients) {
        await client.setupEnvironment();
      };

      res.json({
        success: true,
        data: encryptClients
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: 'Failed'
      });
    };
  }
);

router.get(
  '/clients/:id',
  [],
  async (req, res) => {
    const clientId = req.params.id;
    const client = await findClientById(clientId);
    
    const encryptClient = encryptData(client);

    if (encryptClient) {
      res.status(200).json(encryptClient);
    } else {
      res.status(404).json({ error: 'Client not found' });
    };
  }
);

export default router;