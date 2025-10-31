<script setup>
import { useOpenModalStore } from '@/stores/modal'
import { logout } from '@/stores/clearStorage'
import { useRouter } from 'vue-router'
import { DeleteVA, UpdateVA } from '@/service/Get_Post_API'
import eventBus from '@/eventBus'
import { ref } from 'vue'
import Loading from '../Loading/Loading.vue'
import { svgIcons } from '@/stores/svgIcons'

const props = defineProps({
  showSuccessModal: {
    type: Boolean,
    required: false,
    default: false
  },
  showErrorModal: {
    type: Boolean,
    required: false,
    default: false
  },
  showConfirmModal: {
    type: Boolean,
    required: false,
    default: false
  },
  id: {
    type: [Number, Array]
  },
  value: {
    type: String
  },
  title: {
    type: String
  },
  message: {
    type: String
  }
})
const userDataLogin = JSON.parse(localStorage.getItem('userData'))
const router = useRouter()
const isLoading = ref(false)
const openModal = useOpenModalStore()
const emit = defineEmits(['close'])
const closeSuccessModal = () => {
  emit('close')
}
const closeErrorModal = () => {
  emit('close')
}
const refreshVA = () => {
  eventBus.emit('refresh')
}
const closeConfirmModal = () => {
  emit('close')
}
const resetModal = () => {
  openModal.isLogOut = false
  openModal.isDeleteVA = false
  openModal.isAuthorizeVA = false
  openModal.isRejectVA = false
  openModal.isDetail = false
  isLoading.value = false
}
function confirm(value) {
  if (value === '1' || value === '2') {
    return handleStatus()
  }
  if (value === 'delete-va') {
    return handleDeleteVA()
  }
  if (value === 'logout') {
    openModal.isLogOut = false
    logout(router)
    return
  }
}
const handleDeleteVA = async () => {
  const data = {
    IDS: props.id
  }
  isLoading.value = true
  try {
    const _res = await DeleteVA(data)
    if (_res.message === 'SUCCESS') {
      openModal.isSuccess = true
      resetModal()
      refreshVA()
      return
    }
    titleModal.value = 'fail'
    showError.value = true
  } catch (err) {
    console.log(err)
  }
}
const handleStatus = async () => {
  isLoading.value = true
  try {
    if (props.value === '1' || props.value === '2') {
      const data = {
        IDS: props.id,
        STATUS: props.value,
        USER_APPROVE: userDataLogin.EMPNAME
      }
      const _res = await UpdateVA(data)
      if (_res.message === 'SUCCESS') {
        openModal.isSuccess = true
        resetModal()
        refreshVA()
        return
      }
    }
    titleModal.value = 'fail'
    showError.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <transition name="fade-scale">
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-999"
    >
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <div class="flex justify-center mb-6">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <span v-html="svgIcons.Authorized" class="w-9 h-9 text-green-600 animate-pulse"> </span>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-10">{{ title }}</h2>
        <div class="flex justify-center">
          <button
            @click="closeSuccessModal"
            class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            {{ $t('close') }}
          </button>
        </div>
      </div>
    </div></transition
  >
  <transition name="fade-scale">
    <div
      v-if="showErrorModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-999"
    >
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <div class="flex justify-center mb-6">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <span v-html="svgIcons.Delete" class="w-10 h-10 text-red-600 animate-pulse"> </span>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-10">{{ title }}</h2>
        <div class="flex justify-center">
          <button
            @click="closeErrorModal"
            class="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
          >
            {{ $t('close') }}
          </button>
        </div>
      </div>
    </div>
  </transition>
  <transition name="fade-scale">
    <div
      v-if="showConfirmModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-999"
      @click.self="closeConfirmModal"
    >
      <div
        v-if="isLoading"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-9999"
      >
        <span class="mt-45">
          <Loading />
        </span>
      </div>
      <div class="bg-white rounded-lg max-w-md w-full p-6 mx-4">
        <div class="flex justify-center mb-6">
          <div
            class="w-16 h-16 transition-colors rounded-full flex items-center justify-center"
            :class="openModal.isAuthorizeVA ? 'bg-green-100' : 'bg-red-100 text-red-500'"
          >
            <span v-if="openModal.isLogOut" v-html="svgIcons.Logout" class="animate-pulse"> </span>
            <span
              v-if="openModal.isDeleteVA"
              v-html="svgIcons.Delete_Bin"
              class="w-9 h-9 animate-pulse"
            >
            </span>
            <span
              v-if="openModal.isAuthorizeVA"
              v-html="svgIcons.Authorized"
              class="w-9 h-9 text-green-600 animate-pulse"
            >
            </span>
            <span
              v-if="openModal.isRejectVA"
              v-html="svgIcons.Reject"
              class="w-9 h-9 text-red-500 animate-pulse"
            >
            </span>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-center text-gray-600 mb-10">{{ title }}</h2>
        <div class="flex justify-center space-x-4">
          <button
            @click="closeConfirmModal"
            class="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            {{ $t('cancel') }}
          </button>
          <button
            @click.prevent="confirm(value)"
            class="px-6 py-2 rounded-md focus:outline-none"
            :class="
              openModal.isAuthorizeVA
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-red-600 text-white hover:bg-red-700'
            "
          >
            {{ $t('confirm') }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
