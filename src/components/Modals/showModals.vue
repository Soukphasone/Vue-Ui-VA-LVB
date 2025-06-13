<template>
  <transition name="fade-scale">
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              class="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">{{ title }}</h2>
        <p class="text-gray-600 text-center mb-6">
          {{ message }}
        </p>
        <div class="flex justify-center">
          <button
            @click="closeSuccessModal"
            class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Done
          </button>
        </div>
      </div>
    </div></transition
  >
  <transition name="fade-scale">
    <div
      v-if="showWarningModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg
              class="w-10 h-10 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">{{ title }}</h2>
        <p class="text-gray-600 text-center mb-6">
          {{ message }}
        </p>
        <div class="flex justify-center">
          <button
            @click="closeWarningModal"
            class="px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none"
          >
            Understand
          </button>
        </div>
      </div>
    </div>
  </transition>
  <transition name="fade-scale">
    <div
      v-if="showErrorModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              class="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">{{ title }}</h2>
        <p class="text-gray-600 text-center mb-6">
          {{ message }}
        </p>
        <div class="flex justify-center">
          <button
            @click="closeErrorModal"
            class="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </transition>
  <transition name="fade-scale">
    <div
      v-if="showLogoutModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="closeLogoutModal"
    >
      <div class="bg-white rounded-lg max-w-md w-full p-6 mx-4">
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
           <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-red-600 hover:text-red-500 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
              />
            </svg>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">Confirm Logout</h2>
        <p class="text-gray-600 text-center mb-6">Are you sure you want to logout?</p>
        <div class="flex justify-center space-x-4">
          <button
            @click="closeLogoutModal"
            class="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Cancel
          </button>
          <button
            @click="confirmLogout"
            class="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useOpenModalStore } from '@/stores/modal'
import { logout } from '@/stores/clearStorage'
import { useRouter } from 'vue-router'
const props = defineProps({
  showSuccessModal: {
    type: Boolean,
    required: true
  },
  showWarningModal: {
    type: Boolean,
    required: true
  },
  showErrorModal: {
    type: Boolean,
    required: true
  },
  showLogoutModal: {
    type: Boolean,
    required: true
  },
  title: {
    type: String
  },
  message: {
    type: String
  }
})

const router = useRouter()
const openModalStore = useOpenModalStore()
const emit = defineEmits(['close'])
const closeSuccessModal = () => {
  emit('close')
}
const closeErrorModal = () => {
  emit('close')
}
const closeWarningModal = () => {
  emit('close')
}
const closeLogoutModal = () => {
  // emit('close')
  openModalStore.isOpenModal = false
}
function confirmLogout() {
  openModalStore.isOpenModal = false
  logout(router)
  console.log('Logout Success')
}
</script>
