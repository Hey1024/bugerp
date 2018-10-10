import request from '@/utils/request'

export function getlist() {
  return request({
    url: '/notcomplete/list',
    method: 'post'
  })
}
