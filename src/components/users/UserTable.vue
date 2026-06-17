<template>
  <!-- User Table Component
    Responsibility: Display users in a table format
    Features: Edit/delete buttons, empty state, loading state, responsive design
    Design: Modern Tailwind UI with hover effects
  -->
  <div class="w-full">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-600">Loading...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!hasUsers" class="text-center py-8">
      <p class="text-gray-600">No users found</p>
    </div>

    <!-- Users Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-100 border-b border-gray-200">
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-800">Name</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-800">Email</th>
            <th class="px-6 py-3 text-right text-sm font-semibold text-gray-800">Actions</th>
          </tr>
        </thead>
        <tbody>
          <UserRow
            v-for="user in users"
            :key="user.id"
            :user="user"
            @edit="$emit('edit', user)"
            @delete="$emit('delete', user.id)"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
// UserTable Component
// Responsibility: Display users in a table
// Features: Empty/loading states, user list iteration

import { computed } from 'vue';
import type { User } from '~/domain/models/user.model';
import UserRow from '~/components/users/UserRow.vue';

interface Props {
  users: User[];
  loading?: boolean;
}

interface Emits {
  (e: 'edit', user: User): void;
  (e: 'delete', userId: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

defineEmits<Emits>();

// ==================== COMPUTED ====================
const hasUsers = computed(() => props.users.length > 0);
</script>
