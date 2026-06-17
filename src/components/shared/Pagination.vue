<template>
  <div class="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 border-t">
    <div class="flex items-center gap-2">
      <span class="text-sm text-gray-600"> Rows per page </span>

      <select :value="pageSize" @change="onPageSizeChange" class="border rounded px-2 py-1">
        <option v-for="size in pageSizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
    </div>

    <div class="flex items-center gap-2">
      <button
        :disabled="currentPage === 1"
        @click="$emit('page-change', currentPage - 1)"
        class="px-3 py-1 border rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span class="text-sm"> Page {{ currentPage }} / {{ totalPages }} </span>

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
  interface Props {
    currentPage: number;
    totalPages: number;
    pageSize: number;
  }

  defineProps<Props>();

  const emit = defineEmits<{
    (e: 'page-change', page: number): void;
    (e: 'page-size-change', size: number): void;
  }>();

  const pageSizes = [5, 10, 25, 50, 100];

  function onPageSizeChange(event: Event) {
    const value = Number((event.target as HTMLSelectElement).value);

    emit('page-size-change', value);
  }
</script>
