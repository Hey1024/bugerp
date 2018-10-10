import request from '@/utils/request'

export function getlist() {
  return request({
    url: '/dashboard/list',
    method: 'post'
  })
}

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

export function getprojectlist(project) {
  return request({
    url: '/dashboard/project',
    method: 'post',
    data: project
  })
}

