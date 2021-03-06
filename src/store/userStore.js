import {USER_DATA,USER_DELDATA,USER_PAGEDATA,USER_SEARCHDATA,USER_CHANGEDATA,USER_DIALOG} from "./mutations"; //引入字符串的变量。
const userStore = {
	state:{
		user_data:{},
		user_pageData:1,
		user_delData:[],
		user_searchDada:{},
		user_changeData:{},
		isOpen:false,    //默认隐藏对话框
	},
	mutations:{
		[USER_DATA](state,user_data){
			state.user_data = user_data;
		},
		[USER_DELDATA](state,user_delData){
			state.user_delData = user_delData;
		},
		[USER_PAGEDATA](state,user_pageData){
			state.user_pageData = user_pageData;
		},
		[USER_SEARCHDATA](state,user_searchDada){
			state.user_searchDada = user_searchDada;
		},
		[USER_CHANGEDATA](state,user_changeData){
			state.user_changeData = user_changeData;
		},
		[USER_DIALOG](state,user_dialog){
			state.isOpen = user_dialog;
		}
	}
}
export {userStore as default}