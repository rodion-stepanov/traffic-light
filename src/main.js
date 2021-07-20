import Vue from "vue";
import App from "@/App.vue";
import VueRouter from "vue-router";
import TrafficLight from "@/components/TrafficLight";

Vue.use(VueRouter);

const routes = [
  {
    path: "/red",
    component: TrafficLight,
    props: {light: 'red'}
  },
  {
    path: "/yellow",
    component: TrafficLight,
    props: {light: 'yellow'}
  },
  {
    path: "/green",
    component: TrafficLight,
    props: {light: 'green'}
  },
  {
    path: '',
    name: 'redirect',
    redirect: {
      path: '/red'
    },
  },
  {
    path: '*',
    name: 'error-404',
    component: {render: (h) => h("h1", "404")},
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
