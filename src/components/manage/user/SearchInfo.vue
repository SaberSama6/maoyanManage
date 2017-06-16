<template lang="html">
	<div>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="">
			    <el-select v-model="formInline.type" placeholder="筛选类型">
			    	<el-option label="用户名" value="username"></el-option>
			      	<el-option label="邮箱" value="email"></el-option>
			      	<el-option label="手机号" value="phone"></el-option>
			      	<el-option label="生日" value="birthday"></el-option>
			    </el-select>
			</el-form-item>
			<el-form-item label="">
					<el-input v-model="formInline.value" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item>
		    	<el-button type="primary" @click="onSubmit">查询</el-button>
		 	</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import {ajax} from "@/js/tools";
	import store from "@/store";
	import {USER_SEACHDATA} from "@/store/mutations";
	export default{
		props:["show"],
		data:function(){
			return {
				findInfo:'',
				formInline: {
		          type: '',
		          value: ''
		        }
			}
		},
		methods:{
			onSubmit() {
				if(this.formInline.type !== "" || this.formInline.value !== ""){
					store.commit(USER_SEACHDATA,this.formInline);
					// this.formInline.value = "";
					this.show();
				}else{
					this.$message({
					    showClose: true,
					    message: '查询操作失败！',
					    type:'error'
					});
				}
		    }
		}
	}
</script>