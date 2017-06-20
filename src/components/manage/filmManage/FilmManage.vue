<template lang="html">
   <div>
        <h1>电影管理</h1>
        <el-row :gutter="0">
		  <el-col :span="15"><div class="grid-content"><SearchInfo :show="show"></SearchInfo></div></el-col>
		  <el-col :span="3"><div class="grid-content"><AddInfo :show="show"></AddInfo></div></el-col>
		  <el-col :span="3"><div class="grid-content"><DelInfo :show="show"></DelInfo></div></el-col>
		</el-row>
		<TableInfo :show="show"></TableInfo>
		<ChangeInfo :show="show"></ChangeInfo>
		<Pagination :show="show"></Pagination>
    </div>  
</template>

<script>
	import {ajax} from "@/js/tools";
	import SearchInfo from "@/components/manage/filmManage/SearchInfo";
	import TableInfo from "@/components/manage/filmManage/TableInfo";
	import AddInfo from "@/components/manage/filmManage/AddInfo";
	import DelInfo from "@/components/manage/filmManage/DelInfo";
	import ChangeInfo from "@/components/manage/filmManage/ChangeInfo";
	import Pagination from "@/components/manage/filmManage/Pagination";
	import store from "@/store";
	import {mapState} from "vuex";
	import {FILM_DATA} from "@/store/mutations";
	export default{
		components:{
			TableInfo,AddInfo,DelInfo,Pagination,ChangeInfo,SearchInfo
		},
		computed:{
			...mapState({
				value:state => state.filmManageStore.film_searchDada.value,
				type:state => state.filmManageStore.film_searchDada.type,
				page:state => state.filmManageStore.film_pageData
			})
		},
		created(){
			this.show();
		},
		methods:{
			show(){
				let data = {};
				if(this.type){
					data[this.type] = this.value;
				}
				data.page = this.page;
				data.rows = 6;
				ajax({
					url:"filmInfo/find",
					type:"post",
					data:data,
					success:(data) => {
						store.commit(FILM_DATA,data);  //保存电影数据
					}
				});
			}
		}
	}
</script>

<style lang="css" scoped>
     h1{
		color: rgba(32, 160, 255, 0.75);
        margin:0 0 30px 0;
        padding:30px 0 30px 10px;
		box-shadow: 0 0 10px rgb(105, 187, 250);
    }
</style>


