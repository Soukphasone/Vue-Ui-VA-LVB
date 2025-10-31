<script setup>
import { useSidebarStore } from '@/stores/sidebar'
import ChangeLanguage from '../ChangeLanguage/ChangeLanguage.vue'
import Profile from '../Profile/Profile.vue'
import Flower_1 from '@/assets/images/loading/load.gif'
import { useRoute } from 'vue-router'
import { svgIcons } from '@/stores/svgIcons'
const userData = JSON.parse(localStorage.getItem('userData'))
const currentPage = useRoute().name
const { toggleSidebar } = useSidebarStore()
</script>

<template>
  <div class="sticky top-0 z-99 w-full bg-gray-100">
    <header class="">
      <div class="flex flex-grow items-center justify-between py-2 px-4">
        <div class="flex items-center">
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
                <span v-html="svgIcons.Hamberger"> </span>
              </span>
            </span>
          </button>
          <div v-if="currentPage !== 'Home'" class="flex">
            <span class="absolute bottom-0">
              <img :src="Flower_1" alt="" class="w-7 h-7" />
            </span>
            <span class="mt-1 ml-7">
              <img :src="Flower_1" alt="" class="w-11 h-11" />
            </span>
            <img :src="Flower_1" alt="" class="w-7 h-7" />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span>
            <ChangeLanguage />
          </span>
          <span v-if="userData"><Profile /></span>
        </div>
      </div>
    </header>
  </div>
</template>
