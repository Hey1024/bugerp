import request from '@/utils/request'

export function addversion(data) {
  return request({
    url: '/version/add',
    method: 'post',
    data: data
  })
}

export function getversion() {
  return request({
    url: '/version/list',
    method: 'post'
  })
}
