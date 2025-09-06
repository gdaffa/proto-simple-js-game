import { createWebHistory, createRouter } from 'vue-router'

const routes = [
   {
      name: 'Game',
      path: '/',
      component: 'GameView',
   },
   {
      name: 'Contribute',
      path: '/contribute',
      component: 'ContributeView',
   },
   {
      name: 'About',
      path: '/about',
      component: 'AboutView',
   },
]

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: routes.map((route) => ({
      ...route,
      component: () => import(`../contents/${route.component}.vue`),
   })),
})

export default router
