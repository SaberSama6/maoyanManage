<template>
	<div class="block">
	  <el-pagination
	    layout="prev, pager, next"
	    :total="hotmoive_data.total"
	    @current-change="nowpage">
	  </el-pagination>
	</div>
	
</template>
<script>
import store from "@/store";
import {mapState} from "vuex";
export default{
	props:["show"],
	data(){
		return{

		}
	},
	computed:{
		...mapState({
			hotmoive_data:state=>state.hotMovie.hotmoive_data,
		})
	},

	methods:{
		nowpage(val){

			console.log(val);
			var obj={
				page:val,
				rows:5

			}
			this.show(obj);
		}
	}
}
</script>
<style lang='css' scoped>

</style>