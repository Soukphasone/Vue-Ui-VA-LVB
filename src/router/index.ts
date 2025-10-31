import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Dashboard/Home.vue'
import Login from '@/views/Login/Login.vue'
import VaRegisterView from '@/views/Va/VaRegisterView.vue'
import MapVaView from '@/views/Va/MapVaView.vue'
import CustomerListView from '@/views/Va/CustomerList.vue'
import AuthorizationView from '@/views/Va/Authorization.vue'
import NotFound from '@/views/Dashboard/NotFound.vue'
import { PATH } from './pathName'
const routes = [
  {
    path: PATH.EMPTY_PATH,
    name: 'Home',
    component: Home
  },
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
    path: PATH.RESGISTER,
    name: 'Registration',
    component: VaRegisterView,
    meta: {
      title: 'Registration',
      requiresAuth: true
    }
  },
  {
    path: PATH.MAP_VA,
    name: 'Add Customer Service',
    component: MapVaView,
    meta: {
      title: 'Add Customer Service',
      requiresAuth: true
    }
  },
  {
    path: PATH.CUSTOMER_LIST,
    name: 'Customer List',
    component: CustomerListView,
    meta: {
      title: 'Customer List',
      requiresAuth: true
    }
  },
  {
    path: PATH.AUTHORIZATION,
    name: 'Authorization',
    component: AuthorizationView,
    meta: {
      title: 'authorization',
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
  // {
  //   path: PATH.EMPTY_PATH,
  //   name: 'NotFound',
  //   component: NotFound
  // },
  {
    path: PATH.NOT_FOUND,
    name: 'CatchAll',
    component: NotFound
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | VA-PROJECT`
  const isAuthenticated = !!localStorage.getItem('authToken')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
