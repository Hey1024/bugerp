import request from '@/utils/request'

export function taskList() {
  return request({
    url: '/task/list',
    method: 'post'
  })
}

export function changetask(status) {
  return request({
    url: '/table/changetask',
    method: 'post',
    data: status
  })
}

export function gettasklist() {
  return request({
    url: '/table/gettasklist',
    method: 'post'
  })
}

export function getthistask(id) {
  return request({
    url: '/table/getthistask',
    method: 'post',
    data: id
  })
}

export function getcompletelist() {
  return request({
    url: '/table/getcompletelist',
    method: 'post'
  })
}

export function stoptask(id) {
  return request({
    url: '/table/stoptask',
    method: 'post',
    data: id
  })
}
