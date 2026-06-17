<template>
  <!-- User Form Component
    Responsibility: Collect user input for create/edit operations
    Features: Name and email fields, validation, create/edit modes
    Design: Modern Tailwind UI with focus states and error display
  -->
  <form @submit.prevent="handleSubmit" class="space-y-4 p-4">
    <!-- Name Field -->
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700 mb-2"> Name </label>
      <input
        id="name"
        v-model="formData.name"
        type="text"
        placeholder="Enter user name"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        :disabled="loading"
        required
      />
      <p v-if="nameError" class="mt-1 text-sm text-red-500">{{ nameError }}</p>
    </div>

    <!-- Email Field -->
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 mb-2"> Email </label>
      <input
        id="email"
        v-model="formData.email"
        type="email"
        placeholder="Enter user email"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        :disabled="loading"
        required
      />
      <p v-if="emailError" class="mt-1 text-sm text-red-500">{{ emailError }}</p>
    </div>

    <!-- Form Actions -->
    <div class="flex gap-3 pt-4">
      <!-- Submit Button -->
      <button
        type="submit"
        class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        :disabled="loading"
      >
        <span v-if="!loading">{{ isEditMode ? 'Update' : 'Create' }}</span>
        <span v-else>Loading...</span>
      </button>

      <!-- Cancel Button -->
      <button
        type="button"
        @click="handleCancel"
        class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        :disabled="loading"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
// UserForm Component
// Responsibility: Collect and validate user input
// Features: Create and edit modes, field validation, error display

import { ref, computed, watch } from 'vue';
import { CreateUserRequest, UpdateUserRequest, User } from '../../domain/users/models/user.model';

interface Props {
  user: User | null;
  loading?: boolean;
}

interface Emits {
  (e: 'submit', data: CreateUserRequest | UpdateUserRequest): void;
  (e: 'cancel'): void;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const emit = defineEmits<Emits>();

// ==================== STATE ====================
// Form data with default values
const formData = ref({
  name: props.user?.name || '',
  email: props.user?.email || '',
});

// Watch for user changes to update form data
watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      formData.value = {
        name: newUser.name,
        email: newUser.email,
      };
    } else {
      formData.value = {
        name: '',
        email: '',
      };
    }
  }
);

// ==================== COMPUTED ====================
// Determine if form is in edit mode
const isEditMode = computed(() => !!props.user);

// Simple field validation
const nameError = computed(() => {
  if (formData.value.name.trim().length === 0) return '';
  if (formData.value.name.trim().length < 2) return 'Name must be at least 2 characters';
  return '';
});

const emailError = computed(() => {
  if (formData.value.email.trim().length === 0) return '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.value.email)) return 'Please enter a valid email';
  return '';
});

const isValid = computed(() => {
  return (
    formData.value.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)
  );
});

// ==================== METHODS ====================
// Handle form submission
function handleSubmit(): void {
  if (!isValid.value) return;

  const data = {
    name: formData.value.name.trim(),
    email: formData.value.email.trim(),
  };

  emit('submit', data);
}

// Handle cancel action
function handleCancel(): void {
  emit('cancel');
}
</script>
