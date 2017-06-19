<template>	
<div class="delete">
<el-button  @click="deleteData" type="danger" icon="delete">删除</el-button>
</div>
</template>
<script>
import {ajax} from "@/js/tools";
import $ from "jquery";
import {mapState} from "vuex";
import store from "@/store";
export default{
props:["show"],
	computed:{
		...mapState({
			hotmoive_delete:state => state.hotMovie.hotmoive_delete,
			hotmoive_data:state=>state.hotMovie.hotmoive_data,
		})
	},
	methods:{
		deleteData(){
			
			var obj = {
				page:this.hotmoive_data.curpage,
				rows:5
				}
			var _ids = JSON.stringify(this.hotmoive_delete);
			
		   this.$confirm('您将删除选中电影, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
        		}).then(() => {
        		$.ajax({
				type:"get",
				url:"/refer/del",
				data:{ids:_ids},
				success:function(data){
					this.show(obj);
					this.$message({
		            type: 'success',

		            message: '删除成功!'

		          	});

				}.bind(this)
			})
    
       
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
	

		



		}


	}

}
</script>
<style lang='css' scoped>
.delete{
	margin-top:20px;
}

</style>