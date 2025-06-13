<script setup>
import { useSidebarStore } from '@/stores/sidebar'
import { onClickOutside } from '@vueuse/core'
import { useDarkModeStore } from '@/stores/darkMode'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SidebarItem from './SidebarItem.vue'
import logoWhite from '@/assets/images/logo/champa-full-red-1.png'
import logo from '@/assets/images/logo/LVB-Logo.png'
import logoShop from '@/assets/images/logo/shop-online.png'
import { menuGroups } from './sidebarMenu'
import DropdownUser from '../Header/DropdownUser.vue'

const target = ref(null)
const sidebarStore = useSidebarStore()
const darkModeStore = useDarkModeStore()
onClickOutside(target, () => {
  sidebarStore.isSidebarOpen = false
})
const closeOnEscape = (event) => {
  if (event.key === 'Escape') {
    sidebarStore.isSidebarOpen = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', closeOnEscape)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', closeOnEscape)
})
</script>
<template>
  <div @click.prevent="closeOnEscape">
    <aside
      class="absolute left-0 top-0 z-9999 flex h-screen w-65 flex-col overflow-y-hidden bg-white border border-gray-200 duration-300 ease-linear"
      :class="{
        'translate-x-0': sidebarStore.isSidebarOpen,
        '-translate-x-full': !sidebarStore.isSidebarOpen
      }"
      ref="target"
    >
      <!-- SIDEBAR HEADER -->
      <div class="flex items-center justify-between gap-2 px-4 py-4">
        <button
          class="z-99999 block rounded-max hover:bg-gray-200 p-1.5 hover:shadow-sm focus:outline-none"
          @click="sidebarStore.isSidebarOpen = false"
        >
          <span class="relative block h-5.5 w-5.5 cursor-pointer">
            <span class="block absolute right-0 h-full w-full">
              <span
                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-primary delay-[0] duration-200 ease-in-out"
                :class="{ '!w-full delay-300': sidebarStore.isSidebarOpen }"
              ></span>
              <span
                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-primary delay-150 duration-200 ease-in-out"
                :class="{ '!w-full delay-400': sidebarStore.isSidebarOpen }"
              ></span>
              <span
                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-primary delay-200 duration-200 ease-in-out"
                :class="{ '!w-full delay-500': sidebarStore.isSidebarOpen }"
              ></span>
            </span>
            <span class="block absolute right-0 h-full w-full rotate-45">
              <span
                class="absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-primary delay-300 duration-200 ease-in-out"
                :class="{ '!h-0 delay-[0]': sidebarStore.isSidebarOpen }"
              ></span>
              <span
                class="delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-primary duration-200 ease-in-out"
                :class="{ '!h-0 delay-200': sidebarStore.isSidebarOpen }"
              ></span>
            </span>
          </span>
        </button>
        <router-link to="/">
          <div class="flex gap-1">
            <img
              :src="logo"
              alt="Logo"
              class="w-9 rounded-1"
            />
          </div>
        </router-link>
        <div class="text-primary font-bold">LAO-VIET-BANK</div>
        <div></div>
      </div>
      <!-- SIDEBAR HEADER -->
      <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <!-- Sidebar Menu -->
        <nav class="mt-5 py-2 px-2.5 lg:px-4">
          <div class="h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)] sm:h-[calc(100vh-5rem)]">
            <div class="flex flex-col justify-between h-full">
              <template v-for="menuGroup in menuGroups" :key="menuGroup.name">
                <div>
                  <ul class="mb-6 flex flex-col gap-1.5">
                    <SidebarItem
                      v-for="(menuItem, index) in menuGroup.menuItems"
                      :item="menuItem"
                      :key="index"
                      :index="index"
                    />
                  </ul>
                </div>
              </template>
              <div class="mt-auto">
                <DropdownUser />
              </div>
            </div>
          </div>
        </nav>
        <!-- Sidebar Menu -->
      </div>
    </aside>
  </div>
</template>
