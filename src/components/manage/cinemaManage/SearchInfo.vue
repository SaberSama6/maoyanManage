<template lang="html">
	<div>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="">
			    <el-select v-model="formInline.type" placeholder="筛选类型">
			    	<el-option label="院线名" value="cinema"></el-option>
			      	<el-option label="地址" value="address"></el-option>
			      	<el-option label="网址" value="official_website"></el-option>
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
	import {CINEMA_SEARCHDATA,CINEMA_PAGEDATA} from "@/store/mutations";
	export default{
		props:["show"],
		data(){
			return {
				formInline:{
					type: '',
		          	value: ''
				}
			}
		},
		methods:{
			onSubmit(){
				console.log(this.formInline);
				if(this.formInline.type !== "" || this.formInline.value !== ""){
					store.commit(CINEMA_SEARCHDATA,this.formInline);
					store.commit(CINEMA_PAGEDATA,1);
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