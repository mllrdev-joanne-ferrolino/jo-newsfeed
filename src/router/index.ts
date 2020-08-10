import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import { RouteNames } from "./route-names";

Vue.use(VueRouter);
function loadView(view: string) {
  return () => import(/* webpackChunkName: "about" */ `../views/${view}.vue`);
}
const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: RouteNames.HOME,
    component: Home
  },

  {
    path: "/feed",
    name: RouteNames.FEED,
    component: loadView("Feed")
  },
  {
    path: "/posts/:id/edit",
    name: RouteNames.EDIT_POST,
    component: loadView("EditPost"),
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
