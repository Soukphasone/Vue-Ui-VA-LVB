<script setup>
import { useSidebarStore } from '@/stores/sidebar'
import { onClickOutside } from '@vueuse/core'
import { useDarkModeStore } from '@/stores/darkMode'
import { ref } from 'vue'
import SidebarItem from './SidebarItem.vue'
import logoWhite from '@/assets/images/logo/champa-full-red-1.png'
import logo from '@/assets/images/logo/LVB-Logo.png'
import { menuGroups } from './sidebarMenu'
import DropdownUser from '../Header/DropdownUser.vue'

const target = ref(null)
const sidebarStore = useSidebarStore()
const darkModeStore = useDarkModeStore()
onClickOutside(target, () => {
  sidebarStore.isSidebarOpen = false
})
</script>
<template>
  <button @keydown.esc="sidebarStore.isSidebarOpen = false">
    <aside
      class="absolute left-0 top-0 z-9999 flex h-screen w-65 flex-col overflow-y-hidden bg-white border border-gray-200 duration-300 ease-linear"
      :class="{
        'translate-x-0': sidebarStore.isSidebarOpen,
        '-translate-x-full': !sidebarStore.isSidebarOpen
      }"
      ref="target"
      @keydown.esc="sidebarStore.isSidebarOpen = false"
    >
      <!-- SIDEBAR HEADER -->
      <div class="flex items-center justify-between gap-2 px-4 py-3">
        <button
          class="z-99999 block rounded-max hover:bg-gray-200 p-1.5 hover:shadow-sm focus:outline-none" 
          @click="sidebarStore.isSidebarOpen = false"
        >
          <span class="relative block h-5.5 w-5.5 cursor-pointer">
            <span class="block absolute right-0 h-full w-full">
              <span
                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out"
                :class="{ '!w-full delay-300': sidebarStore.isSidebarOpen }"
              ></span>
              <span
                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out"
                :class="{ '!w-full delay-400': sidebarStore.isSidebarOpen }"
              ></span>
              <span
                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out"
                :class="{ '!w-full delay-500': sidebarStore.isSidebarOpen }"
              ></span>
            </span>
            <span class="block absolute right-0 h-full w-full rotate-45">
              <span
                class="absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out"
                :class="{ '!h-0 delay-[0]': sidebarStore.isSidebarOpen }"
              ></span>
              <span
                class="delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out"
                :class="{ '!h-0 delay-200': sidebarStore.isSidebarOpen }"
              ></span>
            </span>
          </span>
        </button>
        <router-link to="/">
          <div class="flex items-center gap-2">
            <img
              :src="!darkModeStore.darkMode ? logo : logoWhite"
              alt="Logo"
              class="w-9 rounded-1"
            />
            <h1 class="uppercase font-bold text-sm">Lao - viet Bank</h1>
          </div>
        </router-link>
        <div></div>
      </div>
      <!-- SIDEBAR HEADER -->
      <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <!-- Sidebar Menu -->
        <nav class="mt-5 py-2 px-2.5">
          <div class="h-[calc(90vh)]">
            <div class="flex flex-col justify-between h-full">
              <template v-for="menuGroup in menuGroups" :key="menuGroup.name">
                <div>
                  <!-- <h3 class="mb-4 ml-4 text-sm font-medium text-bodydark3">{{ menuGroup.name }}</h3> -->
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
              <DropdownUser />
              <!-- <template v-for="menuGroup in menuGroupsBottom" :key="menuGroup.name">
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
            </template> -->
            </div>
          </div>
        </nav>
        <!-- Sidebar Menu -->
      </div>
    </aside>
  </button>
</template>
