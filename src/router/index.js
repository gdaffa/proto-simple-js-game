import { createWebHistory, createRouter } from 'vue-router'
import mainRoutes from './main-routes.js'
import gameRoutes from './game-routes.js'

let routes = []
routes.push(...mainRoutes, ...gameRoutes)

// =============================================================================

routes = routes.map((route) => ({
   ...route,
   component: () => import(`../contents/${route.component}.vue`),
}))

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes,
})

export default router
