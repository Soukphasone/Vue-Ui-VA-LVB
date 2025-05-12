<script setup>
import { showAlert } from '@/stores/alert'
import { logout } from '@/stores/clearStorage'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const userData = JSON.parse(localStorage.getItem('userData'))
const router = useRouter()

const logOut = () => {
  showAlert(
    t('Exit'),
    t('confirm') + '!',
    'warning',
    t('Yes'),
    t('cancel'),
    '#86e54c',
    '#28a745',
    '#dc3545',
    true,
    true
  ).then((result) => {
    if (result.isConfirmed) {
      logout(router)
    }
  })
}
</script>
<template>
  <button
    v-if="userData"
    class="lg:hidden h-5 w-5 focus:outline-none"
    @click="logOut"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      class="fill-red-500 hover:fill-red-600"
    >
      <path
        d="M10 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H10V19H5V5H10V3ZM21 12L16 7V10H9V14H16V17L21 12Z"
      />
    </svg>
    <p class="text-user text-red-500">Exit</p>
  </button>
</template>

