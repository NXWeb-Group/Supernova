import { createRouter, createWebHistory } from "vue-router";
import { store } from "@/assets/store";
import Iframe from "@/views/IframePage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/HomePage.vue"),
    },
    {
      path: "/iframe",
      component: Iframe,
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
      component: () => import("@/views/AIPage.vue"),
    },
    {
      path: "/:404",
      redirect: "/",
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path !== "/iframe") {
    store.isLoading = true;
  }
  next();
});

router.afterEach((to) => {
  if (to.path !== "/iframe") {
    store.isLoading = false;
  }
});

export default router;
