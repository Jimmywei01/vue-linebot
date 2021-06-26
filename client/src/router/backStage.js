import LayoutDashboard from '@/layouts/dashboard'

const dashboardRouter = {
  path: '/',
  component: LayoutDashboard,
  redirect: '/member',
  children: [
    {
      path: 'member',
      component: () => import('@/views/member/index'),
      name: 'Member',
      meta: {
        title: '會員',
        icon: 'el-icon-user-solid'
        // roles: ['admin', 'editor']
      }
    },
    {
      path: 'motohouse',
      component: () => import('@/views/motohouse/index'),
      name: 'MotoHouse',
      meta: {
        title: '車款',
        icon: 'el-icon-bicycle'
        // roles: ['admin', 'editor']
      }
    },
    {
      path: 'motoDetail',
      component: () => import('@/views/motoDetail/index'),
      name: 'MotoDetail',
      meta: {
        title: '詳細資料',
        icon: 'el-icon-tickets'
      }
    }
  ]
}

export default dashboardRouter
