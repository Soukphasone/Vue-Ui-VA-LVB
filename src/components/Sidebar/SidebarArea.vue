<script setup>
import { useSidebarStore } from '@/stores/sidebar'
import { onClickOutside } from '@vueuse/core'
import { ref, onMounted } from 'vue'
import SidebarItem from './SidebarItem.vue'
import { menuGroups } from './sidebarMenu'
import DropdownUser from '../Header/DropdownUser.vue'
import { useRoute } from 'vue-router'
import logo from '@/assets/images/logo/LVB-Logo.png'
import { MenuList } from '@/service/Get_Post_API'

const userData = JSON.parse(localStorage.getItem('userData'))
const currentPage = useRoute().name
const target = ref(null)
const sidebarStore = useSidebarStore()
const menuList = ref(null)
onClickOutside(target, () => {
  sidebarStore.isSidebarOpen = false
})
const Menu = async () => {
  const body = {
    ROLE: userData.ROLE_ID
  }
  try {
    const _res = await MenuList(body)
    menuList.value = _res.data
  } catch (error) {}
}
onMounted(Menu)
</script>
<template>
  <div>
    <aside
      class="w-[300px] h-full bg-white border border-gray-200 duration-300 ease-linear"
      v-show="currentPage === 'Login' ? !sidebarStore.isSidebarOpen : sidebarStore.isSidebarOpen"
    >
      <!-- SIDEBAR HEADER -->
      <div class="flex items-center justify-start gap-2 px-6 py-4">
        <router-link to="/">
          <div class="flex gap-1">
            <img :src="logo" alt="Logo" class="w-9 rounded-1" />
          </div>
        </router-link>
        <div class="text-primary font-bold">LAO-VIET-BANK</div>
      </div>
      <!-- SIDEBAR HEADER -->
      <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <!-- Sidebar Menu -->
        <nav class="mt-5 py-2 px-2.5 lg:px-4">
          <div class="h-[calc(100vh-8rem)] md:h-[calc(100vh-7rem)] sm:h-[calc(100vh-5rem)]">
            <div class="flex flex-col justify-between h-full">
              <template v-for="menuGroup in menuList" :key="menuGroup.EN_NAME">
                <div>
                  <ul class="mb-2 flex flex-col gap-1.5">
                    <SidebarItem :item="menuGroup" :key="index" :index="index" />
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
