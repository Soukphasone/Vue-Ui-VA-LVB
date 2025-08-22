import { PATH } from '@/router/pathName'
export const logout = async (router: any) => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('userData')
  router.push(PATH.LOGIN)
}
