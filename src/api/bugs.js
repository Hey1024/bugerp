import request from '@/utils/request'

export function getallbugs() {
  return request({
    url: '/bug/getlist',
    method: 'post'
  })
}

export function getStatus() {
  return request({
    url: '/get/status',
    method: 'post'
  })
}

export function searchbugs(query) {
  return request({
    url: '/bug/search',
    method: 'post',
    data: query
  })
}

export function changeStatus(query) {
  return request({
    url: '/bug/changestatus',
    method: 'post',
    data: query
  })
}
