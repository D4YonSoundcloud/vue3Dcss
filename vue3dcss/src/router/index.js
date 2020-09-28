import Vue from 'vue'
import Router from 'vue-router'
import App from "../App";


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: App
    }
  ]
})
