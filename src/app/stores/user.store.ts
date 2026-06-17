// Pinia Store - State Management
// The store is responsible for managing the application state.
// It uses use cases to perform operations and updates the state accordingly.
// The store handles loading states, error states, and keeps the UI in sync.
// Important: The store does NOT contain HTTP implementation details.

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '~/domain/models/user.model';
import type { CreateUserRequest, UpdateUserRequest } from '~/domain/models/user.model';
import { UserRepository } from '~/app/repositories/user.repository';
import { GetUsersUseCase } from '~/app/use-cases/users/get-users';
import { CreateUserUseCase } from '~/app/use-cases/users/create-user';
import { UpdateUserUseCase } from '~/app/use-cases/users/update-user';
import { DeleteUserUseCase } from '~/app/use-cases/users/delete-user';

/**
 * useUserStore
 * Pinia store for managing user state and operations
 * Composition API syntax
 */
export const useUserStore = defineStore('user', () => {
  // ==================== STATE ====================
  // State variables are reactive and directly observable by components

  /** Array of all users */
  const users = ref<User[]>([]);

  /** Loading state - indicates if an operation is in progress */
  const loading = ref<boolean>(false);

  /** Error message - stores error information if an operation fails */
  const error = ref<string | null>(null);

  // ==================== DEPENDENCIES ====================
  // Initialize repository and use cases
  // These are used internally by the store actions

  const repository = new UserRepository();
  const getUsersUseCase = new GetUsersUseCase(repository);
  const createUserUseCase = new CreateUserUseCase(repository);
  const updateUserUseCase = new UpdateUserUseCase(repository);
  const deleteUserUseCase = new DeleteUserUseCase(repository);

  // ==================== COMPUTED ====================
  // Derived state values

  /**
   * Check if there are any users
   */
  const hasUsers = computed(() => users.value.length > 0);

  /**
   * Get the count of users
   */
  const userCount = computed(() => users.value.length);

  // ==================== ACTIONS ====================
  // Actions modify the state and handle business operations

  /**
   * Fetch all users from the API
   * Sets loading state while fetching, clears errors on success
   */
  async function fetchUsers(): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      users.value = await getUsersUseCase.execute();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch users';
      console.error('[useUserStore] fetchUsers error:', err);
    } finally {
      loading.value = false;
    }
  }

  /**
   * Create a new user
   * @param data - User creation data
   */
  async function createUser(data: CreateUserRequest): Promise<User | null> {
    loading.value = true;
    error.value = null;

    try {
      const newUser = await createUserUseCase.execute(data);
      // Add the new user to the store's users array
      users.value.push(newUser);
      return newUser;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create user';
      console.error('[useUserStore] createUser error:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Update an existing user
   * @param id - User ID to update
   * @param data - User update data
   */
  async function updateUser(id: number, data: UpdateUserRequest): Promise<User | null> {
    loading.value = true;
    error.value = null;

    try {
      const updatedUser = await updateUserUseCase.execute(id, data);
      // Update the user in the store's users array
      const index = users.value.findIndex((u) => u.id === id);
      if (index !== -1) {
        users.value[index] = updatedUser;
      }
      return updatedUser;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update user';
      console.error('[useUserStore] updateUser error:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Delete a user
   * @param id - User ID to delete
   */
  async function deleteUser(id: number): Promise<boolean> {
    loading.value = true;
    error.value = null;

    try {
      await deleteUserUseCase.execute(id);
      // Remove the user from the store's users array
      users.value = users.value.filter((u) => u.id !== id);
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete user';
      console.error('[useUserStore] deleteUser error:', err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Clear the error message
   */
  function clearError(): void {
    error.value = null;
  }

  // ==================== STORE EXPOSURE ====================
  // Return all state, computed properties, and actions

  return {
    // State
    users,
    loading,
    error,
    // Computed
    hasUsers,
    userCount,
    // Actions
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    clearError,
  };
});
