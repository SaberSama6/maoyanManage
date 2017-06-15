import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/login/login"  //


Vue.use(Router)

export default new Router({
    mode: 'history',
  routes: [{
    path: '/', //默认
    component: Login  //默认Login
  }, {
    path: '/reg',   //监测reg
    component: Maoyan
  }, {
    path: '/login',  //监测login
    component: Login
  }, {
    path: '/student',  //监测student
    component: StudentManage
  }]
})
