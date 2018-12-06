import request from '@/utils/request'

export function createUser(data) {
  return request({
    url: '/user/create',
    method: 'post',
    data: data
  })
}

export function updatePassword(data) {
  return request({
    url: '/password/update',
    method: 'post',
    data: data
  })
}

export function userList() {
  return request({
    url: '/user/list',
    method: 'post'
  })
}

export function resetPwd(data) {
  return request({
    url: '/password/reset',
    method: 'post',
    data: data
  })
}
