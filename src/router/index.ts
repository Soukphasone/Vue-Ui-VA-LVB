import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Dashboard/Home.vue'
import Login from '@/views/Login/Login.vue'
// import PreviewViewView from '@/views/Previews/PreviewView.vue'
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
    path: PATH.LOGIN,
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login'
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
  document.title = `${to.meta.title} | VA-PROJECT`
  const isAuthenticated = !!localStorage.getItem('userData')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
    // next()
  } else {
    next()
  }
})

export default router
