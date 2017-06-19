<template lang="html">
   <!-- <div v-bind:style='style'>
        影院管理
    </div>   -->
    <div>
        <h1>院线管理管理</h1>
        <el-row :gutter="20">
		  <el-col :span="16"><div class="grid-content"><SearchInfo :show="show"></SearchInfo></div></el-col>
		  <el-col :span="4"><div class="grid-content"><AddInfo :show="show"></AddInfo></div></el-col>
		  <el-col :span="4"><div class="grid-content"><DelInfo :show="show"></DelInfo></div></el-col>
		</el-row>
		<TableInfo :show="show"></TableInfo>
		<!-- <ChangeInfo :show="show"></ChangeInfo>-->
		<Pagination :show="show"></Pagination> 
    </div>
</template>

<script>
	import {ajax} from "@/js/tools";
	import store from "@/store";
	import {mapState} from "vuex";
	import SearchInfo from "@/components/manage/cinemaManage/SearchInfo";
	import TableInfo from "@/components/manage/cinemaManage/TableInfo";
	import AddInfo from "@/components/manage/cinemaManage/AddInfo";
	import DelInfo from "@/components/manage/cinemaManage/DelInfo";
	import Pagination from "@/components/manage/cinemaManage/Pagination";
	import {CINEMA_DATA} from "@/store/mutations";
	export default{
		components:{
			TableInfo,DelInfo,SearchInfo,AddInfo,Pagination
		},
		computed:{
			...mapState({
				type:state => state.cinemaStore.cinema_searchData.type,
				value:state => state.cinemaStore.cinema_searchData.value,
				page:state => state.cinemaStore.cinema_pageData
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
				data.rows = 10;
				ajax({
					url:"cinemaInfo/find",
					type:"post",
					data:data,
					success:(data) => {
						store.commit(CINEMA_DATA,data);  //保存院线数据
					}
				});
			}
		}
	}
</script>
<style lang="css">
    
</style>
