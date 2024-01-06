import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/index/Login'
import Home from '../views/index/Home'
import Introduct from '../views/index/introduct'
import Temperature from './temperature'
import CityBrain from './citybrain'
import dataSource from './dataSource'
import camera from './camera'
import Sensor from './sensor'
import group from './group'
import Rule from "../views/rule/Rule"
import Rule3 from "../views/rule/Rule3"
import Weibo from "../views/weibo/Weibo";

Vue.use(VueRouter);

const routes = [
  {path: '/', redirect: '/login'},
  {path: '/login', component: Login},
  {
    path: '/home',
    component: Home,
    children: [
      {path: '/introduct', component: Introduct},
      ...Temperature,
      ...CityBrain,
      ...dataSource,
      ...camera,
      ...Sensor,
      ...group,
      {path:'rule', component: Rule},
      {path:'rule3', component: Rule3},
      {path:'weibo', component: Weibo}
    ]
  },

];

const router = new VueRouter({
  routes
});

export default router
