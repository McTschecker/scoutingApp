/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/login.vue'
import firebase from './firebaseC/firebase-config'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/teams',
      name: 'team',
      meta: {
        requiresAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/teamLookup.vue')
    },
    {
      path: '/matches',
      name: 'match',
      meta: {
        requiresAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/matchLookup.vue')
    },
    {
      path: '/rankings',
      name: 'rankings',
      meta: {
        requiresAuth: true
      },
      component: () => import('./views/rankings.vue')
    },
    {
      path: '/clean',
      name: 'clean',
      meta: {
        requiresAuth: true
      },
      component: () => import('./views/clean.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) { next('login') }
      else { next() }
    })
  }else next()
})

export default router
