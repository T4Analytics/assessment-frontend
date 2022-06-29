import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
// import store from "@/store";
const routes = [
  {
    path: "/:id",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "@/views/Home"),
    // children: [
    //   {
    //     path: "completed",
    //     name:'TestCompleted',
    //     component: () =>
    //       import(
    //         /* webpackChunkName: "TestCompleted" */ "@/views/TestCompleted"
    //       ),
    //   },
    // ],
  },
  // {
  //   path: "/test/completed",
  //   name: "TestCompleted",
  //   component: () =>
  //     import(/* webpackChunkName: "TestCompleted" */ "@/views/TestCompleted"),
  //   // beforeEnter: () => {

  //   // },
  // },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "@/views/NotFound"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.name === "Home") {
    axios.get("http://localhost:3000/papers").then((response) => {
      let a = [];
      response.data.forEach((i) => {
        a.push(i.id);
      });
      if (a.indexOf(Number(to.params.id)) > -1) {
        next();
      } else {
        next({ name: "NotFound" });
      }
    });
  } else {
    next();
  }
});

export default router;
