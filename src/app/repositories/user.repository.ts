// Repository Implementation - Data Access Layer
// This repository is responsible for all data access operations for users.
// It bridges the domain layer with the infrastructure layer (HTTP service).
// The repository knows HOW to get data, but the use case knows WHAT data is needed and WHY.
// This separation allows the business logic to remain independent of data access implementation.

import type { User, CreateUserRequest, UpdateUserRequest } from '~/domain/models/user.model';
import type { IUserRepository } from '~/domain/interfaces/user.repository.interface';
import { apiService } from '~/app/services/api';

/**
 * UserRepository class
 * Implements the IUserRepository interface
 * Responsibility: Handle all HTTP calls related to users and map responses to domain models
 */
export class UserRepository implements IUserRepository {
  private readonly baseUrl = '/api/users';

  /**
   * Retrieve all users from the API
   * @returns Promise<User[]> - Array of users from the server
   */
  async getAll(): Promise<User[]> {
    try {
      const response = await apiService.get<User[]>(this.baseUrl);
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
      return response.data;
    } catch (error) {
      console.error(`[UserRepository] Failed to fetch user with ID ${id}`, error);
      throw error;
    }
  }

  /**
   * Create a new user
   * @param data - User creation data (name, email)
   * @returns Promise<User> - The newly created user with assigned ID
   */
  async create(data: CreateUserRequest): Promise<User> {
    try {
      const response = await apiService.post<User>(this.baseUrl, data);
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
   * @returns Promise<User> - The updated user object
   */
  async update(id: number, data: UpdateUserRequest): Promise<User> {
    try {
      const response = await apiService.put<User>(`${this.baseUrl}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`[UserRepository] Failed to update user with ID ${id}`, error);
      throw error;
    }
  }

  /**
   * Delete a user
   * @param id - The user ID to delete
   * @returns Promise<void>
   */
  async delete(id: number): Promise<void> {
    try {
      await apiService.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`[UserRepository] Failed to delete user with ID ${id}`, error);
      throw error;
    }
  }
}
