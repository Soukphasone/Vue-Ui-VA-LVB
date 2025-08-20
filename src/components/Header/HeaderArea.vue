<script setup>
import { useSidebarStore } from '@/stores/sidebar'
import ChangeLanguage from '../ChangeLanguage/ChangeLanguage.vue'
import { useRoute } from 'vue-router'

const userData = JSON.parse(localStorage.getItem('userData'))
const currentPage = useRoute().name
const { toggleSidebar } = useSidebarStore()
</script>

<template>
  <div
    class="sticky top-0 z-999 w-full"
    :class="{ 'bg-header': currentPage === 'Login', 'bg-gray-100': currentPage !== 'Login' }"
  >
    <header class="">
      <div class="flex flex-grow items-center justify-between py-2 px-4">
        <div class="flex items-center gap-2 sm:gap-4">
          <!-- Hamburger Toggle BTN -->
          <button
            @click="
              () => {
                toggleSidebar()
              }
            "
            class="focus:outline-none"
          >
            <span class="relative block h-12 w-12 cursor-pointer">
              <span class="absolute right-4 rounded-max hover:bg-gray-200 p-1.5 hover:shadow-sm">
                <svg
                  class="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </span>
            </span>
          </button>
        </div>
        <div class="flex items-center gap-4 2xsm:gap-10">
          <ul class="flex items-center gap-2 2xsm:gap-4">
            <li v-if="userData" class="text-red-600 text-sm border-r border-red-600 px-5">
              {{ userData.EMPNAME }}
            </li>

            <li class="mr-4">
              <ChangeLanguage />
            </li>
          </ul>
        </div>
      </div>
    </header>
  </div>
</template>
