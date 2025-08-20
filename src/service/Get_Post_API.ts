import { post_service } from '@/service/service'
import { LOGIN, SERVICE, CURRENT_ALIAS_ID, VA_REGISTER, CUSTOMER_ACCOUNT, MA_VA, SERVICE_REGISTER, DELETE_LIST_ADDED, CUSTOMERZ_REGISTER_LIST, VA_UPDATE, VA_DELETE, MENU_LIST} from '@/util/url'
export async function Login(body: any) {
  const { errorStatus, message, data } = await post_service(LOGIN, body)
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
export async function ServiceRegsiter(body: any) {
  const { errorStatus, message, data } = await post_service(SERVICE_REGISTER, body)
  if (errorStatus == '1') {
    console.error(message)
    console.error(data)
  } else {
    return data
  }
}
export async function MapVA(body: any) {
  const { errorStatus, message, data } = await post_service(MA_VA, body)
  if (errorStatus == '1') {
    console.error(message)
    console.error(data)
  } else {
    return data
  }
}
export async function DeleteListAddedMap(body: any) {
  const { errorStatus, message, data } = await post_service(DELETE_LIST_ADDED, body)
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
export async function RegisterVA(body: any) {
  const { errorStatus, message, data } = await post_service(VA_REGISTER, body)
  if (errorStatus == '1') {
    console.error(message)
    console.error(data)
  } else {
    return data
  }
}
export async function UpdateVA(body: any) {
  const { errorStatus, message, data } = await post_service(VA_UPDATE, body)
  if (errorStatus == '1') {
    console.error(message)
    console.error(data)
  } else {
    return data
  }
}
export async function DeleteVA(body: any) {
  const { errorStatus, message, data } = await post_service(VA_DELETE, body)
  if (errorStatus == '1') {
    console.error(message)
    console.error(data)
  } else {
    return data
  }
}
export async function CustomerRegisterList(body: any) {
  const { errorStatus, message, data } = await post_service(CUSTOMERZ_REGISTER_LIST, body)
  if (errorStatus == '1') {
    console.error(message)
    console.error(data)
  } else {
    return data
  }
}
export async function MenuList(body: any) {
  console.log("body", body);
  const { errorStatus, message, data } = await post_service(MENU_LIST, body)
  if (errorStatus == '1') {
    console.error(message)
    console.error(data)
  } else {
    return data
  }
}
