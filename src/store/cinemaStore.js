import {CINEMA_DATA,CINEMA_DELDATA,CINEMA_SEARCHDATA,CINEMA_PAGEDATA} from "./mutations";

const cinemaStore={
	state:{
		cinema_data:{	
			rows:[]			
		},  //院线总数据
		cinema_delData:[],    //需要删除的数据【可能会有多条】
		cinema_searchData:{},   //搜索条件信息
		cinema_pageData:1     //默认页码为1
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
		}
	}
}

export {cinemaStore as default}