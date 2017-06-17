import {HOTMOIVE_SHOWDATA,HOTMOIVE_ADDDATA,HOTMOIVE_DELETE,HOTMOIVE_SEARCH} from "./mutations"; //引入字符串的变量。
const hotMovie={
    state:{
        hotmoive_data:[],
        hotmoive_add_data:[],
        hotmoive_delete:[],
        hotmoive_search:[],
    },
    mutations:{
        [HOTMOIVE_SHOWDATA](state,hotmoive_data){
            state.hotmoive_data=hotmoive_data;
        },
         [HOTMOIVE_ADDDATA](state,hotmoive_add_data){
            state.hotmoive_add_data=hotmoive_add_data;
        },
        [HOTMOIVE_DELETE](state,hotmoive_delete){
            state.hotmoive_delete = hotmoive_delete;
        },
        [HOTMOIVE_SEARCH](state,hotmoive_search){
            state.hotmoive_search = hotmoive_search;
        },
    }
}

export {hotMovie as default}