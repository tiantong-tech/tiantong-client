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
    component: () => import('@/views/SaleTracks/index.vue')
  },
  {
    path: '*',
    name: 'not found',
    component: () => import('@/views/NotFound.vue')
  }
]
