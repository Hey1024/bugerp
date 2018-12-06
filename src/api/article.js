import request from '@/utils/request'

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function uploadimg(data) {
  return request({
    url: '/article/uploadimg',
    method: 'post',
    data: data
  })
}
