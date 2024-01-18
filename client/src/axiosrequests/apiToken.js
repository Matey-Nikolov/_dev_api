import { api } from "./apiConfig";

export const postToken = async (useHookData) => {
  try {
    const response = await api.post('/token', useHookData);
    return response.data.responseData.access_token;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error; 
  }
};
