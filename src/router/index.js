import { createWebHistory, createRouter } from 'vue-router'
import gameRoutes from './game-routes.js'

const routes = [
   {
      name: 'Home',
      path: '/',
      component: 'HomeView',
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

routes.push(...gameRoutes)

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: routes.map((route) => ({
      ...route,
      component: () => import(`../contents/${route.component}.vue`),
   })),
})

export default router
