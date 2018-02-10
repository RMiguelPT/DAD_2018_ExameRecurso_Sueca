/*jshint esversion: 6 */

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

//import shuffle from 'shuffle-array';

import VueRouter from 'vue-router';
import VueSocketio from 'vue-socket.io';
import Vuex, { mapGetters } from 'vuex';
import {
  mapMutations
} from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueSocketio, 'http://192.168.10.10:8080');

const dash = Vue.component('user', require('./components/dashboard.vue'));
const sueca_game = Vue.component('play', require('./components/play.vue'));
const login = Vue.component('login', require('./components/login.vue'));
const index = Vue.component('index', require('./components/index.vue'));


const routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: index
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/dash',
    component: dash
  },
  {
    path: '/play',
    component: sueca_game
  }
];

const router = new VueRouter({
  routes: routes,

});

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = new Vuex.Store({
  state: {
    user: {
      id: '',
      nickname: '',
      admin: '',
      refreshToken: '',
      authToken: '',
      headers: {
        Accept: 'application/json',
        Authorization: ''
      }
    }
  },
  mutations: {
    setID(state, id) {
      state.user.id = id;
    },
    setNickname(state, nickname) {
      state.user.nickname = nickname;
    },
    setAdmin(state, admin) {
      state.user.admin = admin;
    },
    setAuthToken(state, token) {
      state.user.authToken = token;
    },
    setRefreshToken(state, token) {
      state.user.refreshToken = token;
    },
    setHeaders(state, token) {
      state.user.headers.Authorization = 'Bearer ' + token;
    },

  },
  getters: {
    getID(state) {
      return state.user.id;
    },
    getNickname(state) {
      return state.user.nickname;
    },
    getAuthToken(state){
      return state.user.authToken;
    },
    getRefreshToken(state){
      return state.user.refreshToken;
    },
    getAdmin(state){
      return state.user.admin;
    },
    getHeaders(state){
      return state.user.headers;
    }
  },

  methods: {
    ...mapMutations([
      'setID',
      'setNickname',
      'setAdmin',
      'setAuthToken',
      'setRefreshToken',
      'setHeaders'
    ])
  },
  computed: {
    ...mapGetters([
      'getID',
      'getNickname',
      'getAuthToken',
      'getRefreshToken',
      'getAdmin',
      'getHeaders'
    ])
  },
  plugins: [vuexLocal.plugin]

});

const app = new Vue({
  router,
  store,
  data: {
    player1: undefined,
    player2: undefined,
    player3: undefined,
    player4: undefined
  }
}).$mount('#app');