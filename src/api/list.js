import request from '@/utils/request'

export function gettotalcount() {
  return request({
    url: '/article/gettotalcount',
    method: 'post'
  })
}
