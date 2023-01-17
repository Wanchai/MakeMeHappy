import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginFormView from "../components/login/LoginForm.vue";
import { supabase } from "@/supabase";
import type { User } from "@/models/user.model";

const user = (await supabase.auth.getSession()).data.session?.user as User;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginFormView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

router.beforeEach(async (to: RouteLocationNormalized) => {
  if (user?.aud !== "authenticated" && to.name !== "login") {
    // redirect the user to the login page
    return { name: "login" };
  }
});

export default router;
