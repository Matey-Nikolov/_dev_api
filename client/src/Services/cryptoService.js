import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

const formatKey = (key) => {
  const keyWordArray = CryptoJS.enc.Utf8.parse(key);
  if (keyWordArray.sigBytes < 32) {
    return CryptoJS.lib.WordArray.create(keyWordArray.words.concat(new Array(32 - keyWordArray.sigBytes).fill(0)));
  };

  return CryptoJS.lib.WordArray.create(keyWordArray.words.slice(0, 8));
};

const formattedKey = formatKey(SECRET_KEY);

function encryptData(data) {
  const iv = CryptoJS.lib.WordArray.random(16);

  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), formattedKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString();

  return {
    iv: iv.toString(CryptoJS.enc.Hex),
    encryptedData: encryptedData
  };
};

const decryptData = (encryptedData, iv) => {
  const ivHex = CryptoJS.enc.Hex.parse(iv);

  const decrypted = CryptoJS.AES.decrypt(encryptedData, formattedKey, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);

  return JSON.parse(decryptedData);
};

export { encryptData, decryptData };