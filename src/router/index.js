import Vue from 'vue';
import VueRouter from 'vue-router';

import About from 'components/About';
import Messages from 'components/Messages';
import page404 from 'components/page404';
import Login from 'components/Login';

import Auth from 'services/Auth';

Vue.use(VueRouter);

// TODO ajouter des tests sur l'existance des routes

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Messages',
      component: Messages,
      meta: {
        auth: true,
      },
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        auth: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        auth: false,
      },
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: page404,
    },
  ],
});

router.beforeEach((route, redirect, next) => {
  if (route.matched.some(m => m.meta.auth) && !Auth.ready()) {
    router.push('/login');
  } else {
    next();
  }
});

export default router;
