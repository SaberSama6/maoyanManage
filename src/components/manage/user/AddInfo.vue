<template lang="html">
	<div>
		<el-button type="primary" class="el-icon-plus" @click="dialogFormVisible = true"> 添加</el-button>
		<el-dialog title="添加用户信息" size="tiny" :visible.sync="dialogFormVisible" @close = "clearInfo">
			<el-form :model="form">
		    	<el-form-item label="用户名" :label-width="formLabelWidth">
		    		<el-input v-model="form.username" auto-complete="off"></el-input>
		    	</el-form-item>
		    	<el-form-item label="密码" :label-width="formLabelWidth">
		    		<el-input v-model="form.userpwd" auto-complete="off"></el-input>
		    	</el-form-item>
		    	<el-form-item label="邮箱" :label-width="formLabelWidth">
		    		<el-input v-model="form.email" auto-complete="off"></el-input>
		    	</el-form-item>
		    	<el-form-item label="手机" :label-width="formLabelWidth">
		    		<el-input v-model="form.phone" auto-complete="off"></el-input>
		    	</el-form-item>
		    	<el-date-picker type="date" placeholder="生日" v-model="form.birthday" style="width: 100%;"></el-date-picker>
		    	<!-- <el-form-item label="生日" :label-width="formLabelWidth">
		    		<el-input v-model="form.birthday" auto-complete="off"></el-input>
		    	</el-form-item> -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="addInfo">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	import {ajax} from "@/js/tools";
	import {mapState} from "vuex";
	import store from "@/store";
	import {USER_DATA} from "@/store/mutations";
	export default{
		props:["show"],
		components:{
			// InputComponent,RadioComponent
		},
		data:function(){
			return {
				dialogFormVisible: false,
				formLabelWidth: '40px',
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
			addInfo:function(){
				if(this.form.username !== "" && this.form.userpwd !== "" && this.form.email !== "" && this.form.phone !== "" && this.form.birthday !== ""){
					let d = new Date(this.form.birthday),
					newDare = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
					// console.log(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate());
					ajax({
						url:"/user/add",
						type:"post",
						data:{
							 username: this.form.username,
					         userpwd: this.form.userpwd,
					         email: this.form.email,
					         phone:this.form.phone,
					         birthday:newDare
						},
						success:(data) => {
							this.$message({
					          message: '恭喜你，数据添加成功~',
					          type: 'success'
					        });
					        this.dialogFormVisible = false;
					        // store.commit("SHOW_SEARCH",{});
					        this.show();
						}
					});
				}else{
					this.$message.error('啊哦，请输入完整的信息');
				}
			},
			clearInfo:function(){
				this.form.username = "";
				this.form.userpwd = "";
				this.form.email = "";
				this.form.phone = "";
				this.form.birthday = "";
			}
		}
	}
</script>