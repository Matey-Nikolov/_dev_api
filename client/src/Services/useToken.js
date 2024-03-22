import { useState } from 'react';
import SecureStorage from 'react-secure-storage';

/**
 * Custom React Hook for managing tokens.
 * @module useToken
 * @returns {Object} - An object containing the token and a function to set the token.
 */
export default function useToken() {
  /**
   * Retrieves the token from secure storage.
   * @function getToken
   * @returns {string|null} - The token if it exists, null otherwise.
   */
  const getToken = () => {
    const tokenString = SecureStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

    return userToken;
  };

  const [token, setToken] = useState(getToken());

  /**
   * Saves the token to secure storage and updates the state.
   * @function saveToken
   * @param {string} userToken - The token to be saved.
   */
  const saveToken = userToken => {
    SecureStorage.setItem('token', JSON.stringify(userToken));

    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  };
};