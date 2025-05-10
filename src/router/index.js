import { createRouter, createWebHistory } from 'vue-router'
import OperationsView from '@/Operations/Presentation/operations-view.page.vue'
import OperationsCreateDelete from '@/Operations/Presentation/operations-create-delete.component.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '/operations',
      component: OperationsView,
      exact: true
    },
    {
      path: '/operations/create',
      name: '/operations-create',
      component: OperationsCreateDelete,
      exact: true
    }
  ]
})

export default router