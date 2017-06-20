<template lang="html">
	<div>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="查询类型">
			    <el-select v-model="formInline.type" placeholder="查询类型">
			    	<el-option label="电影中文名" value="cName"></el-option>
			      	<el-option label="电影英文名" value="eName"></el-option>
			      	<el-option label="类型" value="type"></el-option>
			      	<el-option label="演员" value="actors"></el-option>
			      	<el-option label="地区" value="area"></el-option>
			    </el-select>
			</el-form-item>
			<el-form-item label="">
					<el-input v-model="formInline.value" placeholder="查询内容"></el-input>
			</el-form-item>
			<el-form-item>
		    	<el-button type="primary" @click="onSubmit">查询</el-button>
		 	</el-form-item>
		 	<el-form-item>
		    	<el-button type="primary" @click="onClear">清空查询</el-button>
		 	</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import {ajax} from "@/js/tools";
	import store from "@/store";
	import {FILM_SEACHDATA,FILM_PAGEDATA} from "@/store/mutations";
	export default{
		props:["show"],
		data:function(){
			return {
				formInline: {
		          type: '',
		          value: ''
		        }
			}
		},
		methods:{
			onSubmit() {
				console.log(this.formInline);
				if(this.formInline.type !== "" || this.formInline.value !== ""){
					store.commit(FILM_SEACHDATA,this.formInline);
					store.commit(FILM_PAGEDATA,1);
					this.show();
				}else{
					this.$message({
					    showClose: true,
					    message: '查询操作失败！',
					    type:'error'
					});
				}
		    },
		    onClear(){
		    	this.formInline.type = "";
		    	this.formInline.value = "";
		    	store.commit(FILM_SEACHDATA,this.formInline);
				// store.commit(FILM_PAGEDATA,1);
				this.show();
		    }
		}
	}
</script>