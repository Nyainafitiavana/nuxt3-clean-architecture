// Domain Model - User
// Domain models represent core business entities.
// They are pure data structures independent from any framework or library.
// Domain models should never depend on Vue, Pinia, or HTTP implementation details.
// They are the heart of the application's business logic.

/**
 * User domain model
 * Represents a user entity in the system
 * This interface defines the structure of user data throughout the application
 */
export interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * Create User DTO (Data Transfer Object)
 * Used when creating a new user (without id)
 */
export interface CreateUserRequest {
  name: string;
  email: string;
}

/**
 * Update User DTO (Data Transfer Object)
 * Used when updating an existing user
 */
export interface UpdateUserRequest {
  name?: string;
  email?: string;
}
