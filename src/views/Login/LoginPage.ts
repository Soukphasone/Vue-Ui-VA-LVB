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
    userName.value = event.target.value.replace(/\D/g, '')
  }
  const handleLogin = async () => {
    if (!userName.value || !passWord.value) {
      checkError.value = true
      errorMessage.value = t('please_check_again')
      return
    }
    isLoading.value = true
    try {
      const userLogin = {
        Username: userName.value,
        Password: passWord.value
      }
      // const body = {
      //   data: encryptData(JSON.stringify(userLogin))
      // }
      const _dataLogin = await Login(userLogin)
      console.log('Login_data', _dataLogin)
      if (_dataLogin?.data?.TOKEN) {
        localStorage.setItem('authToken', _dataLogin.data.TOKEN)
        localStorage.setItem('userData', JSON.stringify(_dataLogin.data.USER_DATA))
        router.push(PATH.HOME)
        console.log("HI");
      }
    } catch (error) {
      console.log(error)
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
