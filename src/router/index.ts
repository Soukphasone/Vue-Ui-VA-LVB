import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Dashboard/Home.vue'
import Login from '@/views/Login/Login.vue'
import ChangePasswordView from '@/views/ChangePassword/ChangePassword.vue'
import PreviewViewView from '@/views/Previews/PreviewView.vue'
import { PATH } from './pathName'
const routes = [
  {
    path: PATH.HOME,
    name: 'home',
    component: Home,
    meta: {
      title: 'Home',
      requiresAuth: true
    }
  },
  {
    path: PATH.LOGIN,
    name: 'login',
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: PATH.CHANGE_PASSWORD,
    name: 'changePassword',
    component: ChangePasswordView,
    meta: {
      title: 'changePassword',
      requiresAuth: true
    }
  },
  {
    path: '/preview',
    name: 'preview',
    component: PreviewViewView,
    meta: {
      title: 'Preview',
      requiresAuth: true
    }
  },
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | LAO-VIET BANK`
  const isAuthenticated = !!localStorage.getItem('authToken')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
