import {HOTMOIVE_SHOWDATA,HOTMOIVE_ADDDATA,HOTMOIVE_DELETE,HOTMOIVE_SEARCH,HOTMOIVE_ADDSEARCH,REFER_SHOWDATA,REFER_EDIT,REFER_VISIBLE} from "./mutations"; //引入字符串的变量。
const hotMovie={
    state:{
        hotmoive_data:[],
        hotmoive_add_data:[],
        hotmoive_delete:[],
        hotmoive_search:[],
        hotmoive_addsearch:[],
        refer_data:[],
        refer_editdata:[],
        refer_visibledata:false
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
        [HOTMOIVE_ADDSEARCH](state,hotmoive_addsearch){
            state.hotmoive_addsearch = hotmoive_addsearch;
        },
        [REFER_SHOWDATA](state,refer_data){
            state.refer_data = refer_data;
        },
        [REFER_EDIT](state,refer_editdata){
            state.refer_editdata = refer_editdata;
        },
        [REFER_VISIBLE](state,refer_visibledata){
            console.log(refer_visibledata);
            state.refer_visibledata = refer_visibledata;
        },
    }
}

export {hotMovie as default}