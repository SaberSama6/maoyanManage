<template lang="html">
	<div>
		<h2>用户管理</h2>
		<el-row :gutter="20">
		  <el-col :span="16"><div class="grid-content"><SearchInfo :show="show"></SearchInfo></div></el-col>
		  <el-col :span="4"><div class="grid-content"><AddInfo :show="show"></AddInfo></div></el-col>
		  <el-col :span="4"><div class="grid-content"><DelInfo :show="show"></DelInfo></div></el-col>
		</el-row>
		<TableInfo :show="show"></TableInfo>
		<ChangeInfo :show='show'></ChangeInfo>
		<Pagination :show="show"></Pagination>
	</div>
</div>
</template>

<script>
	import {ajax} from "@/js/tools";
	import AddInfo from "@/components/manage/user/AddInfo";
	import TableInfo from "@/components/manage/user/TableInfo";
	import DelInfo from "@/components/manage/user/DelInfo";
	import SearchInfo from "@/components/manage/user/SearchInfo";
	import ChangeInfo from "@/components/manage/user/ChangeInfo";
	import Pagination from "@/components/manage/user/Pagination";
	import {USER_DATA} from "@/store/mutations";
	import {mapState} from "vuex";
	import store from "@/store";
	export default{
		components:{
			AddInfo,TableInfo,DelInfo,SearchInfo,ChangeInfo,Pagination
		},
		computed:{
			...mapState({
				page:state => state.userStore.user_pageData,
				value:state => state.userStore.user_searchDada.value,
				type:state => state.userStore.user_searchDada.type
			})
		},
		created:function(){
	        console.log('【最大的组件】实例已经创建,还未渲染到模板');
	        this.show();
	    },
		methods:{
			show:function(){
				let data = {};
				if(this.type){
					data[this.type] = this.value;
				}
				data.page = this.page;
				data.rows = 5;
				ajax({
					url:"user/find",
					type:"post",
					data:data,
					success:(data) => {
						store.commit(USER_DATA,data);  //保存用户数据
					}
				});
			}
		}
	}
</script>
<style lang="css" scoped>
	.btnStyle{
		background: blue;
		border: 0;
		color: #fff;
		padding: 10px 20px;
		font-size: 20px;
		border-radius: 10px;
	}
	.grid-content {
	    border-radius: 4px;
	    min-height: 36px;
	}
	.bg-purple {
    background: #d3dce6;
  }
  h2{
  	margin:0;
  	padding:20px;
  }
</style>