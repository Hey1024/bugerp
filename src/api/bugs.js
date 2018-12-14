import request from '@/utils/request'

export function getAllBugs(query) {
  return request({
    url: '/bug/getallbugs',
    method: 'post',
    data: query
  })
}

export function getMyBugs(data) {
  return request({
    url: '/bug/mybugs',
    method: 'post',
    data: data
  })
}

export function searchbugs(query) {
  return request({
    url: '/bug/search',
    method: 'post',
    data: query
  })
}

export function changeStatus(query) {
  return request({
    url: '/bug/changestatus',
    method: 'post',
    data: query
  })
}

export function changeMyStatus(data) {
  return request({
    url: '/bug/changemystatus',
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

export function taskList() {
  return request({
    url: '/task/list',
    method: 'post'
  })
}

export function closeBug(id) {
  return request({
    url: '/list/closebug',
    method: 'post',
    data: id
  })
}

export function removeBug(id) {
  return request({
    url: '/bug/remove',
    method: 'get',
    params: { id }
  })
}

export function fetchBug(id) {
  return request({
    url: '/bug/edit',
    method: 'get',
    params: { id }
  })
}
