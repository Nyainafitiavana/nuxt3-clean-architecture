<template>
  <div class="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 border-t">
    <!-- Page size -->
    <div class="flex items-center gap-2">
      <span class="text-sm text-gray-600">Rows per page</span>

      <select :value="pageSize" @change="onPageSizeChange" class="border rounded px-2 py-1">
        <option v-for="size in pageSizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
    </div>

    <!-- Pagination -->
    <div class="flex items-center gap-1">
      <!-- Prev -->
      <button
        :disabled="currentPage === 1"
        @click="$emit('page-change', currentPage - 1)"
        class="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      <!-- Pages -->
      <button
        v-for="(page, index) in pages"
        :key="index"
        :disabled="page === '...'"
        @click="goToPage(page)"
        class="px-3 py-1 border rounded"
        :class="page === currentPage ? 'bg-blue-600 text-white' : ''"
      >
        {{ page }}
      </button>

      <!-- Next -->
      <button
        :disabled="currentPage === totalPages"
        @click="$emit('page-change', currentPage + 1)"
        class="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'page-change', page: number): void;
  (e: 'page-size-change', size: number): void;
}>();

const pageSizes = [5, 10, 25, 50, 100];

/**
 * Smart pagination generator
 */
const pages = computed(() => {
  const total = props.totalPages;
  const current = props.currentPage;

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const result: (number | string)[] = [];

  // Always show first
  result.push(1);

  // Left gap
  if (current > 3) {
    result.push('...');
  }

  // Middle pages
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  // Right gap
  if (current < total - 2) {
    result.push('...');
  }

  // Always show last
  result.push(total);

  return result;
});

function goToPage(page: number | string) {
  if (page === '...') return;
  emit('page-change', Number(page));
}

function onPageSizeChange(event: Event) {
  const value = Number((event.target as HTMLSelectElement).value);
  emit('page-size-change', value);
}
</script>
