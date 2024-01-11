import { api } from "./apiConfig";

export const postToken = async (formData) => {
  try {
    const response = await api.post('/token', formData);
    return response.data.responseData.access_token;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error; 
  }
};
