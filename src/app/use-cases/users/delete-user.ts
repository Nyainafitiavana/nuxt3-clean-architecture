// Use Case: Delete User
// Use cases contain the business logic of the application.
// This use case is responsible for deleting an existing user.

import type { IUserRepository } from '~/domain/interfaces/user.repository.interface';

/**
 * DeleteUserUseCase
 * Responsibility: Delete an existing user through the repository
 * Business Logic: Accept user ID and delete through the repository
 */
export class DeleteUserUseCase {
  /**
   * Constructor - Dependency Injection
   * @param repository - The user repository implementation (injected)
   */
  constructor(private readonly repository: IUserRepository) {}

  /**
   * Execute the use case
   * @param id - User ID to delete
   * @returns Promise<void>
   * @throws Error if the repository operation fails
   */
  async execute(id: number): Promise<void> {
    // In a real application, you could add business logic here:
    // - Existence check
    // - Authorization checks
    // - Cascade deletion logic
    // - Audit logging
    // - Soft delete vs hard delete decision

    return this.repository.delete(id);
  }
}
