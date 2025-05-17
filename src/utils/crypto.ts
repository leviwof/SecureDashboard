import CryptoJS from 'crypto-js';

// Secret key for encryption/decryption
// In a real-world scenario, this should be stored securely (environment variables)
const SECRET_KEY = 'secureEncryptionKey123!@#';

/**
 * Encrypts data using AES encryption
 */
export const encryptData = <T>(data: T): string => {
  const jsonString = JSON.stringify(data);
  return CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
};

/**
 * Decrypts encrypted data
 */
export const decryptData = <T>(encryptedData: string): T => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedString) as T;
};