import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/typography',
      name: 'Typography',
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
    {
      path: '/colors',
      name: 'Colors',
      component: () => import('../views/ColorView.vue')
    },
    {
      path: '/animation',
      name: 'Animation',
      component: () => import('../views/AnimationView.vue')
    },

  ],
})

export default router
