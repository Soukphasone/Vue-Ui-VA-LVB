<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { useRoute } from 'vue-router'
import { menuIcon } from './sidebarMenu'
const sidebarStore = useSidebarStore()
defineProps(['item', 'index'])
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
      class="group relative flex items-center gap-2.5 py-2 px-2.5 font-medium text-bodydark3 duration-300 ease-in-out hover:bg-primary hover:text-white rounded-2"
      :class="{
        'bg-primary text-white': sidebarStore.page === item.EN_NAME
      }"
    >
      <div class="flex items-center">
        <div v-for="menu in menuIcon" :key="menu.label" class="flex items-center justify-start">
        <div v-if="menu.label === item.EN_NAME">
          <span v-html="menu.icon" class="flex-shrink-0"></span>
        </div>
      </div>
      <div class="px-4">{{ $t(item.VI_NAME) }}</div>
      </div>
    </router-link>
  </li>
</template>
