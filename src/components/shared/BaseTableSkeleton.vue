<template>
  <div class="animate-pulse">
    <table class="w-full">
      <tbody>
        <tr v-for="row in rows" :key="row" class="border-b">
          <td v-for="col in columns" :key="col" class="px-6 py-4">
            <div class="h-4 bg-gray-200 rounded"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface Props {
  rows?: number;
  columns?: number;
}

withDefaults(defineProps<Props>(), {
  rows: 5,
  columns: 3,
});
</script>
