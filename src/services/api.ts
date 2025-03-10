/**
 * API service configuration with Axios
 * Sets up a configured Axios instance with interceptors for authentication,
 * error handling, and response transformation
 */

import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Get API base URL from environment variables with fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Log the API URL being used (can be removed in production)
console.log(`Using API URL: ${API_BASE_URL}`);

// Create a configured Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for authentication
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Get token from localStorage or other storage mechanism
    const token = localStorage.getItem('auth_token');
    
    // If token exists, add it to the headers
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    // Handle request errors
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and response transformation
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Transform response data if needed
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      const { status } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear auth data and redirect to login
          localStorage.removeItem('auth_token');
          // You might want to redirect to login page or dispatch a logout action
          console.error('Authentication error:', error.response.data);
          break;
        case 403:
          // Forbidden
          console.error('Permission denied:', error.response.data);
          break;
        case 404:
          // Not found
          console.error('Resource not found:', error.response.data);
          break;
        case 500:
          // Server error
          console.error('Server error:', error.response.data);
          break;
        default:
          // Other errors
          console.error(`Error ${status}:`, error.response.data);
      }
    } else if (error.request) {
      // Request was made but no response was received
      console.error('Network error - no response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Request configuration error:', error.message);
    }
    
    // Return the error for further handling
    return Promise.reject(error);
  }
);

// PUBLIC_INTERFACE
/**
 * Configured Axios instance for API requests
 */
export default apiClient;

// PUBLIC_INTERFACE
/**
 * Helper function to handle API errors consistently
 * @param error - The error object from Axios
 * @returns A standardized error message
 */
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
