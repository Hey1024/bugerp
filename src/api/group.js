import request from '@/utils/request'

export function addGroup(data) {
  return request({
    url: '/group/add',
    method: 'post',
    data: data
  })
}
