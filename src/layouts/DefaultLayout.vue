<script setup>
import { ref, watch, onMounted } from 'vue'
import HeaderArea from '@/components/Header/HeaderArea.vue'
import SidebarArea from '@/components/Sidebar/SidebarArea.vue'
import { currentLanguage } from '@/i18n'
import { useRoute } from 'vue-router'
import showModals from '@/components/Modals/showModals.vue'
import { useOpenModalStore } from '@/stores/modal'
import { isTokenExpired } from '@/stores/checkToken'
import { logout } from '@/stores/clearStorage'
const openModalStore = useOpenModalStore()
const currentPage = useRoute().name
const check = ref(currentLanguage.value)
watch(currentLanguage, (newLanguage) => {
  check.value = newLanguage
})
const checkToken = () => {
  const token = localStorage.getItem('authToken')
  if (isTokenExpired(token)) {
    logout()
  }
}
onMounted(checkToken)
</script>

<template>
  <div :class="check === 'vn' ? '' : 'font-lao'">
    <!-- ===== Page Wrapper Start ===== -->
    <div class="flex h-screen">
      <!-- ===== Sidebar Start ===== -->
      <SidebarArea />
      <!-- ===== Sidebar End ===== -->
      <!-- ===== Content Area Start ===== -->
      <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden max-w-screen">
        <!-- ===== Header Start ===== -->
        <HeaderArea />
        <!-- ===== Header End ===== -->
        <!-- ===== Main Content Start ===== -->
         <main>
          <div
            class="mx-auto max-w-screen"
            :class="{ 'p-0': currentPage === 'Login', 'p-4': currentPage !== 'Login'}"
          >
            <slot></slot>
          </div>
        </main>
       </div>
        <!-- ===== Main Content End ===== -->
      </div>
    <!-- ===== Page Wrapper End ===== -->
    <showModals
      :show-confirm-modal="openModalStore.isLogOut"
      :title="$t('do_you_want_to_log_out')"
      :message="$t('logout')"
      value="logout"
      @close="openModalStore.isLogOut = false"
    />
  </div>
</template>
