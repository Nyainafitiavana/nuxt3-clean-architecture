// Use Case: Create User
// Use cases contain the business logic of the application.
// They encapsulate a specific piece of business functionality.
// This use case is responsible for creating a new user.


import { CreateUserRequest, User } from '../../../../domain/users/models/user.model';
import { IUserRepository } from '../../../../domain/users/interfaces/user.repository.interface';
import { ExecuteResponse } from '../../../../types/api.types';

/**
 * CreateUserUseCase
 * Responsibility: Create a new user through the repository
 * Business Logic: Accept user data and persist it through the repository
 */
export class CreateUserUseCase {
  /**
   * Constructor - Dependency Injection
   * @param repository - The user repository implementation (injected)
   */
  constructor(private readonly repository: IUserRepository) {}

  /**
   * Execute the use case
   * @param data - User creation data (name, email)
   * @returns Promise<ExecuteResponse<User>> - Response with created user and backend message
   * @throws Error if the repository operation fails
   */
  async execute(data: CreateUserRequest): Promise<ExecuteResponse<User>> {
    // In a real application, you could add business logic here:
    // - Validation
    // - Duplicate checking
    // - Transformation
    // - Authorization checks

    return this.repository.create(data);
  }
}
