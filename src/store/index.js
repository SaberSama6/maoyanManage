import Vue from "vue";  //引入vue //注意大小写。
import Vuex from "vuex";    //引入vuex
import studentStore from "./studentStore";    //引入Vuex
import theatreChain from "./theatreChain";    //引入theatreChain
import userStore from "./userStore";   //用户信息
import filmManageStore from "./filmManageStore";   //电影管理
import cinemaStore from "./cinemaStore";   //院线管理
import  hotMovie from "./hotMovie";//引入热映
Vue.use(Vuex);  //vue引入第三方组件必须先use一下
const store = new Vuex.Store({      //定义一个store
    state:{
        count:0
    },
    modules:{                       //通过modules加载我的studentStore这样做到分类管理
        studentStore:studentStore,
        theatreChain:theatreChain,
		hotMovie:hotMovie,
		userStore:userStore,    //用户信息
        filmManageStore:filmManageStore,  //电影管理
        cinemaStore:cinemaStore    //院线管理
    },
    mutations: {    //mutations变异，突变
        addCount(state){
            state.count++;
        }
    }
})

export {store as default}