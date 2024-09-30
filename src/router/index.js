import { createRouter, createWebHistory } from 'vue-router';
import ai from '@/views/ai/ai.vue';
import apps from '@/views/apps.vue';
import credits from '@/views/credits.vue';
import games from '@/views/games.vue';
import home from '@/views/home.vue';
import search from '@/views/search.vue';
import settings from '@/views/settings.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: home
    },
    {
        path: '/search',
        component: search
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
      path: '/ai',
      component: ai
    },
    {
      path: '/:404',
      redirect: '/'
    }
  ]
})

export default router