import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Login } from '@/service/Get_Post_API'
import { PATH } from '@/router/pathName'
import { useI18n } from 'vue-i18n'
export default function useLoginPage() {
  const { t } = useI18n()
  const router = useRouter()
  const userName = ref('')
  const passWord = ref('')
  const checkError = ref(false)
  const errorMessage = ref('')
  const isLoading = ref(false)
  const isShowEye = ref(false)

  const toUppercase = (event: any) => {
    userName.value = event.target.value.toUpperCase()
  }
  const handleShowEye = () => {
    isShowEye.value = !isShowEye.value
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
      if (_res?.error === '00') {
        localStorage.setItem('authToken', _res?.data.TOKEN)
        localStorage.setItem('userData', JSON.stringify(_res?.data?.DATA_USER_LOGIN))
        localStorage.setItem('imagesData', JSON.stringify(_res?.data?.DATA_IMAGES))
        router.push(PATH.HOME)
      }
      if (_res?.error === '03') {
        return errorMessage.value = 'invalid_username'
      }
      if (_res?.error === '04') {
        if (_res?.message === 'The user or password is incorrect') {
          return errorMessage.value = 'invalid_username_or_password'
        }
        else {
          return errorMessage.value = 'user_locked'
        }

      }
      if (_res?.error === '2') {
        return errorMessage.value = 'sorry_try_later'
      }
      return errorMessage.value = 'sorry_try_later'
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
    toUppercase,
    handleShowEye,
    handleLogin
  }
}
