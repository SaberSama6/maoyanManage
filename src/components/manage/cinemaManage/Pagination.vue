<template lang="html">
	<div class="block">
		  <el-pagination
		 	@size-change="handleSizeChange"
      		@current-change="handleCurrentChange"
		    layout="prev, pager, next"
		    :page-size="10"
		    :current-page="page"
		    :total="cinema_data.total">
		  </el-pagination>
	</div>
</template>
<script>
	import {mapState} from "vuex";
	import store from "@/store";
	import {CINEMA_PAGEDATA} from "@/store/mutations";
	export default{
		props:["show"],
		computed:{
			...mapState({
				cinema_data:state => state.cinemaStore.cinema_data,
				page:state => state.cinemaStore.cinema_pageData
			})
		},
		methods:{
			handleSizeChange(val){

			},
			handleCurrentChange(val){
				store.commit(CINEMA_PAGEDATA,val);
				this.show();
			}
		}
	}
	
</script>