import Vue from "vue";

export enum RouteNames {
  HOME = "Home",
  FEED = "Feed",
  EDIT_POST = "Edit Post"
}

Vue.prototype.$routeNames = RouteNames;

declare module "vue/types/vue" {
  interface Vue {
    $routeNames: typeof RouteNames;
  }
}
