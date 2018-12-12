import Layout from '@/views/layout/Layout'

const setting = {
  path: '/setting',
  component: Layout,
  redirect: '/setting/list',
  name: 'setting',
  meta: {
    title: 'setting',
    icon: 'setting',
    roles: ['admin', 'create version', 'create project', 'create env']
  },
  children: [
    {
      path: 'addversion',
      component: () => import('@/views/setting/pubversion'),
      name: 'pubversion',
      meta: {
        title: 'pubversion',
        icon: 'guide',
        roles: ['admin', 'create version']
      }
    },
    {
      path: 'versionlist',
      component: () => import('@/views/setting/versionlist'),
      name: 'versionlist',
      meta: {
        title: 'versionlist',
        icon: 'bug',
        roles: ['admin', 'create version']
      }
    },
    {
      path: 'addproject',
      component: () => import('@/views/setting/project'),
      name: 'projectmanager',
      meta: {
        title: 'project',
        icon: 'bug',
        roles: ['admin', 'create project']
      }
    },
    {
      path: 'enver',
      component: () => import('@/views/setting/env'),
      name: 'envmanager',
      meta: {
        title: 'env',
        icon: 'bug',
        roles: ['admin', 'create env']
      }
    },
    {
      path: 'department',
      component: () => import('@/views/setting/department'),
      name: 'department',
      meta: {
        title: 'department',
        icon: 'user',
        roles: ['admin']
      }
    }
  ]
}

export default setting
