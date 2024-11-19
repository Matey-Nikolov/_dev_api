import { env, CryptoJS } from '.././globalImports.js'

const SECRET_KEY = env.DB_SECRET_KEY;

const formatKey = (key) => {
    const keyWordArray = CryptoJS.enc.Utf8.parse(key);

    if (keyWordArray.sigBytes < 32) {
        return CryptoJS.lib.WordArray.create(keyWordArray.words.concat(new Array(32 - keyWordArray.sigBytes).fill(0)));
    };

    return CryptoJS.lib.WordArray.create(keyWordArray.words.slice(0, 8));
};
  
const decryptData = (encryptedData, iv) => {
    const key = formatKey(SECRET_KEY);
    const ivHex = CryptoJS.enc.Hex.parse(iv);
  
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
  
    const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decryptedData);
};

export default decryptData;