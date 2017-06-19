<template>
	<div class="block">
	  <el-pagination
	    layout="prev, pager, next"
	    :total="hotmoive_data.total"
	    @current-change="nowpage"
	    :current-page.sync="hotmoive_data.curpage"
	    :page-size="5">
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
			hotmoive_search:state=>state.hotMovie.hotmoive_search,
		})
	},

	methods:{
		nowpage(val){
	
		let type=this.hotmoive_search.type;
        let content=this.hotmoive_search.content;
			var obj={
				page:val,
				rows:5

			}
	  if(type!=undefined){
        obj[type]=content;
        }
			this.show(obj);
		}
	}
}
</script>
<style lang='css' scoped>

</style>