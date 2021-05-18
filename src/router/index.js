import { createRouter, createWebHistory } from 'vue-router';

import store from '../store/index';

const GamesList = () => import('../views/games/GamesList');
const GamesStatistics = () => import('../views/statistics/GamesStatistics');
const AuthForm = () => import('../views/auth/AuthForm');

const routes = [
  { path: '/', redirect: '/games' },
  { path: '/games', component: GamesList, meta: { requiresAuth: true } },
  {
    path: '/statistics',
    component: GamesStatistics,
    meta: { requiresAuth: true }
  },
  { path: '/login', component: AuthForm },
  { path: '/register', component: AuthForm }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.dispatch('isAuthenticated')) {
    next('/login');
  } else {
    next();
  }
});

export default router;
