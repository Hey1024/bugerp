import request from '@/utils/request'

export function closeBug(id) {
  return request({
    url: '/list/closebug',
    method: 'post',
    data: id
  })
}

export function removeBug(id) {
  return request({
    url: '/list/removebug',
    method: 'post',
    data: id
  })
}

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'post',
    data: query
  })
}

export function gettotalcount() {
  return request({
    url: '/article/gettotalcount',
    method: 'post'
  })
}
