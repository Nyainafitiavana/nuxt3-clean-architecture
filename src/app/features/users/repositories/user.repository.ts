// Repository Implementation - Data Access Layer
// This repository is responsible for all data access operations for users.
// It bridges the domain layer with the infrastructure layer (HTTP service).
// The repository knows HOW to get data, but the use case knows WHAT data is needed and WHY.
// This separation allows the business logic to remain independent of data access implementation.

import { IUserRepository } from '../../../../domain/users/interfaces/user.repository.interface';
import { ExecuteResponse, Paginate } from '../../../../types/api.types';
import { CreateUserRequest, UpdateUserRequest, User } from '../../../../domain/users/models/user.model';
import { apiService } from '../../../shared/api';

/**
 * UserRepository class
 * Implements the IUserRepository interface
 * Responsibility: Handle all HTTP calls related to users and map responses to domain models
 */
export class UserRepository implements IUserRepository {
  private readonly baseUrl = '/api/users';

  /**
   * Retrieve all users from the API with pagination
   * @returns Promise<Paginate<User[]>> - Paginated list of users
   */
  async getAll(page = 1, limit = 10): Promise<Paginate<User[]>> {
    try {
      const response = await apiService.get<User[]>(`${this.baseUrl}?page=${page}&limit=${limit}`);

      return response.data;
    } catch (error) {
      console.error('[UserRepository] Failed to fetch users', error);
      throw error;
    }
  }

  /**
   * Retrieve a single user by ID
   * @param id - The user ID to retrieve
   * @returns Promise<User> - The requested user object
   */
  async getById(id: number): Promise<User> {
    try {
      const response = await apiService.get<User>(`${this.baseUrl}/${id}`);
      // For single item, extract from paginated response
      const paginatedData = response.data as Paginate<User>;
      return paginatedData.data as unknown as User;
    } catch (error) {
      console.error(`[UserRepository] Failed to fetch user with ID ${id}`, error);
      throw error;
    }
  }

  /**
   * Create a new user
   * @param data - User creation data (name, email)
   * @returns Promise<ExecuteResponse<User>> - Response with created user data and message
   */
  async create(data: CreateUserRequest): Promise<ExecuteResponse<User>> {
    try {
      const response = await apiService.post<User>(this.baseUrl, data);
      // Return the full ExecuteResponse to access success flag and message
      return response.data;
    } catch (error) {
      console.error('[UserRepository] Failed to create user', error);
      throw error;
    }
  }

  /**
   * Update an existing user
   * @param id - The user ID to update
   * @param data - User update data (partial fields)
   * @returns Promise<ExecuteResponse<User>> - Response with updated user data and message
   */
  async update(id: number, data: UpdateUserRequest): Promise<ExecuteResponse<User>> {
    try {
      const response = await apiService.put<User>(`${this.baseUrl}/${id}`, data);
      // Return the full ExecuteResponse to access success flag and message
      return response.data;
    } catch (error) {
      console.error(`[UserRepository] Failed to update user with ID ${id}`, error);
      throw error;
    }
  }

  /**
   * Delete a user
   * @param id - The user ID to delete
   * @returns Promise<ExecuteResponse> - Response with success message
   */
  async delete(id: number): Promise<ExecuteResponse> {
    try {
      const response = await apiService.delete(`${this.baseUrl}/${id}`);
      // Return the full ExecuteResponse to access success flag and message
      return response.data;
    } catch (error) {
      console.error(`[UserRepository] Failed to delete user with ID ${id}`, error);
      throw error;
    }
  }
}
