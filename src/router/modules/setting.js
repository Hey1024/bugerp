import Layout from '@/views/layout/Layout'

const setting = {
  path: '/setting',
  component: Layout,
  redirect: '/setting/list',
  name: 'setting',
  meta: {
    title: 'setting',
    icon: 'setting'
  },
  children: [
    {
      path: 'addversion',
      component: () => import('@/views/setting/pubversion'),
      name: 'pubversion',
      meta: {
        title: 'pubversion',
        icon: 'guide',
        roles: ['admin', 'manager', 'cocosmanager', 'cocos']
      }
    },
    {
      path: 'versionlist',
      component: () => import('@/views/setting/versionlist'),
      name: 'versionlist',
      meta: {
        title: 'versionlist',
        icon: 'bug',
        roles: ['admin', 'manager', 'cocosmanager', 'cocos']
      }
    },
    {
      path: 'addproject',
      component: () => import('@/views/setting/project'),
      name: 'projectmanager',
      meta: {
        title: 'project',
        icon: 'bug',
        roles: ['admin', 'manager', 'cocosmanager', 'cocos']
      }
    }
  ]
}

export default setting
