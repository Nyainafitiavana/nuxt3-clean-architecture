// Repository Interface - Abstraction Layer
// This interface defines the contract that any User repository must follow.
// By depending on abstractions (interfaces), we follow the Dependency Inversion Principle.
// This allows us to swap implementations (e.g., HTTP, mock, local storage) without changing client code.

import type { User, CreateUserRequest, UpdateUserRequest } from '../models/user.model';
import { ExecuteResponse, Paginate } from '../../types/api.types';

/**
 * IUserRepository interface
 * Defines the contract for user data access operations
 * Any implementation of this interface can be used interchangeably
 */
export interface IUserRepository {
  /**
   * Retrieve all users with pagination
   * @returns Promise<Paginate<User[]>> - Paginated list of users
   */
  getAll(): Promise<Paginate<User[]>>;

  /**
   * Retrieve a single user by ID
   * @param id - User ID
   * @returns Promise<User> - The requested user
   */
  getById(id: number): Promise<User>;

  /**
   * Create a new user
   * @param data - User creation data
   * @returns Promise<ExecuteResponse<User>> - Response with created user data
   */
  create(data: CreateUserRequest): Promise<ExecuteResponse<User>>;

  /**
   * Update an existing user
   * @param id - User ID
   * @param data - User update data
   * @returns Promise<ExecuteResponse<User>> - Response with updated user data
   */
  update(id: number, data: UpdateUserRequest): Promise<ExecuteResponse<User>>;

  /**
   * Delete a user
   * @param id - User ID
   * @returns Promise<ExecuteResponse> - Response with success message
   */
  delete(id: number): Promise<ExecuteResponse>;
}
