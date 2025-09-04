import { createWebHistory, createRouter } from 'vue-router'

const routes = [
   {
      name: 'Main Page',
      path: '/',
      component: 'MainPage',
   },
]

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: routes.map((route) => ({
      ...route,
      component: () => import(`../components/contents/${route.component}.vue`),
   })),
})

export default router
