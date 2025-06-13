<script setup>
import { ref, watch } from 'vue'
import HeaderArea from '@/components/Header/HeaderArea.vue'
import SidebarArea from '@/components/Sidebar/SidebarArea.vue'
import { currentLanguage } from '@/i18n'
import { useRoute } from 'vue-router'
import showModals from '@/components/Modals/showModals.vue'
import { storeToRefs } from 'pinia'
import { useOpenModalStore } from '@/stores/modal'

const openModalStore = useOpenModalStore()
// const { isOpenModal } = openModalStore
const show = ref(false)
const titleModal = ref('')
const messageModal = ref('')
const currentPage = useRoute().name
const check = ref(currentLanguage.value)
watch(currentLanguage, (newLanguage) => {
  check.value = newLanguage
})
</script>

<template>
  <div :class="check === 'vn' ? '' : 'font-lao'">
    <!-- ===== Page Wrapper Start ===== -->
    <div class="flex h-screen overflow-hidden">
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
            :class="{ 'p-0': currentPage === 'Login', 'p-4': currentPage != 'Login' }"
          >
            <slot></slot>
          </div>
        </main>
        <!-- ===== Main Content End ===== -->
      </div>
    </div>
    <!-- ===== Page Wrapper End ===== -->
    <showModals
      :show-logout-modal="openModalStore.isOpenModal"
      :title="titleModal"
      :message="messageModal"
      @close="openModalStore.isOpenModal = false"
    />
  </div>
</template>
