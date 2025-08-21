<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { useRoute } from 'vue-router'
import { menuIcon } from './sidebarMenu'
const sidebarStore = useSidebarStore()
defineProps(['item', 'index', 'count'])
sidebarStore.page = useRoute().name
interface SidebarItem {
  EN_NAME: string
}
</script>
<template>
  <!-- <li v-if="userData"> -->
  <li>
    <router-link
      :to="item.MENU_PATH"
      class="group relative flex items-center py-2 px-2.5 font-medium text-bodydark3 duration-300 ease-in-out hover:bg-primary hover:text-white rounded-2"
      :class="{
        'bg-primary text-white': sidebarStore.page === item.EN_NAME
      }"
    >
      <div>
        <div class="flex items-center">
          <div v-for="menu in menuIcon" :key="menu.label" class="flex items-center justify-start">
            <div v-if="menu.label === item.EN_NAME">
              <span v-html="menu.icon" class="flex-shrink-0"></span>
            </div>
          </div>
          <div class="px-4">{{ $t(item.VI_NAME) }}</div>
          <span v-if="item.VI_NAME === 'authorization'" class="absolute right-0 px-4">
            <div
              v-if="count > 0"
              class="relative flex"
              :class="{ hidden: sidebarStore.page === 'Authorization' }"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.75"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0h6z"
                  />
                </svg>
              </span>
              <span
                class="absolute flex items-center left-6 bg-red-500 rounded-max text-whiter text-user w-5 h-5 justify-center"
                style="margin-top: -5px"
              >
                {{ count }}
              </span>
            </div>
          </span>
        </div>
      </div>
    </router-link>
  </li>
</template>
