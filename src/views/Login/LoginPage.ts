import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Login } from '@/service/Get_Post_API'
import { PATH } from '@/router/pathName'
import { useI18n } from 'vue-i18n'
export default function useLoginPage() {
  const { t } = useI18n()
  const router = useRouter()
  // const userName = ref('')
  // const userName = ref('')
  // const passWord = ref('')
  const userName = ref('')
  const passWord = ref('adminlvb')
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
        USER: userName.value,
        PASSWORD: passWord.value
      }
      const _res = await Login(userLogin)
      console.log('Login', _res)
      if (_res?.error === '00') {
        localStorage.setItem('authToken', _res?.data.TOKEN)
        localStorage.setItem('userData', JSON.stringify(_res?.data?.DATA_USER_LOGIN))
        router.push(PATH.HOME)
      }
      if (_res?.error === '03') {
        if (_res?.message === 'The user or password is incorrect') {
          errorMessage.value = 'invalid_username'
        }
        else{
          errorMessage.value = 'no_such_user'
        }
      }
      if (_res?.error === '04') {
        if (_res?.message === 'The user or password is incorrect') {
          errorMessage.value = 'invalid_username_or_password'
        }
        else {
          errorMessage.value = 'user_locked'
        }

      }
    } catch (error) {
      console.log(error)
      errorMessage.value = 'sorry_try_later'
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
