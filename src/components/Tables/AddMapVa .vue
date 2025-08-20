<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Loading from '@/components/Loading/Loading.vue'
import { currentLanguage } from '@/i18n'
import { MapVA, Service } from '@/service/Get_Post_API'
import showModals from '@/components/Modals/showModals.vue'
import SearchInput from '../Search/SearchInput.vue'

const userData = JSON.parse(localStorage.getItem('userData'))
const { t } = useI18n()
const check = ref(currentLanguage.value)
const serviceMapData = ref([])
const selectedItems = ref([])
const checkItemData = ref(false)
const search = ref('')
const isLoading = ref(false)
const isLoadingMore = ref(false)
const itemsPerPage = ref(10)
const currentPage = ref(1)
const showSuccess = ref(false)
const showError = ref(false)
const titleModal = ref('')
const messageModal = ref('' || 'Please check again')
watch(currentLanguage, (newLanguage) => {
  check.value = newLanguage
})

// Toggle individual checkbox
const toggleSelection = (item) => {
  const index = selectedItems.value.findIndex((i) => i.SERVICE_PROFILE === item.SERVICE_PROFILE)
  if (index !== -1) {
    // Item is already selected, so remove it
    selectedItems.value.splice(index, 1)
    // Only set checkItemData to false if no items are selected
    if (selectedItems.value.length === 0) {
      checkItemData.value = false
    }
  } else {
    // Item is not selected, so add it
    selectedItems.value.push(item)
    checkItemData.value = true
  }
}
const addToRegister = async () => {
  if (!checkItemData.value) {
    titleModal.value = 'Plese choose a service name'
    messageModal.value = 'Please check again'
    showError.value = true
    return
  }
  const data = {
    USER_ID: userData.EMPID,
    DATA: selectedItems.value
  }
  isLoading.value = true
  try {
    const _res = await MapVA(data)
    if (_res.data.length > 0) {
      titleModal.value = 'Add To Registration'
      messageModal.value = 'Success'
      showSuccess.value = true
      selectedItems.value = []
      checkItemData.value = false
      fetchSericeData()
    }
  } finally {
    isLoading.value = false
  }
}
const fetchSericeData = async () => {
  const data = {
    USER_ID: userData.EMPID
  }
  isLoading.value = true
  try {
    const _res = await Service(data)
    if (_res.data.length > 0) {
      serviceMapData.value = _res.data
    } else {
      serviceMapData.value = []
    }
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
}
onMounted(fetchSericeData)
const filteredItems = computed(() => {
  return serviceMapData.value
    .filter((item) => item.SERVICE_NAME.toLowerCase().includes(search.value.toLowerCase()))
    .slice(0, currentPage.value * itemsPerPage.value)
})
const canLoadMore = computed(() => {
  return filteredItems.value.length < serviceMapData.value.length
})
const loadMore = () => {
  isLoadingMore.value = true
  setTimeout(() => {
    isLoadingMore.value = false
    currentPage.value++
  }, 500)
}
</script>
<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div>
        <div class="flex flex-grow items-center justify-between py-3 px-4">
          <div class="flex items-center gap-4">
            <span>{{ t('amount') }}: {{ serviceMapData.length }} </span>
            <span
              ><button
                @click.prevent="addToRegister"
                class="flex items-center border border-gray-200 bg-whiter hover:bg-gray-100 py-0.5 px-2 text-black rounded-lg gap-2 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                {{ t('add') }}
              </button></span
            >
          </div>
          <div class="flex items-center">
            <ul class="flex items-center gap-2">
              <li>
                <SearchInput v-model="search" />
              </li>
            </ul>
          </div>
        </div>
        <div v-if="isLoading" class="flex flex-col justify-center items-center">
          <div class="mt-15">
            <Loading/>
          </div>
        </div>
        <div
          v-else-if="!isLoading && filteredItems.length <= 0"
          class="flex flex-col justify-center items-center"
        >
          <div class="flex flex-col items-center justify-center">
            <svg
              class="w-20 h-20 text-red-600 animate-pulse"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="50" cy="50" r="40" class="opacity-50" />
              <line x1="30" y1="30" x2="70" y2="70" class="opacity-75" />
              <line x1="70" y1="30" x2="30" y2="70" class="opacity-75" />
            </svg>
            <p class="mt-2 text-gray-500 text-sm">{{ t('no_data') }}</p>
          </div>
        </div>
        <table v-else class="w-full table-auto">
          <thead>
            <tr class="bg-gray-50 border-b text-center">
              <th class="p-2 w-[65px] font-medium text-black">{{ t('stt') }}</th>
              <th class="px-2 max-w-[5px] font-medium text-black">{{ t('choose') }}</th>
              <th class="py-2 px-8 font-medium text-black text-left">{{ t('service_name') }}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in filteredItems"
              :key="item.SERVICE_PROFILE"
              class="text-gray-700"
            >
              <td class="p-2 w-[65px] border-b text-center border border">
                <p>{{ index + 1 }}</p>
              </td>
              <td class="p-2 max-w-[5px] border-b">
                <label class="flex items-center justify-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    @change="toggleSelection(item)"
                    class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:outline-none"
                  />
                </label>
              </td>
              <td class="items-center px-8 border-b">
                <p>{{ item.SERVICE_NAME }}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex items-center justify-center text-center p-4">
          <div v-if="filteredItems.length >= 10">
            <span v-if="isLoadingMore">
              <Loading size="40px" />
            </span>
            <button
              v-else-if="canLoadMore"
              class="p-0.5 px-6 border border-gray-300 bg-white rounded-xl hover:bg-gray-100"
              @click="loadMore"
            >
              More ...
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Success Modal -->
  <showModals
    :show-success-modal="showSuccess"
    :title="titleModal"
    :message="messageModal"
    @close="showSuccess = false"
  />
  <showModals
    :show-error-modal="showError"
    :title="titleModal"
    :message="messageModal"
    @close="showError = false"
  />
</template>
