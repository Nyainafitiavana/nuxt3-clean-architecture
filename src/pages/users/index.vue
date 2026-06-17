<template>
  <div class="min-h-screen bg-gray-50 py-8 px-6">
    <!-- HEADER -->
    <div class="max-w-6xl mx-auto mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Users</h1>
        <p class="text-gray-600">Manage application users</p>
      </div>

      <!-- ADD BUTTON -->
      <button
        @click="openCreateModal"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        + Add User
      </button>
    </div>

    <!-- ERROR -->
    <div
      v-if="error"
      class="max-w-6xl mx-auto mb-4 p-3 bg-red-100 text-red-700 rounded flex justify-between"
    >
      <span>{{ error }}</span>
      <button @click="clearError" class="font-bold">x</button>
    </div>

    <!-- TABLE -->
    <div class="max-w-6xl mx-auto bg-white shadow rounded-lg overflow-hidden">
      <UserTable
        :pageSize="pageSize"
        :users="users"
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

    <!-- USER MODAL -->
    <UserModal
      :open="showModal"
      :user="editingUser"
      :loading="loading"
      @submit="handleSubmit"
      @close="closeModal"
    />

    <!-- DELETE MODAL -->
    <DeleteModal
      v-if="showDeleteConfirmation"
      title="Delete User"
      message="Are you sure you want to delete this user? This action cannot be undone."
      confirmText="Delete"
      cancelText="Cancel"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUsers } from '../../app/features/users/composables/useUsers';

import UserTable from '../../components/features/users/UserTable.vue';
import Pagination from '../../components/shared/Pagination.vue';
import UserModal from '../../components/features/users/UserModal.vue';
import DeleteModal from '../../components/shared/DeleteModal.vue';

// ================= STORE =================
const {
  users,
  loading,
  currentPage,
  pageSize,
  totalPages,
  error,
  fetchUsers,
  changePage,
  changePageSize,
  createUser,
  updateUser,
  deleteUser,
  clearError,
} = useUsers();

// ================= STATE =================
const showModal = ref(false);
const editingUser = ref<any>(null);

const showDeleteConfirmation = ref(false);
const userToDelete = ref<number | null>(null);

// ================= INIT =================
onMounted(() => {
  fetchUsers();
});

// ================= CREATE =================
function openCreateModal() {
  editingUser.value = null;
  showModal.value = true;
}

// ================= EDIT =================
function handleEdit(user: any) {
  editingUser.value = user;
  showModal.value = true;
}

// ================= MODAL =================
function closeModal() {
  showModal.value = false;
  editingUser.value = null;
}

// ================= SUBMIT (CREATE + UPDATE) =================
async function handleSubmit(data: any) {
  if (editingUser.value) {
    await updateUser(editingUser.value.id, data);
  } else {
    await createUser(data);
  }

  closeModal();
}

// ================= DELETE =================
function handleDelete(id: number) {
  userToDelete.value = id;
  showDeleteConfirmation.value = true;
}

async function confirmDelete() {
  if (!userToDelete.value) return;

  await deleteUser(userToDelete.value);

  userToDelete.value = null;
  showDeleteConfirmation.value = false;
}

function cancelDelete() {
  userToDelete.value = null;
  showDeleteConfirmation.value = false;
}
</script>
