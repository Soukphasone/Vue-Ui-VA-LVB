import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Login } from '@/service/GetPostAPI'
import { PATH } from '@/router/pathName'
import { useI18n } from 'vue-i18n'
export default function useLoginPage() {
  const { t } = useI18n()
  const router = useRouter()
  // const userName = ref('')
  const userName = ref('SOUKPHASONE')
  const passWord = ref('B99110019@b.')
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
        Project_id: 'PRJ100000000092',
        Request: {
          RequestID: '3',
          Username: userName.value,
          Password: passWord.value,
          SearchDetail: 'Username'
        }
      }
      const _dataLogin = await Login(userLogin)
      console.log('Login_data', _dataLogin)
      if (_dataLogin?.error_desc == 'LOGIN SUCCESS') {
        localStorage.setItem('userData', JSON.stringify(_dataLogin?.user_data))
        router.push(PATH.HOME)
        errorMessage.value = 'User is locked'
      }
      if (_dataLogin?.error_desc == 'User is locked') {
        errorMessage.value = 'User is locked'
      } else {
        errorMessage.value = 'Sorry please try again'
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
