<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Loading from '@/components/Loading/Loading.vue'
import { useSearchStore } from '@/stores/search'
import { currentLanguage } from '@/i18n'
import { DeleteListAddedMap, ServiceRegsiter } from '@/service/Get_Post_API'
import showModals from '@/components/Modals/showModals.vue'
import SearchInput from '../Search/SearchInput.vue'
const userData = JSON.parse(localStorage.getItem('userData'))
const { t } = useI18n()
const check = ref(currentLanguage.value)
const serviceListAddedData = ref([])
const selectedItems = ref([]) // ChexBox
const checkItemData = ref(false)
const search = ref('')
const isLoading = ref(false)
const isLoadingMore = ref(false)
const itemsPerPage = ref(10) // Number of items to load per page
const currentPage = ref(1)
const showSuccess = ref(false)
const showError = ref(false)
const titleModal = ref('')
const messageModal = ref('' || 'Please try check again')
watch(currentLanguage, (newLanguage) => {
  check.value = newLanguage
})

// Computed property to check if all are selected
const isAllSelected = computed(
  () =>
    selectedItems.value.length > 0 &&
    selectedItems.value.length === serviceListAddedData.value.length
)

// Toggle Select All
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedItems.value = []
    checkItemData.value = false
  } else {
    selectedItems.value = serviceListAddedData.value.map((item) => item.ID)
    checkItemData.value = true
  }
}

// Toggle individual checkbox
const toggleSelection = (item) => {
  const id = item.ID
  const newSelectedItems = [...selectedItems.value] // Create a copy for immutability

  const index = newSelectedItems.indexOf(id)

  if (index !== -1) {
    newSelectedItems.splice(index, 1)
  } else {
    newSelectedItems.push(id)
  }

  selectedItems.value = newSelectedItems
  checkItemData.value = newSelectedItems.length > 0
}
const removeListAdded = async () => {
  if (!checkItemData.value) {
    titleModal.value = 'Please choose a service name'
    messageModal.value = 'Please check again'
    showError.value = true
    return
  }
  const data = {
    IDS: selectedItems.value
  }
  // isLoading.value = true
  try {
    const _res = await DeleteListAddedMap(data)
    if (_res.data.length > 0) {
      messageModal.value = 'Success'
      titleModal.value = 'Delete'
      showSuccess.value = true
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
    const _res = await ServiceRegsiter(data)
    console.log('service:', _res)
    if (_res.data.length > 0) {
      serviceListAddedData.value = _res.data
    } else {
      serviceListAddedData.value = []
    }
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
}
onMounted(fetchSericeData)
const filteredItems = computed(() => {
  return serviceListAddedData.value
    .filter((item) => item.SERVICE_NAME.toLowerCase().includes(search.value.toLowerCase()))
    .slice(0, currentPage.value * itemsPerPage.value)
})
const canLoadMore = computed(() => {
  return filteredItems.value.length < serviceListAddedData.value.length
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
            <span v-if="serviceListAddedData.length > 0"
              >Total: {{ serviceListAddedData.length }} customers</span
            >
            <span
              ><button
                v-if="serviceListAddedData.length > 0"
                @click.prevent="removeListAdded"
                class="flex items-center border border-gray-200 bg-whiter hover:bg-gray-100 py-0.5 px-2 text-black rounded-lg gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-6 h-6 text-red-500"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              {{ t('delete') }}
              </button></span
            >
          </div>
          <div class="flex items-center">
            <ul class="flex items-center gap-2">
              <li v-if="serviceListAddedData.length > 0">
                <SearchInput v-model="search" />
              </li>
            </ul>
          </div>
        </div>
        <div v-if="isLoading" class="flex flex-col justify-center items-center">
          <div class="mt-15">
            <Loading />
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
              <th class="px-4 w-[10px] font-medium text-black text-left">
                <div v-if="serviceListAddedData.length > 1" class="flex items-center gap-2">
                  <span>
                    <label class="flex items-center justify-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        :checked="isAllSelected"
                        @change="toggleSelectAll"
                        class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:outline-none"
                      />
                    </label>
                  </span>
                  <span>All</span>
                </div>
                <div v-else>{{ t('choose') }}</div>
              </th>
              <th class="py-2 font-medium text-black text-left px-6">{{ t('service_name') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filteredItems" :key="item.ID" class="text-gray-700">
              <td class="p-2 w-[65px] border-b text-center border border">
                <p>{{ index + 1 }}</p>
              </td>
              <td class="px-4 w-[10px] border-b">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    :checked="selectedItems.includes(item.ID)"
                    @change="() => toggleSelection(item)"
                    class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:outline-none"
                  />
                </label>
              </td>
              <td class="items-center px-6 border-b">
                <p>{{ item.SERVICE_NAME }}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex items-center justify-center text-center p-6">
          <div v-if="filteredItems.length >= 10">
            <span v-if="isLoadingMore">
              <Loading size="25" />
            </span>
            <button
              v-else-if="canLoadMore"
              class="p-0.5 px-6 border border-gray-300 bg-white rounded-xl hover:bg-gray-100"
              @click="loadMore"
            >
              {{ t('more') }} ...
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
