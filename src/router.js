import Vue from "vue";
import Router from "vue-router";
import FollowBeat from "./views/FollowBeat.vue";
import About from "./views/About.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: FollowBeat
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});