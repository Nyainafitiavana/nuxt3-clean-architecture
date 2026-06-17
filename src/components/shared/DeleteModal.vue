<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
      <!-- TITLE -->
      <h2 class="text-lg font-semibold text-gray-900">Confirm Deletion</h2>

      <!-- MESSAGE -->
      <p class="mt-2 text-gray-600">
        Are you sure you want to delete this item? This action cannot be undone.
      </p>

      <!-- ACTIONS -->
      <div class="flex justify-end gap-3 mt-6">
        <button @click="$emit('cancel')" class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
          Cancel
        </button>

        <button
          @click="$emit('confirm')"
          class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();
</script>
