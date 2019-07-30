export default [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/users',
    name: 'users',
    meta: {
      groups: ['root', 'admin']
    },
    component: () => import('@/views/Users/index.vue'),
    children: [
      {
        path: 'create',
        name: 'user create',
        component: () => import('@/views/Users/Create.vue')
      }
    ]
  },
  {
    path: '/sale/tracks',
    name: 'sale tracks',
    meta: {
      groups: ['root', 'admin', 'sale'],
    },
    component: () => import('@/views/SaleTracks/index.vue'),
    children: [
      {
        path: ':id/data',
        name: 'sale track detail',
        component: () => import('@/views/SaleTracks/Detail.vue')
      },
      {
        path: ':id/manage',
        name: 'sale track manage',
        component: () => import('@/views/SaleTracks/Manage.vue')
      }
    ]
  },
  {
    path: '/yuchuan/access/records',
    name: 'yuchuan access records',
    component: () => import('@/views/AccessRecords/index.vue')
  },
  {
    path: '*',
    name: 'not found',
    component: () => import('@/views/NotFound.vue')
  }
]
