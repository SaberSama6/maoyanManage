<template lang="html">
	<div>
		<el-button type="danger" class="el-icon-delete" @click="delInfo"> 删除</el-button>
	</div>
</template>
<script>
	// import {ajax} from "@/js/tools";
	import $ from "jquery";
	import {mapState} from "vuex";
	export default{
		props:["show"],
		computed:{
			...mapState({
				delData:state => state.userStore.user_delData
			})
		},
		methods:{
			delInfo(){
				let ids = this.delData.map(function(val){
					return val._id;
				});
				if(ids.length > 0){
					 this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
				        	$.ajax({
								url:"/user/del",
								type:"get",
								data:{ids:ids},
								success:(data) => {
									this.show();
								}
							});
				          this.$message({
				            type: 'success',
				            message: '删除成功!'
				          });
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '已取消删除'
				          });          
				        });
				}else{
					this.$message({
			          showClose: true,
			          message: '删除操作失败！请选择......',
			          type: 'error'
			        });
				}
			}
		}
	}
</script>