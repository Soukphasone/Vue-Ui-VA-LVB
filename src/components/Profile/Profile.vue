<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import Profiledetail from './Profiledetail.vue'

const userData = JSON.parse(localStorage.getItem('userData'))
const server =  import.meta.env.VITE_SERVER_SRC
const isOpen = ref(false)
const target = ref(null)
function toggleDropdown() {
  isOpen.value = !isOpen.value
}
onClickOutside(target, () => {
  isOpen.value = false
})
</script>

<template>
  <div class="relative inline-block" ref="target">
    <!-- Profile Image -->
    <button
      @click="toggleDropdown"
      @keydown.esc="isOpen = false"
      :title="userData.USERAD"
      class="flex items-center justify-center rounded-full hover:bg-gray-300 focus:outline-none w-11 h-11"
      :class="isOpen ? 'bg-gray-400 hover:bg-gray-400' : ''"
    >
      <img
        v-if="userData"
        :src="`${server}${userData.PICTURE}`"
        alt="profile"
        class="w-10 h-10 rounded-full"
      />
    </button>

    <!-- Dropdown -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <button v-if="isOpen" class="absolute right-0 mt-2 w-100 z-50 focus:outline-none" @keydown.esc="isOpen = false">
        <Profiledetail />
      </button>
    </transition>
  </div>
</template>
