<script setup>
import { useOpenModalStore } from '@/stores/modal'

const userData = JSON.parse(localStorage.getItem('userData'))
const toggleLogOut = useOpenModalStore()
</script>
<template>
  <div class="relative mb-5">
    <div class="flex items-center">
      <div v-if="userData" class="block text-primary text-left font-bold text-user">
        <p>{{ userData.EMPNAME }}</p>
      </div>
      <button
        v-if="userData"
        class="absolute right-0 h-9 w-9 mb-2 focus:outline-none"
        @click="toggleLogOut.isLogOut = true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          class="fill-red-500 hover:fill-red-600"
        >
          <path
            d="M10 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H10V19H5V5H10V3ZM21 12L16 7V10H9V14H16V17L21 12Z"
          />
        </svg>
        <p class="text-user text-red-500">{{ $t('exit') }}</p>
      </button>
    </div>
  </div>
</template>
<style>
.text-user {
  font-size: 12px;
}
</style>
