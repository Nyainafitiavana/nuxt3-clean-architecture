// Composable - Vue Composition API Hook
// Composables provide a reusable way to extract and share logic in Vue components.
// This composable simplifies access to the user store from components.
// It exposes all necessary state and actions without exposing internal store details.

import { computed } from 'vue';
//import type { User, CreateUserRequest, UpdateUserRequest } from '~/domain/models/user.model';
import { useUserStore } from '../stores/user.store';

/**
 * useUsers composable
 * Simplifies component access to user store functionality
 * Provides a clean interface for component usage
 */
export function useUsers() {
  // Get the user store instance
  const store = useUserStore();

  // ==================== STATE ====================
  // Expose reactive state from the store

  const users = computed(() => store.users);
  const totalRows = computed(() => store.totalRows);
  const currentPage = computed(() => store.currentPage);
  const pageSize = computed(() => store.pageSize);
  const totalPages = computed(() => store.totalPages);
  const loading = computed(() => store.loading);
  const error = computed(() => store.error);
  const successMessage = computed(() => store.successMessage);
  const hasUsers = computed(() => store.hasUsers);
  const userCount = computed(() => store.userCount);

  // ==================== ACTIONS ====================
  // Expose store actions directly

  const fetchUsers = store.fetchUsers;
  const changePage = store.changePage;
  const changePageSize = store.changePageSize;
  const createUser = store.createUser;
  const updateUser = store.updateUser;
  const deleteUser = store.deleteUser;
  const clearError = store.clearError;
  const clearSuccessMessage = store.clearSuccessMessage;

  // ==================== COMPOSABLE EXPOSURE ====================
  // Return all exposed properties and methods

  return {
    // State
    users,
    totalRows,
    currentPage,
    pageSize,
    totalPages,
    loading,
    error,
    successMessage,
    // Computed
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
}
