import service from './service.guard'
import {} from '@/util/url'
const server_1 = import.meta.env.VITE_SERVER_MAIN
const server_2 = import.meta.env.VITE_SERVER_LOGIN
const server_3 = import.meta.env.VITE_SERVER_CHECK_CIF
export function get_service(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    service
      .get(server_1 + url)
      .then((res) => {
        resolve({ errorStatus: '0', message: 'SUCCESS', data: res.data })
        console.log('Connect success')
      })
      .catch((err) => {
        resolve({ errorStatus: '1', message: err.message, data: err })
      })
  })
}

export function post_service(url: string, body: any): Promise<any> {
  return new Promise((resolve, reject) => {
    service
      .post(server_1 + url, body)
      .then((res) => {
        resolve({ errorStatus: '0', message: 'SUCCESS', data: res.data })
      })
      .catch((err) => {
        resolve({ errorStatus: '1', message: err.message, data: err })
      })
  })
}
export function post_service_login(url: string, body: any): Promise<any> {
  return new Promise((resolve, reject) => {
    service
      .post(server_2 + url, body)
      .then((res) => {
        resolve({ errorStatus: '0', message: 'SUCCESS', data: res.data })
      })
      .catch((err) => {
        resolve({ errorStatus: '1', message: err.message, data: err })
      })
  })
}
export function post_service_check_cif(url: string, body: any): Promise<any> {
  return new Promise((resolve, reject) => {
    service
      .post(server_3 + url, body)
      .then((res) => {
        resolve({ errorStatus: '0', message: 'SUCCESS', data: res.data })
      })
      .catch((err) => {
        resolve({ errorStatus: '1', message: err.message, data: err })
      })
  })
}
