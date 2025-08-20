import { PATH } from '@/router/pathName'
import { useStorage } from '@vueuse/core'
import { ref } from 'vue'
export const logout = async (router: any) => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('userData')
  // useStorage('selected', ref('Home'))
  // useStorage('page', ref('Home'))
  router.push(PATH.LOGIN)
}
