/**
 * Mock API service for testing
 */

import axios from 'axios';

// Create a mocked Axios instance
const apiClient = axios;

// Export the mocked apiClient
export default apiClient;

// Mock the handleApiError function
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    // Handle Axios errors
    if (error.response) {
      // Server responded with error
      return error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      // No response received
      return 'Network error: No response received from server';
    } else {
      // Request setup error
      return `Request error: ${error.message}`;
    }
  }
  
  // Handle non-Axios errors
  return error instanceof Error ? error.message : 'An unknown error occurred';
};