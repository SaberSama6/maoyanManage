import Vue from "vue";  //引入vue //注意大小写。
import Vuex from "vuex";    //引入vuex
import studentStore from "./studentStore";    //引入Vuex
import theatreChain from "./theatreChain";    //引入theatreChain
import userStore from "./userStore";   //用户信息
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
		userStore:userStore    //用户信息   
    },
    mutations: {    //mutations变异，突变
        addCount(state){
            state.count++;
        }
    }
})

export {store as default}