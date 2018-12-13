import request from '@/utils/request'

export function getLog() {
  return request({
    url: '/log/list',
    method: 'post'
  })
}
