import Cookies from 'js-cookie'
import { JSEncrypt } from 'jsencrypt'

const TokenKey = 'Admin-Token'
const ProjectName = 'Project-Name'
// 40分钟
const inFifteenMinutes = new Date(new Date().getTime() + 40 * 60 * 1000)
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log('token:')
  console.log(encrypt(token))
  return Cookies.set(TokenKey, encrypt(token), {
    expires: inFifteenMinutes
  })
}

export function setProject(name) {
  return Cookies.set(ProjectName, name, {
    expires: 365
  })
}

export function getProject() {
  return Cookies.get(ProjectName)
}

export function setTimeout() {
  return Cookies.set(TokenKey, getToken(TokenKey), {
    expires: inFifteenMinutes
  })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function encrypt(key) {
  const jes = new JSEncrypt()
  jes.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCyXfaibtNAqJtvDrsEGZG7yi4D
BPNkSHZD4DYQtNDHNJUkP4pTB9tZvQ1+d02Tt/YHNy8N+z0rRSVQwISt2VuPwNta
ldeprfs35msB5BFP4H0OlwZ2Woz7ImhNq7TrR0Usc6ExjlCxZg6zxnEL90vE4y/i
kiMMhwhKp/HYBQjlfQIDAQAB
-----END PUBLIC KEY-----`)
  return jes.encrypt(key)
}

export function decrypt(key) {
  const jes = new JSEncrypt()
  jes.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCyXfaibtNAqJtvDrsEGZG7yi4D
BPNkSHZD4DYQtNDHNJUkP4pTB9tZvQ1+d02Tt/YHNy8N+z0rRSVQwISt2VuPwNta
ldeprfs35msB5BFP4H0OlwZ2Woz7ImhNq7TrR0Usc6ExjlCxZg6zxnEL90vE4y/i
kiMMhwhKp/HYBQjlfQIDAQAB
-----END PUBLIC KEY-----`)
  return jes.decrypt(key)
}

