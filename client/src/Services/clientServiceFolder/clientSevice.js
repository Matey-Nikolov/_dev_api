import { apiSetupClients } from '../../axiosrequests/apiClients';

const clients = [];

const setupClients = async () => {
  return await apiSetupClients();
};


const findClientById = (clientId) => {
  const client = clients.find(client => client.uniqueId === clientId);

  return client !== undefined ? client : -1;
};

export { setupClients, findClientById };