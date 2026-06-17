// Use Case: Get Users
// Use cases contain the business logic of the application.
// They are independent from any framework (Vue, Pinia, HTTP, etc.).
// They receive dependencies through constructor injection (Dependency Inversion Principle).
// Each use case has a single responsibility and a single execute() method.

import { IUserRepository } from '../../../../domain/users/interfaces/user.repository.interface';
import { Paginate } from '../../../../types/api.types';
import { User } from '../../../../domain/users/models/user.model';

/**
 * GetUsersUseCase
 * Responsibility: Retrieve all users from the repository with pagination
 * Business Logic: Execute the operation and return the paginated list of users
 */
export class GetUsersUseCase {
  /**
   * Constructor - Dependency Injection
   * @param repository - The user repository implementation (injected)
   */
  constructor(private readonly repository: IUserRepository) {}

  /**
   * Execute the use case
   * @returns Promise<Paginate<User[]>> - Paginated list of all users
   * @throws Error if the repository operation fails
   */
  async execute(page = 1, limit = 10): Promise<Paginate<User[]>> {
    return this.repository.getAll(page, limit);
  }
}
