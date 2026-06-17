<template>
  <div v-if="open" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white w-full max-w-md rounded-lg shadow-lg">
      <!-- Header -->
      <div class="px-4 py-3 border-b flex justify-between">
        <h2 class="font-semibold">
          {{ user ? 'Update User' : 'Create User' }}
        </h2>

        <button @click="$emit('close')" class="text-gray-500">✕</button>
      </div>

      <!-- Form -->
      <UserForm
        ref="formRef"
        :user="user"
        :loading="loading"
        @submit="handleSubmit"
        @cancel="$emit('close')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UserForm from './UserForm.vue';
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from '../../domain/users/models/user.model';

const props = defineProps<{
  open: boolean;
  user: User | null;
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: 'submit', data: CreateUserRequest | UpdateUserRequest): void;
  (e: 'close'): void;
}>();

const formRef = ref();

function handleSubmit(data: any) {
  emit('submit', data);
  formRef.value?.resetForm();
  emit('close');
}
</script>
