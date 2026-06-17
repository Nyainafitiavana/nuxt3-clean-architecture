// Use Case: Update User
// Use cases contain the business logic of the application.
// This use case is responsible for updating an existing user.

import type { User, UpdateUserRequest } from '~/domain/models/user.model';
import type { IUserRepository } from '~/domain/interfaces/user.repository.interface';

/**
 * UpdateUserUseCase
 * Responsibility: Update an existing user through the repository
 * Business Logic: Accept user ID and update data, then persist through the repository
 */
export class UpdateUserUseCase {
  /**
   * Constructor - Dependency Injection
   * @param repository - The user repository implementation (injected)
   */
  constructor(private readonly repository: IUserRepository) {}

  /**
   * Execute the use case
   * @param id - User ID to update
   * @param data - User update data (partial fields)
   * @returns Promise<User> - The updated user
   * @throws Error if the repository operation fails
   */
  async execute(id: number, data: UpdateUserRequest): Promise<User> {
    // In a real application, you could add business logic here:
    // - Validation
    // - Existence check
    // - Authorization checks
    // - Transformation
    // - Audit logging

    return this.repository.update(id, data);
  }
}
