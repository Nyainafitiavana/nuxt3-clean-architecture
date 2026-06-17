<template>
  <!-- Users Management Page
    Responsibility: Main page for user CRUD operations
    Features: Create form, users list, edit mode, delete confirmation
    Design: Modern dashboard-like layout with Tailwind CSS
  -->
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Users</h1>
        <p class="mt-2 text-gray-600">Manage application users</p>
      </div>

      <!-- Error Alert -->
      <div
        v-if="error"
        class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center"
      >
        <p class="text-red-800">{{ error }}</p>
        <button @click="clearError" class="text-red-600 hover:text-red-900 font-semibold">
          Dismiss
        </button>
      </div>

      <!-- Success Alert -->
      <div
        v-if="showSuccessMessage"
        class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg"
      >
        <p class="text-green-800">{{ successMessage }}</p>
      </div>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Form Section -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="bg-gray-100 px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-900">
                {{ editingUser ? 'Update User' : 'Create User' }}
              </h2>
            </div>
            <UserForm
              :user="editingUser"
              :loading="loading"
              @submit="handleFormSubmit"
              @cancel="handleCancel"
            />
          </div>
        </div>

        <!-- Table Section -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="bg-gray-100 px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-900">Users List ({{ userCount }})</h2>
            </div>
            <div class="overflow-x-auto">
              <UserTable
                :users="users"
                :pageSize="pageSize"
                :loading="loading"
                @edit="handleEdit"
                @delete="handleDelete"
              />
              <Pagination
                :current-page="currentPage"
                :total-pages="totalPages"
                :page-size="pageSize"
                @page-change="changePage"
                @page-size-change="changePageSize"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteConfirmation"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Delete User</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete this user? This action cannot be undone.
        </p>
        <div class="flex gap-3">
          <button
            @click="confirmDelete"
            class="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Delete
          </button>
          <button
            @click="cancelDelete"
            class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Users Index Page
// Responsibility: Main user management interface
// Features: CRUD operations, state management, user interactions

import { ref, computed, onMounted } from 'vue';
import { useUsers } from '../../app/features/users/composables/useUsers';
import { CreateUserRequest, UpdateUserRequest, User } from '../../domain/users/models/user.model';
import UserForm from '../../components/users/UserForm.vue';
import UserTable from '../../components/users/UserTable.vue';
import Pagination from '../../components/shared/Pagination.vue';

// ==================== COMPOSABLE ====================
// Use the users composable for all state and actions
const {
  users,
  loading,
  currentPage,
  pageSize,
  totalPages,
  error,
  userCount,
  fetchUsers,
  changePage,
  changePageSize,
  createUser,
  updateUser,
  deleteUser,
  clearError: clearStoreError,
} = useUsers();

// ==================== LOCAL STATE ====================
// Component-specific state

/** Currently edited user (null = create mode) */
const editingUser = ref<User | null>(null);

/** User ID pending deletion */
const userToDelete = ref<number | null>(null);

/** Show/hide delete confirmation modal */
const showDeleteConfirmation = ref(false);

/** Show/hide success message */
const showSuccessMessage = ref(false);

/** Success message text */
const successMessage = ref('');

// ==================== COMPUTED ====================
const isEditMode = computed(() => !!editingUser.value);

// ==================== METHODS ====================

/**
 * Load users on page mount
 */
async function loadUsers(): Promise<void> {
  await fetchUsers();
}

/**
 * Handle form submission (create or update)
 */
async function handleFormSubmit(data: CreateUserRequest | UpdateUserRequest): Promise<void> {
  if (isEditMode.value && editingUser.value) {
    // Update mode
    const result = await updateUser(editingUser.value.id, data);
    if (result) {
      showSuccessMessage.value = true;
      successMessage.value = 'User updated successfully';
      editingUser.value = null;
      setTimeout(() => {
        showSuccessMessage.value = false;
      }, 3000);
    }
  } else {
    // Create mode
    const result = await createUser(data as CreateUserRequest);
    if (result) {
      showSuccessMessage.value = true;
      successMessage.value = 'User created successfully';
      // Reset form
      resetForm();
      setTimeout(() => {
        showSuccessMessage.value = false;
      }, 3000);
    }
  }
}

/**
 * Handle edit action
 */
function handleEdit(user: User): void {
  editingUser.value = user;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Handle delete action (show confirmation)
 */
function handleDelete(userId: number): void {
  userToDelete.value = userId;
  showDeleteConfirmation.value = true;
}

/**
 * Confirm delete action
 */
async function confirmDelete(): Promise<void> {
  if (userToDelete.value === null) return;

  const success = await deleteUser(userToDelete.value);
  if (success) {
    showSuccessMessage.value = true;
    successMessage.value = 'User deleted successfully';
    showDeleteConfirmation.value = false;
    userToDelete.value = null;
    setTimeout(() => {
      showSuccessMessage.value = false;
    }, 3000);
  }
}

/**
 * Cancel delete action
 */
function cancelDelete(): void {
  showDeleteConfirmation.value = false;
  userToDelete.value = null;
}

/**
 * Handle cancel from form
 */
function handleCancel(): void {
  resetForm();
}

/**
 * Reset form to create mode
 */
function resetForm(): void {
  editingUser.value = null;
}

/**
 * Clear error message
 */
function clearError(): void {
  clearStoreError();
}

// ==================== LIFECYCLE ====================
// Load users when component mounts
onMounted(() => {
  loadUsers();
});
</script>
