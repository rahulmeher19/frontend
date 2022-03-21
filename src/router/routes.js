export default [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../Pages/Authentication/Login.vue"),
  },
  {
    path: "/forget-password",
    name: "login",
    component: () => import("../Pages/Authentication/ForgetPassword.vue"),
  },
  {
    path: "/reset-password",
    name: "forget-password",
    component: () => import("../Pages/Authentication/ResetPassword.vue"),
  },
  {
    path: "/signup",
    name: "login",
    component: () => import("../Pages/Authentication/Signup.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("../Layouts/Dashboard.vue"),
    children: [
      {
        path: "/",
        component: () => import("../Pages/Dashboard/Index/Index.vue"),
      },
    ],
  },
  {
    path: "/nodes",
    component: () => import("../Layouts/Dashboard.vue"),
    children: [
      {
        path: "/",
        component: () => import("../Pages/Dashboard/Nodes/Index.vue"),
      },
      {
        path: "new",
        component: () => import("../Pages/Dashboard/Nodes/New.vue"),
      },
    ],
  },
  {
    path: "/users",
    component: () => import("../Layouts/Dashboard.vue"),
    children: [
      {
        path: "/",
        component: () => import("../Pages/Dashboard/Users/Index.vue"),
      },
    ],
  },
  {
    path: "/roles",
    component: () => import("../Layouts/Dashboard.vue"),
    children: [
      {
        path: "/",
        component: () => import("../Pages/Dashboard/Roles/Index.vue"),
      },
    ],
  },
];
