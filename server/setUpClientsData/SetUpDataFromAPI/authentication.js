import axios from 'axios';

const authentication = async (client_Id_Db, client_secret_Db) => {
  const dataToSend = {
    grant_type: 'client_credentials',
    scope: 'token',
    client_id: client_Id_Db,
    client_secret: client_secret_Db
  };
  
  const accessToken = await axios.post('https://id.sophos.com/api/v2/oauth2/token', dataToSend, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });

  return accessToken.data.access_token;
};

export default authentication;