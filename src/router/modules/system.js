import Layout from '@/views/layout/Layout'

const system = {
  path: '/system',
  component: Layout,
  redirect: '/system/list',
  name: 'system',
  meta: {
    title: 'setting',
    icon: 'setting',
    roles: ['admin']
  },
  children: [
    {
      path: 'email',
      component: () => import('@/views/system/email'),
      name: 'email',
      meta: {
        title: 'email',
        icon: 'email',
        roles: ['admin']
      }
    }
  ]
}

export default system
