import { env, CryptoJS } from '.././globalImports.js'

const SECRET_KEY = env.DB_SECRET_KEY;

const formatKey = (key) => {
  const keyWordArray = CryptoJS.enc.Utf8.parse(key);
  
  if (keyWordArray.sigBytes < 32) {
    return CryptoJS.lib.WordArray.create(keyWordArray.words.concat(new Array(32 - keyWordArray.sigBytes).fill(0)));
  };

  return CryptoJS.lib.WordArray.create(keyWordArray.words.slice(0, 8));
};

function encryptData(data) {
  const key = formatKey(SECRET_KEY);
  const iv = CryptoJS.lib.WordArray.random(16);

  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString();

  return {
    iv: iv.toString(CryptoJS.enc.Hex),
    encryptedData: encryptedData
  };
};

export default encryptData;