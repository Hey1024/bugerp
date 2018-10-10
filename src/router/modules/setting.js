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
      path: 'add',
      component: () => import('@/views/setting/adduser'),
      name: 'adduser',
      meta: {
        title: 'adduser',
        icon: 'edit',
        roles: ['admin', 'manager', 'testmanager', 'gomanager', 'phpmanager', 'cocosmanager']
      }
    },
    {
      path: 'changepwd',
      component: () => import('@/views/setting/changepwd'),
      name: 'changepwd',
      meta: {
        title: 'changepwd',
        noCache: true,
        icon: 'edit'
      }
    },
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
      path: 'usermanager',
      component: () => import('@/views/setting/usermanager'),
      name: 'usermanager',
      meta: {
        title: 'usermanager',
        icon: 'user',
        roles: ['admin', 'manager']
      }
    }
  ]
}

export default setting
