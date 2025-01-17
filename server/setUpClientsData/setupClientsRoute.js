import { express } from '../globalImports.js';
import { ID } from '../Routers/DatabaseRoutes/apiRouteLogin.js';
import encryptData from '../help/encrypt.js';

import setupClients from '../../database/setupEnvironmentDatabase.js';

const setupClientsRoute = express.Router();
let clients = [];

const findClientById = (clientId) => {
  const client = clients.find(client => client.uniqueId === clientId);
  return client !== undefined ? client : -1;
};

setupClientsRoute.get(
  '/',
  [],
  async (req, res) => {

    try {
      clients = await setupClients(ID);

      for (const client of clients) {
        await client.setupEnvironment();
      };

      const setUpData = clients.map(client => ({
        uniqueId: client.uniqueId,
        clientName: client.clientName,
        role: client.role,
        unauthorized: client.unauthorized,
        alerts: client.alerts,
        endpoints: client.endpoints,
        software: client.software
      }));

      const encryptClients = await Promise.all(
        setUpData.map(async (data) => {
          return encryptData(data);
        })
      );

      res.json({
        success: true,
        data: encryptClients
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: 'Failed to setup information fisrt login.'
      });
    };
  }
);

setupClientsRoute.get(
  '/clients/:id',
  [],
  async (req, res) => {
    const clientId = req.params.id;
    const client = await findClientById(clientId);
    
    const encryptClient = encryptData(client);

    // if (encryptClient) {
    //   res.status(200).json(encryptClient);
    // } else {
    //   res.status(404).json({ error: 'Client not found' });
    // };
  }
);

export { setupClientsRoute, clients, findClientById };