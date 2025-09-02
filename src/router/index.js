import { createWebHistory, createRouter } from 'vue-router'

const routes = [
   {
      name: 'Main Page',
      path: '/',
      component: 'MainPage.vue',
   },
]

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: routes.map((route) => ({
      ...route,
      component: import(`/src/components/contents/${route.component}`),
   })),
})

export default router
