import { apiSetupClients } from '../../axiosrequests/apiClients';

const clientsMap = new Map();

let endpoins = [];
let alerts = [];

const setupClients = async () => {

  let clientInfomations = await apiSetupClients();

  clientInfomations.map((data) => {
    clientsMap.set(data.uniqueId, data)
  });

  return clientInfomations;
};


const findClientById = (clientId) => {
  const client = clientsMap.get(clientId)

  return client !== undefined ? client : -1;
};

export { setupClients, findClientById };