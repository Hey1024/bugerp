import Layout from '@/views/layout/Layout'

const userRoute = {
  path: '/user',
  component: Layout,
  redirect: '/user/list',
  name: 'userManager',
  meta: {
    title: 'userManager',
    icon: 'setting'
  },
  children: [
    {
      path: 'add',
      component: () => import('@/views/user/adduser'),
      name: 'adduser',
      meta: {
        title: 'adduser',
        icon: 'edit',
        roles: ['admin', 'manager', 'testmanager', 'gomanager', 'phpmanager', 'cocosmanager']
      }
    },
    {
      path: 'changepwd',
      component: () => import('@/views/user/changepwd'),
      name: 'changepwd',
      meta: {
        title: 'changepwd',
        noCache: true,
        icon: 'edit'
      }
    },
    {
      path: 'usermanager',
      component: () => import('@/views/user/usermanager'),
      name: 'usermanager',
      meta: {
        title: 'usermanager',
        icon: 'user',
        roles: ['admin', 'manager']
      }
    },
    {
      path: 'uploadhead',
      component: () => import('@/views/user/headImg'),
      name: 'uploadhead',
      meta: {
        title: 'uploadhead',
        icon: 'user',
        roles: ['admin', 'manager']
      }
    },
    {
      path: 'department',
      component: () => import('@/views/user/department'),
      name: 'department',
      meta: {
        title: 'department',
        icon: 'user',
        roles: ['admin', 'manager']
      }
    }
  ]
}

export default userRoute
