<template>
  <!-- Overlay -->
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <!-- Modal -->
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
      <!-- Title -->
      <h3 class="text-lg font-semibold text-gray-900 mb-2">
        {{ title }}
      </h3>

      <!-- Message -->
      <p class="text-gray-600 mb-6">
        {{ message }}
      </p>

      <!-- Actions -->
      <div class="flex justify-end gap-3">
        <button
          @click="$emit('cancel')"
          class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          {{ cancelText }}
        </button>

        <button
          @click="$emit('confirm')"
          class="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Confirm deletion',
  message: 'Are you sure you want to delete this item?',
  confirmText: 'Delete',
  cancelText: 'Cancel',
});

defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();
</script>
