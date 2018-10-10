import request from '@/utils/request'

export function getenvs() {
  return request({
    url: '/article/getenv',
    method: 'post'
  })
}

export function getproject() {
  return request({
    url: '/article/getproject',
    method: 'post'
  })
}

export function getusers() {
  return request({
    url: '/article/getuser',
    method: 'post'
  })
}

export function getversion() {
  return request({
    url: '/article/getversion',
    method: 'post'
  })
}

export function getplatform() {
  return request({
    url: '/article/getplatform',
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

