// Use Case: Get Users
// Use cases contain the business logic of the application.
// They are independent from any framework (Vue, Pinia, HTTP, etc.).
// They receive dependencies through constructor injection (Dependency Inversion Principle).
// Each use case has a single responsibility and a single execute() method.

import type { User } from '~/domain/models/user.model';
import type { IUserRepository } from '~/domain/interfaces/user.repository.interface';

/**
 * GetUsersUseCase
 * Responsibility: Retrieve all users from the repository
 * Business Logic: Execute the operation and return the list of users
 */
export class GetUsersUseCase {
  /**
   * Constructor - Dependency Injection
   * @param repository - The user repository implementation (injected)
   */
  constructor(private readonly repository: IUserRepository) {}

  /**
   * Execute the use case
   * @returns Promise<User[]> - List of all users
   * @throws Error if the repository operation fails
   */
  async execute(): Promise<User[]> {
    return this.repository.getAll();
  }
}
