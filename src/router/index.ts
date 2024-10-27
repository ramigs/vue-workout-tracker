import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { supabase } from '@/lib/supabaseClient'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
        auth: false,
      },
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: 'Login',
        auth: false,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        title: 'Register',
        auth: false,
      },
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue'),
      meta: {
        title: 'Create Workout',
        auth: true,
      },
    },
    {
      path: '/view-workout/:workoutId',
      name: 'view-workout',
      component: () => import('../views/ViewWorkoutView.vue'),
      meta: {
        title: 'View Workout',
        auth: false,
      },
    },
  ],
})

router.beforeEach((to, _, next) => {
  document.title = `${to.meta.title} | Active Tracker`
  next()
})

router.beforeEach(async (to, _, next) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (to.matched.some(res => res.meta.auth)) {
    if (user) {
      next()
      return
    }
    console.log('login')
    next({ name: 'login' })
    return
  }
  next()
})

export default router
