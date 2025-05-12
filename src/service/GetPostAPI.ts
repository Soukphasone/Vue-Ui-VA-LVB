import { post_service } from '@/service/service'
import { LOGIN, TAKE_ORDER} from '@/util/url'
export async function Login(body: any) {
  const { errorStatus, message, data } = await post_service(LOGIN, body)
  if (errorStatus == '1') {
    console.error(message)
    console.error(data)
  } else {
    return data
  }
}
export async function takeOrder(body: any) {
  const { errorStatus, message, data } = await post_service(TAKE_ORDER, body)
  if (errorStatus == '1') {
    console.error(message)
    console.error(data)
  } else {
    return data
  }
}
