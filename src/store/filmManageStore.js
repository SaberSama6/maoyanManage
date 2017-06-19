import {FILM_DATA,FILM_PAGEDATA,FILM_DELDATA,FILM_CHANGEDATA,FILM_DIALOG,FILM_SEACHDATA} from "./mutations";

const filmManageStore = {
	state:{
		film_data:{},      //电影总数据
		film_pageData:1,    //页码（默认1）
		film_delData:[],    //需要删除的数据
		film_changeData:{},   //需要修改 的数据
		film_searchDada:{},    //需要查询 的数据
		isOpen:false,    // 默认隐藏对话框
	},
	mutations:{
		[FILM_DATA](state,film_data){
			state.film_data = film_data;   
		},
		[FILM_PAGEDATA](state,film_pageData){
			state.film_pageData = film_pageData;
		},
		[FILM_DELDATA](state,film_delData){
			state.film_delData = film_delData;
		},
		[FILM_CHANGEDATA](state,film_changeData){
			state.film_changeData = film_changeData;
		},
		[FILM_SEACHDATA](state,film_searchDada){
			state.film_searchDada = film_searchDada;
		},
		[FILM_DIALOG](state,isOpen){
			state.isOpen = isOpen;
		}
	}
}
export {filmManageStore as default}