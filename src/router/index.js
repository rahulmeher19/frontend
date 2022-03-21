import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes.js";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes,
  linkExactActiveClass: "active",
});

// to check if the user is authenticated?
router.beforeEach((to, from, next) => {
  let nonAuthenticatedRoutes = [
    "/login",
    "/signup",
    "/forget-password",
    "/reset-password",
  ];

  if (!localStorage.getItem("NiTOROM-TOKEN")) {
    if (nonAuthenticatedRoutes.includes(to.path)) {
      next();
      return true;
    }
    next({
      path: "/login",
    });
  }

  next();
});

export default router;
