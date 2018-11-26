import request from '@/utils/request'

export function getOSName() {
  return request({
    url: '/os/list',
    method: 'post'
  })
}

export function addOSName(data) {
  return request({
    url: '/os/add',
    method: 'post',
    data: data
  })
}

export function updateOSName(data) {
  return request({
    url: '/os/update',
    method: 'post',
    data: data
  })
}

export function deleteOSName(id) {
  return request({
    url: '/os/delete',
    method: 'get',
    params: { id }
  })
}

