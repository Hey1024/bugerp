import request from '@/utils/request'

export function searchMyBugs(data) {
  return request({
    url: '/search/mybugs',
    method: 'post',
    data: data
  })
}
