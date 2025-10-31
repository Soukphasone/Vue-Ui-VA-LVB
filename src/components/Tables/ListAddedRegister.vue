<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Loading from '@/components/Loading/Loading.vue'
import { currentLanguage } from '@/i18n'
import { DeleteListAddedMap, ServiceRegsiter } from '@/service/Get_Post_API'
import SearchInput from '../Search/SearchInput.vue'
import { svgIcons } from '@/stores/svgIcons'
import { useOpenModalStore } from '@/stores/modal'

const userData = JSON.parse(localStorage.getItem('userData'))
const isOpen = useOpenModalStore()
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
const reset = async () => {
  checkItemData.value = false
  selectedItems.value = []
  isOpen.isSuccess = true
  await fetchSericeData()
}
const removeListAdded = async () => {
  if (!checkItemData.value) {
    return (isOpen.isError = true)
  }
  const data = {
    IDS: selectedItems.value
  }
  isLoading.value = true
  try {
    const _res = await DeleteListAddedMap(data)
    if (_res.message === 'SUCCESS') {
      await reset()
      return
    }
    showError.value = true
    titleModal.value = 'fail'
  } catch (error) {
    console.log(error)
  }
}
const fetchSericeData = async () => {
  const data = {
    USER_ID: userData.EMPID
  }
  isLoading.value = true
  try {
    const _res = await ServiceRegsiter(data)
    if (_res.data.length > 0) {
      serviceListAddedData.value = _res.data
    } else {
      serviceListAddedData.value = []
    }
  } catch (error) {
    console.log(error)
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
    <div class="max-w-full mx-auto bg-white shadow-md overflow-hidden">
      <div>
        <div class="flex flex-grow items-center justify-between py-3 px-4">
          <div class="flex items-center gap-4">
            <span v-if="serviceListAddedData.length > 0"
              >{{ t('amount') }}: {{ serviceListAddedData.length }}</span
            >
            <span
              ><button
                v-if="serviceListAddedData.length > 0"
                @click.prevent="removeListAdded"
                class="flex items-center border hover:bg-gray-100 py-0.5 px-2 text-black rounded-lg gap-2"
                :class="checkItemData ? 'border-red-500' : 'border-gray-200 bg-whiter'"
              >
                <span
                  v-html="svgIcons.Delete"
                  class="w-6 h-6"
                  :class="checkItemData ? 'text-red-500' : 'text-red-300'"
                ></span>
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
        <div v-if="isLoading" class="flex flex-col justify-center items-center min-h-screen">
          <div class="mb-80">
            <Loading />
          </div>
        </div>
        <div
          v-else-if="!isLoading && filteredItems.length <= 0"
          class="flex flex-col justify-center items-center min-h-screen"
        >
          <div class="flex flex-col items-center justify-center mb-80">
            <span v-html="svgIcons.NoData" class="w-20 h-20 text-red-600 animate-pulse"></span>
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
                  <span>{{ t('all') }}</span>
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
</template>
