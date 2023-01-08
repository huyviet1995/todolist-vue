import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/HomePage.vue";
import UserAuth from "../components/UserAuth.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/auth",
      name: "auth",
      component: UserAuth,
    },
  ],
});

export default router;
