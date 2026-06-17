// API Response Types
// These interfaces define the standardized response format from the backend API.
// All API endpoints follow this contract.

/**
 * ExecuteResponse<T>
 * Standard response format for mutation operations (create, update, delete)
 * Used by POST, PUT, and DELETE endpoints
 */
export interface ExecuteResponse<T = unknown> {
  success?: boolean;
  message: string;
  data?: T;
  statusCode: number;
}

/**
 * Paginate<T>
 * Standard response format for list operations (get all with pagination)
 * Used by GET endpoints that return multiple items
 */
export interface Paginate<T> {
  data: T;
  totalRows: number;
  page: number;
}
