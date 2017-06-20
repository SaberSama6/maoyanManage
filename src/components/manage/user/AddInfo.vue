<template lang="html">
	<div>
		<el-button type="primary" class="el-icon-plus" @click="dialogFormVisible = true"> 添加</el-button>
		<el-dialog title="添加用户信息(*号必填)" size="tiny" :visible.sync="dialogFormVisible" @close = "clearInfo">
			<el-form :model="form" ref="ruleForm" :rules="rules">
		    	<el-form-item label="用户名" :label-width="formLabelWidth"  prop="username">
		    		<el-input v-model="form.username" auto-complete="off"></el-input>
		    	</el-form-item>
		    	<el-form-item label="密码" :label-width="formLabelWidth" prop="userpwd">
		    		<el-input v-model="form.userpwd" auto-complete="off"></el-input>
		    	</el-form-item>
		    	<el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
		    		<el-input v-model="form.email" auto-complete="off"></el-input>
		    	</el-form-item>
		    	<el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
		    		<el-input v-model="form.phone" auto-complete="off"></el-input>
		    	</el-form-item>
		    	<el-form-item label="生日" :label-width="formLabelWidth">
		    		<el-date-picker type="date" placeholder="生日" v-model="form.birthday" style="width: 100%;"></el-date-picker>
		    	</el-form-item>
		    	<el-form-item class="position">
			    	<el-button type="primary" @click="addInfo('ruleForm')">确 定</el-button>
			    	<el-button @click="resetForm('ruleForm')">重 置</el-button>
			    	<el-button @click="dialogFormVisible = false">取 消</el-button>
		    	</el-form-item>
			</el-form>
			<!-- <div slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="addInfo()">确 定</el-button>
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
		  	</div> -->
		</el-dialog>
	</div>
</template>

<script>
	import {ajax} from "@/js/tools";
	import {mapState} from "vuex";
	import store from "@/store";
	import {USER_SEARCHDATA} from "@/store/mutations";
	export default{
		props:["show"],
		components:{
			// InputComponent,RadioComponent
		},
		data:function(){
			return {
				dialogFormVisible: false,
				formLabelWidth: '70px',
				ruleForm: {
		          username: "",
		          userpwd: "",
		          email: "",
		          phone: "",
		        },
		        rules:{
		        	username:[
		        		{required:true,message: '*用户名不能为空', trigger: 'blur'},
		        		{ pattern:/^([A-Za-z]|[\u4E00-\u9FA5])+$/, message: '*支持汉字和字母组合', trigger: 'blur' }
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
			            { pattern:/^1[3|4|5|8][0-9]\d{4,8}$/, message: '*手机号码格式错误', trigger: 'blur' }
		        	]
		        },
				form: {
		          username: '',
		          userpwd: '',
		          email: '',
		          phone:'',
		          birthday:''
		        },
			}
		},
		methods:{
			addInfo:function(formName){
				this.$refs[formName].validate((valid) => {
					if(valid){
						let d = new Date(this.form.birthday),
						newDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
						ajax({
							url:"/user/add",
							type:"post",
							data:{
								 username: this.form.username,
						         userpwd: this.form.userpwd,
						         email: this.form.email,
						         phone:this.form.phone,
						         birthday:newDate
							},
							success:(data) => {
								this.$message({
						          message: '数据添加成功~',
						          type: 'success'
						        });
						        this.dialogFormVisible = false;
						        store.commit(USER_SEARCHDATA,{});
						        this.show();
							}
						});
					}else{
						return false;
					}
				});
			},
			clearInfo:function(){
				this.form.username = "";
				this.form.userpwd = "";
				this.form.email = "";
				this.form.phone = "";
				this.form.birthday = "";
			},
			resetForm(formName) {
		        this.$refs[formName].resetFields();
		    }
		}
	}
</script>
<style lang="css">
	.position{
		text-align: center;
	}
</style>