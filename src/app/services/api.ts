// HTTP Service Layer - Infrastructure
import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { useRuntimeConfig } from 'nuxt/app';
import { ExecuteResponse, Paginate } from '../../types/api.types';

/**
 * API Service class
 * Clean fix: runtime config is resolved lazily (not at import time)
 */
class ApiService {
  private axiosInstance!: AxiosInstance;
  private initialized = false;

  /**
   * Lazy initialization
   * Ensures Nuxt context exists before using useRuntimeConfig()
   */
  private init() {
    if (this.initialized) return;

    const config = useRuntimeConfig(); // now safe (called later in runtime)
    const baseURL = config.public.apiBase as string;

    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 10000,
    });

    this.setupRequestInterceptor();
    this.setupResponseInterceptor();

    this.initialized = true;
  }

  private setupRequestInterceptor(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => {
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

  private setupResponseInterceptor(): void {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(
            `[API Response] ${response.status} ${response.config.url}`,
            response.data
          );
        }
        return response;
      },
      (error: AxiosError) => {
        if (error.response) {
          console.error(`[API Error] ${error.response.status}`, error.response.data);
        } else if (error.request) {
          console.error('[API Error] No response received', error.request);
        } else {
          console.error('[API Error]', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config = {}): Promise<AxiosResponse<Paginate<T>>> {
    this.init(); // safe lazy init
    return this.axiosInstance.get<Paginate<T>>(url, config);
  }

  async post<T>(url: string, data: unknown, config = {}): Promise<AxiosResponse<ExecuteResponse<T>>> {
    this.init();
    return this.axiosInstance.post<ExecuteResponse<T>>(url, data, config);
  }

  async put<T>(url: string, data: unknown, config = {}): Promise<AxiosResponse<ExecuteResponse<T>>> {
    this.init();
    return this.axiosInstance.put<ExecuteResponse<T>>(url, data, config);
  }

  async delete(url: string, config = {}): Promise<AxiosResponse<ExecuteResponse>> {
    this.init();
    return this.axiosInstance.delete<ExecuteResponse>(url, config);
  }
}

//singleton stays EXACTLY the same (no breaking change)
export const apiService = new ApiService();