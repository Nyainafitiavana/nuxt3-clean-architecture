// Use Case: Update User
// Use cases contain the business logic of the application.
// This use case is responsible for updating an existing user.



import { IUserRepository } from '../../../domain/interfaces/user.repository.interface';
import { UpdateUserRequest } from '../../../domain/models/user.model';

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
   * @returns Promise<ExecuteResponse<User>> - Response with updated user and backend message
   * @throws Error if the repository operation fails
   */
  async execute(id: number, data: UpdateUserRequest) {
    // In a real application, you could add business logic here:
    // - Validation
    // - Existence check
    // - Authorization checks
    // - Transformation
    // - Audit logging

    return this.repository.update(id, data);
  }
}
