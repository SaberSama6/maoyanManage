import {HOTMOIVE_SHOWDATA,HOTMOIVE_ADDDATA} from "./mutations"; //引入字符串的变量。
const hotMovie={
    state:{
        hotmoive_data:[],
        hotmoive_add_data:[]
    },
    mutations:{
        [HOTMOIVE_SHOWDATA](state,hotmoive_data){
            state.hotmoive_data=hotmoive_data;
        },
         [HOTMOIVE_ADDDATA](state,hotmoive_add_data){
            state.hotmoive_add_data=hotmoive_add_data;
        },
    }
}

export {hotMovie as default}