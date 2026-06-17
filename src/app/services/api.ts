// HTTP Service Layer - Infrastructure
// This file provides a centralized Axios instance for all API communication.
// All HTTP requests in the application should go through this service.
// This ensures consistent error handling, interceptors, and configuration.

import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

/**
 * Represents a standardized API response format
 */
interface ApiResponse<T> {
  status: number;
  data: T;
}

/**
 * API Service class that manages all HTTP communication
 * Responsibility: Handle HTTP requests, responses, and errors
 */
class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    // Get API base URL from Nuxt runtime config
    const config = useRuntimeConfig();
    const baseURL = config.public.apiBase as string;

    // Initialize Axios instance with centralized configuration
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 10000, // 10 seconds timeout
    });

    // Configure request interceptor
    this.setupRequestInterceptor();

    // Configure response interceptor
    this.setupResponseInterceptor();
  }

  /**
   * Setup request interceptor
   * This runs before every request is sent
   * Use case: Add auth tokens, log requests, etc.
   */
  private setupRequestInterceptor(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Log outgoing requests in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
      },
      (error: AxiosError) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Setup response interceptor
   * This runs after every response is received
   * Use case: Handle errors globally, transform responses, etc.
   */
  private setupResponseInterceptor(): void {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log successful responses in development
        if (process.env.NODE_ENV === 'development') {
          console.log(
            `[API Response] ${response.status} ${response.config.url}`,
            response.data
          );
        }
        return response;
      },
      (error: AxiosError) => {
        // Handle different error types
        if (error.response) {
          // Server responded with error status
          console.error(
            `[API Error] ${error.response.status}`,
            error.response.data
          );
        } else if (error.request) {
          // Request was made but no response received
          console.error('[API Error] No response received', error.request);
        } else {
          // Error in request setup
          console.error('[API Error]', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * GET request
   * @param url - The endpoint path
   * @param config - Optional Axios config
   */
  async get<T>(url: string, config = {}): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  /**
   * POST request
   * @param url - The endpoint path
   * @param data - Request body
   * @param config - Optional Axios config
   */
  async post<T>(url: string, data: unknown, config = {}): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  /**
   * PUT request
   * @param url - The endpoint path
   * @param data - Request body
   * @param config - Optional Axios config
   */
  async put<T>(url: string, data: unknown, config = {}): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  /**
   * DELETE request
   * @param url - The endpoint path
   * @param config - Optional Axios config
   */
  async delete<T>(url: string, config = {}): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }
}

// Export singleton instance
export const apiService = new ApiService();
