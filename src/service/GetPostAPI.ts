import { post_service, post_service_login, post_service_check_cif } from '@/service/service'
import { LOGIN, SERVICE, CIF, CURRENT_ALIAS_ID, VA_REGISTER, CUSTOMER_ACCOUNT} from '@/util/url'
export async function Login(body: any) {
  const { errorStatus, message, data } = await post_service_login(LOGIN, body)
  if (errorStatus == '1') {
    console.error(message)
    console.error(data)
  } else {
    return data
  }
}
export async function Service(body: any) {
  const { errorStatus, message, data } = await post_service(SERVICE, body)
  if (errorStatus == '1') {
    console.error(message)
    console.error(data)
  } else {
    return data
  }
}
export async function CustomerAccount(body: any) {
  const { errorStatus, message, data } = await post_service(CUSTOMER_ACCOUNT, body)
  if (errorStatus == '1') {
    console.error(message)
    console.error(data)
  } else {
    return data
  }
}
export async function CurrentAliasId(body: any) {
  const { errorStatus, message, data } = await post_service(CURRENT_ALIAS_ID, body)
  if (errorStatus == '1') {
    console.error(message)
    console.error(data)
  } else {
    return data
  }
}
export async function CheckCIF(body: any) {
  const { errorStatus, message, data } = await post_service_check_cif(CIF, body)
  if (errorStatus == '1') {
    console.error(message)
    console.error(data)
  } else {
    return data
  }
}
export async function RegisterVA(body: any) {
  const { errorStatus, message, data } = await post_service(VA_REGISTER, body)
  if (errorStatus == '1') {
    console.error(message)
    console.error(data)
  } else {
    return data
  }
}
