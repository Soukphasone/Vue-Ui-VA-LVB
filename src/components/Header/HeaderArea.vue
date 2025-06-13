<script setup>
import { ref, watch } from 'vue'
import { useSidebarStore } from '@/stores/sidebar'
import ChangeLanguage from '../ChangeLanguage/ChangeLanguage.vue'
import { useRoute } from 'vue-router'
import SearchInput from '../Search/SearchInput.vue'
import { useSearchStore } from '@/stores/search'

const userData = JSON.parse(localStorage.getItem('userData'))
const currentPage = useRoute().name
const { toggleSidebar } = useSidebarStore()
const sidebarStore = useSidebarStore()
const search = ref('')
const store = useSearchStore()
watch(search, (newVal) => {
  store.setMessage(newVal)
})
</script>

<template>
  <div
    class="sticky top-0 z-999 w-full"
    :class="{ 'bg-header': currentPage === 'Login', 'bg-gray-100': currentPage === 'Home' }"
  >
    <header class="">
      <div class="flex flex-grow items-center justify-between py-2 px-4">
        <div class="flex items-center gap-2 sm:gap-4">
          <!-- Hamburger Toggle BTN -->
          <button
            class="z-99999 block rounded-max hover:bg-gray-200 p-1.5 hover:shadow-sm focus:outline-none"
            @click="
              () => {
                toggleSidebar()
              }
            "
            @keydown.esc="sidebarStore.isSidebarOpen = false"
          >
            <span class="relative block h-5.5 w-5.5 cursor-pointer">
              <span class="block absolute right-0 h-full w-full">
                <span
                  class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-primary delay-[0] duration-200 ease-in-out"
                  :class="{ '!w-full delay-300': !sidebarStore.isSidebarOpen }"
                ></span>
                <span
                  class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-primary delay-150 duration-200 ease-in-out"
                  :class="{ '!w-full delay-400': !sidebarStore.isSidebarOpen }"
                ></span>
                <span
                  class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-primary delay-200 duration-200 ease-in-out"
                  :class="{ '!w-full delay-500': !sidebarStore.isSidebarOpen }"
                ></span>
              </span>
              <span class="block absolute right-0 h-full w-full rotate-45">
                <span
                  class="absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-primary delay-300 duration-200 ease-in-out"
                  :class="{ '!h-0 delay-[0]': !sidebarStore.isSidebarOpen }"
                ></span>
                <span
                  class="delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-primary duration-200 ease-in-out"
                  :class="{ '!h-0 delay-200': !sidebarStore.isSidebarOpen }"
                ></span>
              </span>
            </span>
          </button>
        </div>
        <div></div>

        <div class="flex items-center gap-4 2xsm:gap-10">
          <ul class="flex items-center gap-2 2xsm:gap-4">
            <li>
              <!-- <div>
                <SearchInput v-model="search" />
              </div> -->
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
