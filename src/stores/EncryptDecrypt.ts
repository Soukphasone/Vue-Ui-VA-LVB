import { cloneFnJSON } from '@vueuse/core'
import { JSEncrypt } from 'jsencrypt'
export function encryptData(data: string) {
  if (data) {
    const pub_key = import.meta.env.VITE_ENC_KEY
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(pub_key)
    return encrypt.encrypt(data)
  }
}
export function decryptData(data: string[]): { decrypted: Record<string, any> | null } {
  if (!data || data.length === 0) {
    return { decrypted: null }
  }
  const privateKey = import.meta.env.VITE_DEC_KEY
  const decryptor = new JSEncrypt()
  decryptor.setPrivateKey(privateKey)
  let decrypted = ''

  data.forEach((encryptedString) => {
    const decryptedString = decryptor.decrypt(encryptedString)
    if (!decryptedString) {
      console.error('Failed to decrypt:', encryptedString)
    } else {
      decrypted += decryptedString
    }
  })
  try {
    const decryptedJson = JSON.parse(decrypted)
    return decryptedJson
  } catch (error) {
    console.error('Failed to parse decrypted data as JSON:', decrypted)
    return { decrypted: null }
  }
}
