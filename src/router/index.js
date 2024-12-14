import { createRouter, createWebHistory } from "vue-router";
import iframe from "@/views/iframe.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/home.vue"),
    },
    {
      path: "/iframe",
      component: iframe,
    },
    {
      path: "/search",
      component: () => import("@/views/search.vue"),
    },
    {
      path: "/games",
      component: () => import("@/views/games.vue"),
    },
    {
      path: "/apps",
      component: () => import("@/views/apps.vue"),
    },
    {
      path: "/settings",
      component: () => import("@/views/settings.vue"),
    },
    {
      path: "/credits",
      component: () => import("@/views/credits.vue"),
    },
    {
      path: "/ai",
      component: () => import("@/views/ai/ai.vue"),
    },
    {
      path: "/:404",
      redirect: "/",
    },
  ],
});

export default router;
