import { useRouter } from 'vue-router'
import { PATH } from '@/router/pathName'
export function logout(){
const router = useRouter()
localStorage.removeItem('authToken')
localStorage.removeItem('userData')
localStorage.removeItem('dataReport')
localStorage.removeItem('dateRange')
router.push(PATH.LOGIN)
  }
  
