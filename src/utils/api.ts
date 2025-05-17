import { encryptData, decryptData } from './crypto';
import { ApiResponse } from '../types';

const API_BASE_URL = '/api';

/**
 * Generic function to make API requests with encryption/decryption
 */
export async function apiRequest<T, R>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: T
): Promise<ApiResponse<R>> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // If data provided, encrypt it
    if (data) {
      options.body = JSON.stringify({ data: encryptData(data) });
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const responseData = await response.json();

    // Decrypt the response data
    if (responseData.data) {
      const decryptedData = decryptData<R>(responseData.data);
      return { ...responseData, data: decryptedData };
    }

    return responseData;
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}