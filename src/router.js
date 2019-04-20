import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Intro from './views/Intro.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/intro',
      name: 'intro',
      component: Intro
    },
    {
      path: 'login',
      name: 'login',
      component: Login
    },
  ]
});
