import { api } from "./apiConfig";
import { decryptData } from "../Services/cryptoService";

const apiSetupClients = async () => {
  try {
    const response = await api.get('/setup');

    let decryptClients = await Promise.all(
      response.data.data.map(async (data) => {
        return decryptData(data.encryptedData, data.iv);
      })
    );

    return decryptClients;
  } catch (error) {
    console.error('Error fetching setup clients:', error.response ? error.response.data : error.message);
    return null;
  };
};

const apiFindClientById = async (clientId) => {
  try {
    const response = await api.get(`/client/${clientId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching client by ID:', error.response ? error.response.data : error.message);
    return null;
  };
};

export { apiSetupClients, apiFindClientById };
