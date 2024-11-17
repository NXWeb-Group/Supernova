import { createRouter, createWebHistory } from "vue-router";

const home = () => import("@/views/home.vue");
const search = () => import("@/views/search.vue");
const games = () => import("@/views/games.vue");
const apps = () => import("@/views/apps.vue");
const settings = () => import("@/views/settings.vue");
const credits = () => import("@/views/credits.vue");
const ai = () => import("@/views/ai/ai.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: home,
    },
    {
      path: "/search",
      component: search,
    },
    {
      path: "/games",
      component: games,
    },
    {
      path: "/apps",
      component: apps,
    },
    {
      path: "/settings",
      component: settings,
    },
    {
      path: "/credits",
      component: credits,
    },
    {
      path: "/ai",
      component: ai,
    },
    {
      path: "/:404",
      redirect: "/",
    },
  ],
});

export default router;
