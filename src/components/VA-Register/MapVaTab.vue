<script setup>
import { ref, watch } from 'vue'
import MapVa from '../Tables/AddMapVa .vue'
import ListAddedRegister from '../Tables/ListAddedRegister.vue'
import { svgIcons } from '@/stores/svgIcons'
import HeaderInside from '@/components/Header/HeaderInside.vue'
import showModals from '@/components/Modals/showModals.vue'
import { useOpenModalStore } from '@/stores/modal'

const userData = JSON.parse(localStorage.getItem('userData'))
const isOpen = useOpenModalStore()
const tabs = ['Add To Register', 'Added List']
const activeTab = ref(localStorage.getItem('ActiveTab') || 'Add To Register')
watch(activeTab, (newTab) => {
  localStorage.setItem('ActiveTab', newTab)
})
const activeTabs = (tab) => {
  activeTab.value = tab
}
</script>
<template>
  <div v-if="userData.ROLE_NAME === 'Maker'" class="w-full mx-auto rounded-2xl shadow-md overflow-hidden" data-aos="fade-left"  style="margin-top: -15px">
    <HeaderInside :title="$t('list_customer_service')" />
    <!-- Tab Buttons -->
    <div class="sticky top-15 flex items-center justify-center w-full bg-gray-100 p-6 z-99">
      <div class="flex border border-gray-300 rounded-2xl w-full md:w-[450px]">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click.prevent="activeTabs(tab)"
          class="flex-1 text-center font-medium transition-all duration-300 rounded-2xl py-2 px-2 focus:outline-none"
          :class="[
            activeTab === tab
              ? 'border border-gray text-whiter bg-primary rounded-2xl p-0.5'
              : 'text-primary hover:text-black hover:border border-gray-500'
          ]"
        >
          <div v-if="tab === 'Add To Register'" class="flex gap-2">
            <span v-html="svgIcons.AddUser" class="w-6 w-6 fill-current"></span>
            <span>{{ $t('add_to_register') }}</span>
          </div>
          <div v-else-if="tab === 'Added List'" class="flex gap-2">
            <span v-html="svgIcons.DataList" class="w-6 w-6"></span>
            <span>{{ $t('add_list') }}</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="bg-gray-100 rounded-2xl">
      <p v-if="activeTab === 'Add To Register'">
        <MapVa />
      </p>
      <p v-else-if="activeTab === 'Added List'">
        <ListAddedRegister />
      </p>
    </div>
  </div>
  <showModals :show-success-modal="isOpen.isSuccess" :title="$t('successfully')" @close="isOpen.isSuccess = false" />
  <showModals :show-error-modal="isOpen.isError" :title="$t('pl_choose_service_name')" @close="isOpen.isError = false" />
</template>
