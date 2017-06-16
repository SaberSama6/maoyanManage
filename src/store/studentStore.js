import {SHOW_DATA,SHOW_STUDENT,SHOW_ONESTUDENT} from "./mutations"; //引入字符串的变量。
const studentStore={
    state:{
        data:{},
        students:{},
		onestudent:{}
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

    }
}

export {studentStore as default}