<script setup>
import {ref, watch } from 'vue'
import MapVa from '../Tables/AddMapVa .vue'
import ListAddedRegister from '../Tables/ListAddedRegister.vue'

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
  <div class="w-full mx-auto rounded-lg shadow-md overflow-hidden"
  style="margin-top: -15px;">
      <div class="bg-primary py-4 px-6">
        <h1 class="text-2xl font-bold text-white md:text-center">{{ $t('list_customer_service') }}</h1>
      </div>
    <!-- Tab Buttons -->
    <div
      class="sticky top-15 flex items-center justify-center w-full bg-gray-100 p-6 z-99"
    >
    
      <div class="flex border border-gray-300 rounded-lg w-full md:w-[450px]">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click.prevent="activeTabs(tab)"
          class="flex-1 text-center font-medium transition-all duration-300 rounded-lg py-2 px-2 focus:outline-none"
          :class="[
            activeTab === tab
              ? 'border border-gray text-whiter bg-primary rounded-lg p-0.5'
              : 'text-primary hover:text-black hover:border border-gray-500'
          ]"
        >
          <div v-if="tab === 'Add To Register'" class="flex gap-2">
            <span
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 fill-current"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <!-- User head -->
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
                <!-- User shoulders -->
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 14c-4.418 0-8 2.239-8 5v1h8m0-6c4.418 0 8 2.239 8 5v1h-8"
                />
                <!-- Plus sign -->
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 8v4m2-2h-4"
                /></svg></span
            ><span>{{ $t('add_to_register') }}</span>
          </div>
          <div v-else-if="tab === 'Added List'" class="flex gap-2">
            <span
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <!-- User icon -->
                <circle cx="5" cy="7" r="2" />
                <!-- First line -->
                <line x1="10" y1="6" x2="20" y2="6" stroke-linecap="round" />
                <!-- Second user -->
                <circle cx="5" cy="12" r="2" />
                <line x1="10" y1="11" x2="20" y2="11" stroke-linecap="round" />
                <!-- Third user -->
                <circle cx="5" cy="17" r="2" />
                <line x1="10" y1="16" x2="20" y2="16" stroke-linecap="round" /></svg></span
            ><span>{{ $t('add_list') }}</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="bg-gray-100 rounded-lg">
      <p v-if="activeTab === 'Add To Register'">
        <MapVa />
      </p>
      <p v-else-if="activeTab === 'Added List'">
        <ListAddedRegister />
      </p>
      <p v-else-if="activeTab === 'Register'">
        <VaRegister />
      </p>
    </div>
  </div>
</template>
