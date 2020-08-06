import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },

  {
    path: "/feed",
    name: "Feed",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Feed.vue"),
    children: [
      {
        path: "/feed/post/:id",
        name: "PostForm",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          // import(/* webpackChunkName: "about" */ "../views/Post.vue")
          import(/* webpackChunkName: "about" */ "../components/PostForm.vue")
      }
    ]
  },
  {
    path: "/post/:id",
    name: "Edit",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EditPost.vue"),
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
