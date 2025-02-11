import { post_service } from '@/service/service'
import { CUSTOMER_LOGIN, REPORT_FINANCE_URL, BALANCE_ACCOUNT, CHANGE_PASSWORD } from '@/util/url'
export async function Login(body: any) {
  const { errorStatus, message, data } = await post_service(CUSTOMER_LOGIN, body)
  if (errorStatus == '1') {
    console.error(message)
    console.error(data)
  } else {
    return data
  }
}
export async function reportFinance(body: any) {
  const { errorStatus, message, data } = await post_service(REPORT_FINANCE_URL, body)
  if (errorStatus == '1') {
    console.error(message)
    console.error(data)
  } else {
    return data
  }
}
export async function balanceAccount(body: any) {
  const { errorStatus, message, data } = await post_service(BALANCE_ACCOUNT, body)
  if (errorStatus == '1') {
    console.error(message)
    console.error(data)
  } else {
    return data
  }
}
export async function changePassword(body: any) {
  const { errorStatus, message, data } = await post_service(CHANGE_PASSWORD, body)
  if (errorStatus == '1') {
    console.error(message)
    console.error(data)
  } else {
    return data
  }
}