// Pinia Store - State Management
// The store is responsible for managing the application state.
// It uses use cases to perform operations and updates the state accordingly.
// The store handles loading states, error states, and keeps the UI in sync.
// Important: The store does NOT contain HTTP implementation details.

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserRequest, UpdateUserRequest, User } from '../../../../domain/users/models/user.model';
import { GetUsersUseCase } from '../use-cases/get-users';
import { CreateUserUseCase } from '../use-cases/create-user';
import { UpdateUserUseCase } from '../use-cases/update-user';
import { DeleteUserUseCase } from '../use-cases/delete-user';
import { ExecuteResponse } from '../../../../types/api.types';

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

  /** Total number of users (for pagination) */
  const totalRows = ref<number>(0);

  /** Current page (for pagination) */
  const currentPage = ref<number>(1);

  /** Current page size (for pagination)*/
  const pageSize = ref<number>(10);

  /** Loading state - indicates if an operation is in progress */
  const loading = ref<boolean>(false);

  /** Error message - stores error information if an operation fails */
  const error = ref<string | null>(null);

  /** Success message - stores success message from backend */
  const successMessage = ref<string | null>(null);

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
   * Get the count of users on current page
   */
  const userCount = computed(() => users.value.length);

  /**
   * Calculate totalPage for pagination
   */
  const totalPages = computed(() => Math.ceil(totalRows.value / pageSize.value));

  // ==================== ACTIONS ====================
  // Actions modify the state and handle business operations

  /**
   * Fetch all users from the API
   * Sets loading state while fetching, clears errors on success
   * Stores pagination information for use in templates
   */
  async function fetchUsers(page = currentPage.value, limit = pageSize.value): Promise<void> {
    loading.value = true;

    try {
      const response = await getUsersUseCase.execute(page, limit);

      users.value = response.data;
      totalRows.value = response.totalRows;
      currentPage.value = response.page;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Fetch all users when changing page
   */
  async function changePage(page: number) {
    await fetchUsers(page, pageSize.value);
  }

  /**
   * Fetch all users when changing pageSize
   */
  async function changePageSize(size: number) {
    pageSize.value = size;

    await fetchUsers(1, size);
  }

  /**
   * Create a new user
   * @param data - User creation data
   */
  async function createUser(data: CreateUserRequest): Promise<boolean> {
    loading.value = true;
    error.value = null;
    successMessage.value = null;

    try {
      const response: ExecuteResponse<User> = await createUserUseCase.execute(data);

      // Show backend message
      successMessage.value = response.message;

      // Add the new user to the store's users array if data exists
      if (response.data) {
        users.value.push(response.data);
      }

      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create user';
      console.error('[useUserStore] createUser error:', err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Update an existing user
   * @param id - User ID to update
   * @param data - User update data
   */
  async function updateUser(id: number, data: UpdateUserRequest): Promise<boolean> {
    loading.value = true;
    error.value = null;
    successMessage.value = null;

    try {
      const response: ExecuteResponse<User> = await updateUserUseCase.execute(id, data);

      // Show backend message
      successMessage.value = response.message;

      // Update the user in the store's users array if data exists
      if (response.data) {
        const index = users.value.findIndex((u) => u.id === id);
        if (index !== -1) {
          users.value[index] = response.data;
        }
      }

      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update user';
      console.error('[useUserStore] updateUser error:', err);
      return false;
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
    successMessage.value = null;

    try {
      const response: ExecuteResponse = await deleteUserUseCase.execute(id);

      // Show backend message
      successMessage.value = response.message;

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

  /**
   * Clear the success message
   */
  function clearSuccessMessage(): void {
    successMessage.value = null;
  }

  // ==================== STORE EXPOSURE ====================
  // Return all state, computed properties, and actions

  return {
    // State
    users,
    totalRows,
    currentPage,
    pageSize,
    loading,
    error,
    successMessage,
    // Computed
    totalPages,
    hasUsers,
    userCount,
    // Actions
    fetchUsers,
    changePage,
    changePageSize,
    createUser,
    updateUser,
    deleteUser,
    clearError,
    clearSuccessMessage,
  };
});
