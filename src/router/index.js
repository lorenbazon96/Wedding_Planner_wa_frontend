import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import WelcomeView from "@/views/WelcomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },

  {
    path: "/welcome",
    name: "welcome",
    component: WelcomeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
