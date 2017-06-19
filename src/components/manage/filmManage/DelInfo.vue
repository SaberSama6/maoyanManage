<template lang="html">
	<div>
		<el-button type="danger" class="el-icon-delete" @click="delInfo"> 删除</el-button>
	</div>
</template>
<script>
	import $ from "jquery";
	import {mapState} from "vuex";
	export default{
		props:["show"],
		computed:{
			...mapState({
				delData:state => state.filmManageStore.film_delData
			})
		},
		methods:{
			delInfo(){
				let ids = this.delData.map(function(val){
					return val._id;
				});
				if(ids.length > 0){
					this.$confirm('数据即将被删除，是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
				        	$.ajax({
								url:"filmInfo/del",
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