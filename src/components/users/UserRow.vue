<template>
  <!-- User Row Component
    Responsibility: Display a single user in a table row
    Features: Edit and delete buttons with event emission
    Design: Clean layout with hover effects
  -->
  <tr class="border-b border-gray-200 hover:bg-gray-50 transition-colors">
    <td class="px-6 py-4 text-sm text-gray-900 font-medium">{{ user.name }}</td>
    <td class="px-6 py-4 text-sm text-gray-600">{{ user.email }}</td>
    <td class="px-6 py-4 text-right">
      <div class="flex justify-end gap-3">
        <!-- Edit Button -->
        <button
          @click="$emit('edit')"
          class="text-blue-600 hover:text-blue-900 font-medium text-sm transition-colors"
        >
          Edit
        </button>

        <!-- Delete Button -->
        <button
          @click="$emit('delete')"
          class="text-red-600 hover:text-red-900 font-medium text-sm transition-colors"
        >
          Remove
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
// UserRow Component
// Responsibility: Display a single user row with actions
// Features: Edit and delete event emission


import { User } from '../../domain/users/models/user.model';

interface Props {
  user: User;
}

interface Emits {
  (e: 'edit'): void;
  (e: 'delete'): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>
