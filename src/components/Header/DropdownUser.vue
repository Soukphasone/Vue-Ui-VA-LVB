<script setup>
import { useOpenModalStore } from '@/stores/modal'
import { svgIcons } from '@/stores/svgIcons'
const userData = JSON.parse(localStorage.getItem('userData'))
const toggleLogOut = useOpenModalStore()
</script>
<template>
  <div class="relative mb-4">
    <div class="flex items-center">
      <div v-if="userData" class="block text-primary text-left font-bold bg-gray-100 px-4 py-1 rounded-2xl text-user">
        <p>{{ userData.EMPNAME }}</p>
      </div>
      <button
        v-if="userData"
        class="absolute right-0 h-9 w-9 focus:outline-none"
        @click="toggleLogOut.isLogOut = true"
      >
        <span v-html="svgIcons.Exit"> </span>
        <p class="text-user text-red-500">{{ $t('exit') }}</p>
      </button>
    </div>
  </div>
</template>
<style scoped>
.text-user {
  font-size: 12px;
}
button {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(0.7);
    /* opacity: 1; */
  }
  50% {
    transform: scale(1);
    /* opacity: 0.8; */
  }
}
</style>