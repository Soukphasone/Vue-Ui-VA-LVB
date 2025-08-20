import service from './service.guard'
import {} from '@/util/url'
const server = import.meta.env.VITE_SERVER_MAIN
export function get_service(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    service
      .get(server + url)
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
  console.log("url", url);
  return new Promise((resolve, reject) => {
    service
      .post(server + url, body)
      .then((res) => {
        resolve({ errorStatus: '0', message: 'SUCCESS', data: res.data })
      })
      .catch((err) => {
        resolve({ errorStatus: '1', message: err.message, data: err })
      })
  })
}