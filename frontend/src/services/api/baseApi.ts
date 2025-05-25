/**
 * Base API service for handling HTTP requests
 * This will be expanded when the backend is implemented
 */

// Will be loaded from environment variables in a real app
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

export interface ApiRequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
  ok: boolean;
}

/**
 * Handles API requests with error handling
 */
export async function apiRequest<T = any>(
  endpoint: string, 
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  try {
    const { 
      method = HttpMethod.GET, 
      headers = {}, 
      body,
      params
    } = options;

    // Build query string for GET requests
    let url = `${API_BASE_URL}${endpoint}`;
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      url = `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
    }

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      credentials: 'include' // Include cookies for authentication
    };

    // Add body for non-GET requests
    if (body && method !== HttpMethod.GET) {
      fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, fetchOptions);
    let data: T | undefined;
    let error: string | undefined;

    // Try to parse JSON response
    try {
      if (response.status !== 204) { // No content
        data = await response.json();
      }
    } catch (e) {
      error = 'Invalid response format';
    }

    // Handle error responses
    if (!response.ok) {
      error = (data as any)?.message || `Request failed with status ${response.status}`;
    }

    return {
      data,
      error,
      status: response.status,
      ok: response.ok
    };

  } catch (error) {
    return {
      error: (error as Error).message || 'Network request failed',
      status: 0,
      ok: false
    };
  }
}