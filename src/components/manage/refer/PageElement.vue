<template>
	<div class="block">
	  <el-pagination
	    layout="prev, pager, next"
	    :total="refer_data.total"
	    @current-change="nowpage"
	    @size-change="handleSizeChange"
	    :current-page.sync="refer_data.curpage"
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
			refer_data:state=>state.hotMovie.refer_data,
			hotmoive_search:state=>state.hotMovie.hotmoive_search,
		})
	},

	methods:{
		handleSizeChange(val){
			console.log(val);
		},
		nowpage(val){
		console.log(val);
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
	.block{
        display:inline-block;
        margin:30px 0 0 40%;
    }
</style>