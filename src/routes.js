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
    path: '/profile',
    name: 'user profile',
    component: () => import('@/views/Profile.vue')
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
    path: '/sale/projects',
    name: 'sale projects',
    component: () => import('@/views/SaleProjects/ProjectList.vue'),
    meta: {
      groups: ['root', 'admin', 'sale']
    },
    children: [
      {
        path: 'create',
        name: 'sale project create',
        component: () => import('@/views/SaleProjects/ProjectCreate.vue')
      }
    ]
  },
  {
    path: '/sale/projects/:project_id',
    name: 'sale project detail',
    props: true,
    meta: {
      groups: ['root', 'admin', 'sale']
    },
    component: () => import('@/views/SaleProjects/Project.vue'),
    children: [
      {
        path: 'description',
        alias: '',
        name: 'project description',
        component: () => import('@/views/SaleProjects/ProjectDescription.vue')
      },
      {
        path: 'activities',
        name: 'project activities',
        component: () => import('@/views/SaleProjects/ProjectActivities.vue')
      },
      {
        path: 'files',
        name: 'project files',
        component: () => import('@/views/SaleProjects/ProjectFiles.vue')
      },
      {
        path: 'settings',
        name: 'project settings',
        component: () => import('@/views/SaleProjects/ProjectSettings.vue')
      },
      {
        path: 'schemas/create',
        name: 'design schema create',
        component: () => import('@/views/SaleProjects/SchemaCreate.vue')
      },
      {
        path: 'schemas/:schema_id',
        name: 'design schema',
        component: () => import('@/views/SaleProjects/Schema.vue')
      },
      {
        path: 'schemas/:schema_id/drawings/create',
        name: 'cad drawing create',
        component: () => import('@/views/SaleProjects/CadDrawingCreate.vue')
      },
      {
        path: 'schemas/:schema_id/drawing',
        name: 'cad drawing',
        component: () => import('@/views/SaleProjects/CadDrawing.vue')
      },
      {
        path: 'schemas/:schema_id/quotations/create',
        name: 'quotation create',
        component: () => import('@/views/SaleProjects/QuotationCreate.vue')
      },
      {
        path: 'schemas/:schema_id/quotations/:quotation_id',
        name: 'quotation detail',
        component: () => import('@/views/SaleProjects/Quotation.vue')
      }
    ]
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/News/index.vue')
  },
  {
    path: '/news/create',
    name: 'news create',
    component: () => import('@/views/News/Create.vue')
  },
  {
    path: '/news/:id',
    name: 'news detail',
    props: true,
    component: () => import('@/views/News/Detail.vue')
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
