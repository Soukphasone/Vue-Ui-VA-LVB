import { ref } from 'vue'
import { encryptData } from '@/stores/EncryptDecrypt'
import { changePassword } from '@/service/GetPostAPI'
import { useI18n } from 'vue-i18n'
import { logout } from '@/stores/clearStorage'

export default function useChangePassword() {
  const { t } = useI18n()
  const userDataLogin = JSON.parse(localStorage.getItem('userData') || '{}')
  const isModalOpen = ref(true)
  const oldPassword = ref('')
  const newPassword = ref('')
  const confirmPassword = ref('')
  const errorMessage = ref('')
  const isShowEyeOldPass = ref(false)
  const isShowEyeNewPass = ref(false)
  const isShowEyeConPass = ref(false)
  const isLoading = ref(false)

  const handleShowEye = (value) => {
    if (value === 'old-password') {
      isShowEyeOldPass.value = !isShowEyeOldPass.value
    } else if (value === 'new-password') {
      isShowEyeNewPass.value = !isShowEyeNewPass.value
    } else if (value === 'confirm-password') {
      isShowEyeConPass.value = !isShowEyeConPass.value
    }
  }
  const handleChangePass = async () => {
    if (newPassword.value === oldPassword.value) {
      errorMessage.value = t('new_password_same_as_old')
      return
    }

    if (newPassword.value !== confirmPassword.value) {
      errorMessage.value = t('passwords_do_not_match')
      return
    }
    isLoading.value = true
    try {
      const userLogin = {
        cif: userDataLogin?.CIF,
        old_pass: oldPassword.value,
        new_pass: newPassword.value,
      }
      const body = {
        data: encryptData(JSON.stringify(userLogin)),
      }
      const response = await changePassword(body)
      console.log("REP", response)
      if (response.message === 'Update Success') {
        logout()
      } else {
        errorMessage.value = t('error')
        setTimeout(() => {
          errorMessage.value = ''
        }, 5000)
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    isModalOpen,
    oldPassword,
    newPassword,
    confirmPassword,
    errorMessage,
    handleChangePass,
    isShowEyeOldPass,
    isShowEyeNewPass,
    isShowEyeConPass,
    handleShowEye,
  }
}
