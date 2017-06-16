import {SHOW_DATA,SHOW_STUDENT,SHOW_ONESTUDENT,SHOW_PAGE,SHOW_EIT,SHOW_SERCHDATA} from "./mutations"; //引入字符串的变量。
const studentStore={
    state:{
        data:{},
        students:{},
		onestudent:{},
        page:1,
        dialogFormVisible:false,
        searchdata:"",
    },
    mutations:{
        [SHOW_DATA](state,data){
            state.data=data;
        },
        [SHOW_STUDENT](state,students){
            state.students=students;
        },
		[SHOW_ONESTUDENT](state,onestudent){
            state.onestudent=onestudent;
        },
        [SHOW_PAGE](state,page){
            state.page=page;
        },
        [SHOW_EIT](state,dialogFormVisible){
            state.dialogFormVisible=dialogFormVisible;
        },
        [SHOW_SERCHDATA](state,searchdata){
            state.searchdata=searchdata;
        },
    }
}

export {studentStore as default}