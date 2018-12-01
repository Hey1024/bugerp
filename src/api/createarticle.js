import request from '@/utils/request'

export function getEnv() {
  return request({
    url: '/get/env',
    method: 'post'
  })
}

export function getProject() {
  return request({
    url: '/get/project',
    method: 'post'
  })
}

export function getUsers() {
  return request({
    url: '/get/user',
    method: 'post'
  })
}

export function getVersion() {
  return request({
    url: '/get/version',
    method: 'post'
  })
}

export function getOs() {
  return request({
    url: '/get/os',
    method: 'post'
  })
}

export function getclasses() {
  return request({
    url: '/article/getclasses',
    method: 'post'
  })
}

export function getTotal(param) {
  return request({
    url: '/bug/gettotal',
    method: 'post',
    data: param
  })
}

