import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/HomePage.vue"),
    },
    {
      path: "/iframe",
      component: () => import("@/views/IframePage.vue"),
    },
    {
      path: "/search",
      component: () => import("@/views/SearchPage.vue"),
    },
    {
      path: "/games",
      component: () => import("@/views/GamesPage.vue"),
    },
    {
      path: "/apps",
      component: () => import("@/views/AppsPage.vue"),
    },
    {
      path: "/settings",
      component: () => import("@/views/SettingsPage.vue"),
    },
    {
      path: "/credits",
      component: () => import("@/views/CreditsPage.vue"),
    },
    {
      path: "/ai",
      component: () => import("@/views/ai/AIPage.vue"),
    },
    {
      path: "/:404",
      redirect: "/",
    },
  ],
});

export default router;
