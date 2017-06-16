import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/login/Login"  //登录
import Manage from "@/components/manage/Index.vue"  //管理系统
import CinemaManage from "@/components/manage/cinemaManage/CinemaManage"   //院线管理
import FilmManage from "@/components/manage/filmManage/FilmManage"   //电影管理
import Hotshow from "@/components/manage/hotshow/Hotshow"   //热映
import Playshow from "@/components/manage/playshow/Playshow"   //待映
import Refer from "@/components/manage/refer/Refer"    //资讯管理
import TheatreChain from "@/components/manage/theatreChain/TheatreChain"    //院线匹配
import Upshow from "@/components/manage/upshow/Upshow"    //即将上映
import User from "@/components/manage/user/User"    //用户管理
Vue.use(Router)

export default new Router({
    mode: 'history',
  routes: [{
    path: '/', //默认
    component: Login  //默认Login
  }, {
    path: '/manage',   //监测reg
    component: Manage,
    children:[
        { path: '/cinemaManage',  
        component: CinemaManage},
        { path: '/filmManage',  
        component: FilmManage},
        { path: '/hotshow',  
        component: Hotshow},
        { path: '/playshow',  
        component: Playshow},
        { path: '/theatreChain',  
        component: TheatreChain},
        { path: '/upshow',  
        component: Upshow},
        { path: '/refer',  
        component: Refer},
        { path: '/user',  
        component: User}
    ]
  }, {
    path: '/login',   //监测reg
    component: Login
  }]
})
