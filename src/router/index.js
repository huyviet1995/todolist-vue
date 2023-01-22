import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/HomePage.vue";
import UserAuth from "../components/UserAuth.vue";
import store from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: "/auth",
      name: "auth",
      component: UserAuth,
      meta: { requiresUnauth: true },
    },
  ],
});

router.beforeEach(function (to, from, next) {
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
