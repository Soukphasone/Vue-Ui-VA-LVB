import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Dashboard/Home.vue'
import Statement from '@/views/Satement/Statement.vue'
import Login from '@/views/Login/Login.vue'
import ListCartVue from '@/components/Cart/ListCart.vue'
import MenuDetailVue from '@/components/Menu/MenuDetail.vue'
import ChangePasswordView from '@/views/ChangePassword/ChangePassword.vue'
import PreviewViewView from '@/views/Previews/PreviewView.vue'
import { PATH } from './pathName'
const routes = [
  {
    path: PATH.HOME,
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      requiresAuth: true
    }
  },
  {
    path: PATH.STATEMENT,
    name: 'Statement',
    component: Statement,
    meta: {
      title: 'Statement',
      requiresAuth: true
    }
  },
  {
    path: PATH.LOGIN,
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: PATH.MENU_DETAIL,
    name: 'Menu-detail',
    component: MenuDetailVue,
    meta: {
      title: 'Menu-detail'
    }
  },
  {
    path: PATH.CART,
    name: 'Cart',
    component: ListCartVue,
    meta: {
      title: 'Cart'
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
  document.title = `${to.meta.title} | Direct Banking`
  const isAuthenticated = !!localStorage.getItem('authToken')
  if (to.meta.requiresAuth && !isAuthenticated) {
    // next('/login')
    next()
  } else {
    next()
  }
})

export default router
