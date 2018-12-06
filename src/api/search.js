import request from '@/utils/request'

export function searchMyBugs(data) {
  return request({
    url: '/search/mybugs',
    method: 'post',
    data: data
  })
}

export function searchAllBugs(data) {
  return request({
    url: '/search/allbugs',
    method: 'post',
    data: data
  })
}

export function userSearch(name) {
  return request({
    url: '/search/user',
    method: 'get',
    params: { name }
  })
}
