import { PATH } from '@/router/pathName'
export const logout = async (router: any) => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('userData')
  localStorage.removeItem('dataReport')
  localStorage.removeItem('dateRange')
  localStorage.removeItem('page')
  router.push(PATH.LOGIN)
}
