import {CINEMA_DATA,CINEMA_DELDATA,CINEMA_SEARCHDATA,CINEMA_PAGEDATA,CINEMA_DIALOG,CINEMA_CHANGEDATA} from "./mutations";

const cinemaStore={
	state:{
		cinema_data:{	
			rows:[]			
		},  //院线总数据
		cinema_delData:[],    //需要删除的数据【可能会有多条】
		cinema_searchData:{},   //搜索条件信息
		cinema_pageData:1,     //默认页码为1
		cinema_changeData:"",  //修改的信息  
		isOpen:false    //对话框状态
	},
	mutations:{
		[CINEMA_DATA](state,cinema_data){
			state.cinema_data = cinema_data;    //院线总数据
		},
		[CINEMA_DELDATA](state,cinema_delData){
			state.cinema_delData = cinema_delData;  //需要删除的数据
		},
		[CINEMA_SEARCHDATA](state,cinema_searchData){
			state.cinema_searchData = cinema_searchData;  //搜索信息
		},
		[CINEMA_PAGEDATA](state,cinema_pageData){
			state.cinema_pageData = cinema_pageData;   //页码
		},
		[CINEMA_CHANGEDATA](state,cinema_changeData){
			state.cinema_changeData = cinema_changeData;   //修改信息
		},
		[CINEMA_DIALOG](state,isOpen){
			state.isOpen = isOpen;     //对话框状态
		}
	}
}

export {cinemaStore as default}