import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Login } from '@/service/GetPostAPI'
import { encryptData } from '@/stores/EncryptDecrypt'
import { PATH } from '@/router/pathName'
import { useI18n } from 'vue-i18n'
export default function useLoginPage() {
  const { t } = useI18n()
  const router = useRouter()
  // const userName = ref('')
  const userName = ref('')
  const passWord = ref('')
  const checkError = ref(false)
  const errorMessage = ref('')
  const isLoading = ref(false)
  const isShowEye = ref(false)

  const handleShowEye = () => {
    isShowEye.value = !isShowEye.value
  }
  const validateNumber = (event: any) => {
    userName.value = event.target.value.replace(/\D/g, "");
  };
  const handleLogin = async () => {
    if (!userName.value || !passWord.value ) {
      checkError.value = true
      errorMessage.value = t('please_check_again')
      return
    }
    isLoading.value = true
    try {
      const userLogin = {
        username: userName.value,
        password: passWord.value
      }
      const body = {
        data: encryptData(JSON.stringify(userLogin))
      }
      const _dataLogin = await Login(body)
      if (_dataLogin?.data?.TOKEN) {
        localStorage.setItem('authToken', _dataLogin.data.TOKEN)
        localStorage.setItem('userData', JSON.stringify(_dataLogin.data.USER_DATA))
        if (_dataLogin.data.USER_DATA?.FIRST_LOGIN === 'Y') {
          router.push(PATH.CHANGE_PASSWORD)
        } else {
          router.push(PATH.HOME)
        }
      } else {
        if (_dataLogin?.data === 'User or pass is incorrect') {
          errorMessage.value = t('User_pass_incorrect')
          setTimeout(() => {
            errorMessage.value = ''
          }, 5000)
        } else {
          errorMessage.value = t('error')
          setTimeout(() => {
            errorMessage.value = ''
          }, 5000)
        }
      }
    } finally {
      isLoading.value = false
    }
  }
  return {
    userName,
    passWord,
    checkError,
    errorMessage,
    isLoading,
    isShowEye,
    validateNumber,
    handleShowEye,
    handleLogin
  }
}
