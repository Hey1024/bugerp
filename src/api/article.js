import request from '@/utils/request'

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createBug(data) {
  return request({
    url: '/bug/create',
    method: 'post',
    data: data
  })
}

export function passBug(data) {
  return request({
    url: '/bug/pass',
    method: 'post',
    data
  })
}

export function uploadimg(data) {
  return request({
    url: '/article/uploadimg',
    method: 'post',
    data: data
  })
}

export function showBug(id) {
  return request({
    url: '/bug/show',
    method: 'get',
    params: { id }
  })
}

