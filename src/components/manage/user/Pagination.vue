<template lang="html">
	<div class="block">
		  <el-pagination
		 	@size-change="handleSizeChange"
      		@current-change="handleCurrentChange"
		    layout="prev, pager, next"
		    :page-size="5"
		    :current-page="page"
		    :total="user_data.total">
		  </el-pagination>
	</div>
</template>
<script>
	import {mapState} from "vuex";
	import store from "@/store";
	import {USER_PAGEDATA} from "@/store/mutations";
	export default{
		props:["show"],
		computed:{
			...mapState({
				user_data:state => state.userStore.user_data,
				page:state => state.userStore.user_pageData
			})
		},
		methods:{
			handleSizeChange(val){
				console.log(val);
			},
			handleCurrentChange(val){
				store.commit(USER_PAGEDATA,val);
				this.show();
			}
		}
	}
</script>
<style lang="css" scoped>
    .block{
        display:inline-block;
        margin:30px 0 0 40%;
    }
</style>