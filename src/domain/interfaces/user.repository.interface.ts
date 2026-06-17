// Repository Interface - Abstraction Layer
// This interface defines the contract that any User repository must follow.
// By depending on abstractions (interfaces), we follow the Dependency Inversion Principle.
// This allows us to swap implementations (e.g., HTTP, mock, local storage) without changing client code.

import type { User, CreateUserRequest, UpdateUserRequest } from '../models/user.model';

/**
 * IUserRepository interface
 * Defines the contract for user data access operations
 * Any implementation of this interface can be used interchangeably
 */
export interface IUserRepository {
  /**
   * Retrieve all users
   * @returns Promise<User[]> - Array of all users
   */
  getAll(): Promise<User[]>;

  /**
   * Retrieve a single user by ID
   * @param id - User ID
   * @returns Promise<User> - The requested user
   */
  getById(id: number): Promise<User>;

  /**
   * Create a new user
   * @param data - User creation data
   * @returns Promise<User> - The created user with assigned ID
   */
  create(data: CreateUserRequest): Promise<User>;

  /**
   * Update an existing user
   * @param id - User ID
   * @param data - User update data
   * @returns Promise<User> - The updated user
   */
  update(id: number, data: UpdateUserRequest): Promise<User>;

  /**
   * Delete a user
   * @param id - User ID
   * @returns Promise<void>
   */
  delete(id: number): Promise<void>;
}
