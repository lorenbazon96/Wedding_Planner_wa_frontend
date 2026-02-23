import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import WelcomeView from "../views/WelcomeView.vue";
import EditView from "../views/EditView.vue";
import VendorDashboardView from "../views/VendorDashboardView.vue";

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

  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },

  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/edit",
    name: "edit",
    component: EditView,
  },
  {
    path: "/vendor-dashboard",
    name: "vendor-dashboard",
    component: VendorDashboardView,
  },
];

const router = createRouter({
  history: createWebHistory(),

  routes,
});

export default router;
