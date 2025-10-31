<script setup>
import { useSidebarStore } from '@/stores/sidebar'
import { useRoute } from 'vue-router'
import { menuIcon } from './sidebarMenu'
import { svgIcons } from '@/stores/svgIcons'

const sidebarStore = useSidebarStore()
defineProps(['item', 'count', 'role'])
sidebarStore.page = useRoute().name
</script>
<template>
  <li>
    <router-link
      :to="item.MENU_PATH"
      class="group relative flex items-center py-2 px-2.5 font-medium text-bodydark3 duration-300 ease-in-out hover:bg-primary hover:text-white rounded-2xl"
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
              v-if="count > 0 && role === 'Checker'"
              class="relative flex"
              :class="{ hidden: sidebarStore.page === 'Authorization' }"
            >
              <span v-html="svgIcons.Bell" class="w-8 h-8"></span>
              <span
                class="absolute flex items-center left-4 bg-red-500 rounded-max text-whiter text-user w-5 h-5 justify-center"
                style="margin-top: -4px"
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
