import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../pages/LoginView.vue'
import AccountManagementView from '../pages/AccountManagementView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'login', component: LoginView },
    { path: '/account-management', name: 'account-management', component: AccountManagementView },
  ],
})

export default router
