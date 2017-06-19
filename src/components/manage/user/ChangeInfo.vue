<template lang="html">
	<div>
		<el-dialog title="修改用户信息" size="tiny" :visible.sync="visible" :before-close = "closeDialog">
			<el-form :model="itemInfo" ref="ruleForm" :rules="rules">
		    	<el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
		    		<el-input v-model="itemInfo.username" auto-complete="off"></el-input>
		    	</el-form-item>
		    	<el-form-item label="密码" :label-width="formLabelWidth" prop="userpwd">
		    		<el-input v-model="itemInfo.userpwd" auto-complete="off"></el-input>
		    	</el-form-item>
		    	<el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
		    		<el-input v-model="itemInfo.email" auto-complete="off"></el-input>
		    	</el-form-item>
		    	<el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
		    		<el-input v-model="itemInfo.phone" auto-complete="off"></el-input>
		    	</el-form-item>
		    	<el-form-item label="生日" :label-width="formLabelWidth">
		    		<el-date-picker type="date" placeholder="生日" v-model="itemInfo.birthday" style="width: 100%;"></el-date-picker>
		    	</el-form-item>
		    	<el-form-item class="position">
			    	<el-button type="primary" @click="updateInfo('ruleForm')">确 定</el-button>
			    	<!-- <el-button @click="resetForm('ruleForm')">重 置</el-button> -->
			    	<el-button @click="closeDialog">取 消</el-button>
		    	</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import {ajax} from "@/js/tools";
	import {mapState} from "vuex";
	import store from "@/store";
	import {USER_DIALOG} from "@/store/mutations";
	export default{
		props:["show"],
		data:function(){
			return {
				formLabelWidth:"70px",
				ruleForm:{
					username: "",
		          	userpwd: "",
		          	email: "",
		          	phone: "",
				},
				rules:{
		        	username:[
		        		{required:true,message: '*用户名不能为空', trigger: 'blur'},
		        		{ pattern:/^([A-Za-z]|[\u4E00-\u9FA5])+$/, message: '*汉字和字母', trigger: 'blur' },
			            {validator:this.validateName,trigger: 'blur'}
		        	],
		        	userpwd:[
		        		{required:true,message: '*请输入密码', trigger: 'blur'},
			            { pattern:/^\w{5,10}$/, message: '*长度在 5 到 10 位数字、字母、下划线', trigger: 'blur' }
		        	],
		        	email:[
		        		{required:true,message: '*请输入邮箱', trigger: 'blur'},
			            { pattern:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: '*邮箱格式错误', trigger: 'blur' }
		        	],
		        	phone:[
		        		{required:true,message: '*请输入手机号', trigger: 'blur'},
			            { pattern:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/, message: '*手机号码格式错误', trigger: 'blur' }
		        	]
		        }
			}
		},
		computed:{
			...mapState({
				itemInfo:state => state.userStore.user_changeData,
				visible:state => state.userStore.isOpen,
				page:state => state.userStore.user_pageData
			})
		},
		methods:{
			updateInfo(formName){
				this.$refs[formName].validate((valid) => {
					if(valid){
						let d = new Date(this.itemInfo.birthday),
					newDare = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
					ajax({
						url:"/user/update",
						type:"post",
						data:{
							_id:this.itemInfo._id,
							username:this.itemInfo.username,
							userpwd:this.itemInfo.userpwd,
							email:this.itemInfo.email,
							phone:this.itemInfo.phone,
							birthday:newDare
						},
						success:(data) => {
							if(data === "suc"){
								this.$message({
						            type: 'success',
						            message: '修改成功!'
						        });
						        store.commit(USER_DIALOG,false);
						        this.show();
							}
						}
					});
					}else{
						return false;
					}
				});
			},
			closeDialog:function(){
				store.commit(USER_DIALOG,false);
			},
			resetForm(formName) {
		        this.$refs[formName].resetFields();
		    }
		}
	}
</script>
<style lang="css" scoped>

</style>