<template lang="html">
	<div class="block">
		  <el-pagination
		 	@size-change="handleSizeChange"
      		@current-change="handleCurrentChange"
		    layout="prev, pager, next"
		    :page-size="10"
		    :current-page="page"
		    :total="film_data.total">
		  </el-pagination>
	</div>
</template>
<script>
	import {mapState} from "vuex";
	import store from "@/store";
	import {FILM_PAGEDATA} from "@/store/mutations";
	export default{
		props:["show"],
		computed:{
			...mapState({
				film_data:state => state.filmManageStore.film_data,
				page:state => state.filmManageStore.film_pageData
			})
		},
		methods:{
			handleSizeChange(val){
				console.log(val);
			},
			handleCurrentChange(val){
				store.commit(FILM_PAGEDATA,val);
				this.show();
			}
		}
	}
</script>