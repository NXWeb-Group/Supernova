import { createRouter, createWebHistory } from 'vue-router';
import home from '../views/home.vue';
import credits from '../views/credits.vue';
import proxy from '../views/proxy.vue';
import games from '../views/games.vue';
import apps from '../views/apps.vue';
import settings from '../views/settings.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: home
    },
    {
        path: '/proxy',
        component: proxy
    },
    {
      path: '/games',
      component: games
    },
    {
      path: '/apps',
      component: apps
    },
    {
      path: '/settings',
      component: settings
    },
    {
        path: '/credits',
        component: credits
    },
    {
      path: '/:404',
      redirect: '/'
    }
  ]
})

export default router