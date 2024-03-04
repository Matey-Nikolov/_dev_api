import { useState } from 'react';
import SecureStorage from 'react-secure-storage';

export default function useToken() {
  const getToken = () => {
    const tokenString = SecureStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    SecureStorage.setItem('token', JSON.stringify(userToken));

    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  };
};