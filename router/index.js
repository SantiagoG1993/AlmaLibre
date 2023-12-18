import { createRouter, createWebHistory } from "vue-router";
import IndexView from '../src/views/IndexView.vue'
import ManagerView from '../src/views/ManagerView.vue'

const routes = [
  {
    path:'/',
    name:'index',
    component:IndexView
  },
  {
    path:'/manager',
    name:'manager',
    component:ManagerView

  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
