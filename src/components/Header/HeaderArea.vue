<script setup>
import { ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import { useSidebarStore } from '@/stores/sidebar'
import Button from '../LogOut/Button.vue'
import { useRouter } from 'vue-router'
import { PATH } from '@/router/pathName'
import eventBus from '@/eventBus'

const userData = JSON.parse(localStorage.getItem('userData'))
const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])
const cartNumber = ref(cart.value.length || 0)
const router = useRouter()
const { toggleSidebar } = useSidebarStore()
const sidebarStore = useSidebarStore()

// Refresh
const refreshCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart'))
  if (cart) {
    cartNumber.value = cart.length
  }
}
onMounted(() => {
  eventBus.on('refresh', refreshCart)
})
onBeforeUnmount(() => {
  eventBus.off('refresh', refreshCart)
})

//
</script>

<template>
  <div class="sticky top-0 z-999 w-full bg-gray-100">
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
                  class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out"
                  :class="{ '!w-full delay-300': !sidebarStore.isSidebarOpen }"
                ></span>
                <span
                  class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out"
                  :class="{ '!w-full delay-400': !sidebarStore.isSidebarOpen }"
                ></span>
                <span
                  class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out"
                  :class="{ '!w-full delay-500': !sidebarStore.isSidebarOpen }"
                ></span>
              </span>
              <span class="block absolute right-0 h-full w-full rotate-45">
                <span
                  class="absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out"
                  :class="{ '!h-0 delay-[0]': !sidebarStore.isSidebarOpen }"
                ></span>
                <span
                  class="delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out"
                  :class="{ '!h-0 delay-200': !sidebarStore.isSidebarOpen }"
                ></span>
              </span>
            </span>
          </button>
        </div>
        <div></div>

        <div class="flex items-center gap-4 2xsm:gap-10">
          <ul class="flex items-center gap-2 2xsm:gap-4">
            <li class="py-2">
              <div
                v-if="userData"
                @click.prevent="router.push(PATH.CART)"
                class="relative inline-block mr-4"
              >
                <!-- Cart Icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-9 w-9"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                  />
                </svg>
                <!-- Item Count Badge -->
                <span
                  v-if="cartNumber > 0"
                  class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {{ cartNumber }}
                </span>
              </div>
              <div v-else class="relative inline-block">
                <!-- Cart Icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-9 w-9"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                  />
                </svg>
                <span
                  v-if="cartNumber > 0"
                  class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {{ cartNumber }}
                </span>
              </div>
            </li>
            <li>
              <Button />
            </li>
          </ul>
        </div>
      </div>
    </header>
  </div>
</template>
