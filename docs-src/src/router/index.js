import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/typography',
      name: 'Typography',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TypographyView.vue')
    },
    {
      path: '/experiments',
      name: 'Experiments',
      component: () => import('../views/ExperimentsView.vue')
    },
    {
      path: '/classes',
      name: 'Classes',
      component: () => import('../views/ClassesReferenceView.vue')
    },
    {
      path: '/inputs',
      name: 'Inputs',
      component: () => import('../views/InputsView.vue')
    },
  ]
})

export default router
