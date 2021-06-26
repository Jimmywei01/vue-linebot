import dashboardRouter from './backStage'

const constantRouter = [
  dashboardRouter,
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
    name: 'Login',
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true,
    name: 'Register',
    meta: {
      title: 'Register'
    }
  },
  {
    path: '*',
    component: () => import('@/views/error/404'),
    hidden: true,
    name: '404',
    meta: {
      title: '404'
    }
  }
]

export default constantRouter
