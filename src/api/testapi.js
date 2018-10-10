import request from '@/utils/request'

export function testapi() {
  return request({
    url: '/test/test',
    method: 'post'
  })
}
