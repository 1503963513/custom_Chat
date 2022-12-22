import { lazy } from 'react'
import {
  IconStar,
  IconUserGroup,
} from '@douyinfe/semi-icons'

const routes = [
  {
    path: '/login',
    component: lazy(() => import('../Views/Login')),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/',
    component: lazy(() => import('../Layout/frameLayout')),
    children: [
      {
        path: '/dashboard',
        exact: true,
        component: lazy(() => import('../Views/Dashboard')),
        meta: {
          title: '首页',
          icon: IconStar,
        },
      },
      {
        path: '/about',
        component: lazy(() => import('../Views/About')),
        meta: {
          title: '客服中心',
          icon: IconUserGroup,
        },
      },
    ],
  },
]

export default routes
