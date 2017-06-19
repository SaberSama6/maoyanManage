<template lang="html">
	<div>
		<el-button type="primary" class="el-icon-plus" @click="dialogFormVisible = true"> 添加</el-button>
		<el-dialog
		  title="座位预览"
		  :visible.sync="dialogVisible"
		  size="tiny"
		  :before-close="handleClose">
		  <div >
		  	<img v-for="color in imgColor" :src="color" />
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
		<el-dialog title="添加院线" size="tiny" :visible.sync="dialogFormVisible" @close = "clearInfo">
			<el-form :model="form"  ref="ruleForm" :rules="rules" >
				<el-form-item label="院线名" :label-width="formLabelWidth" prop="cinema">
				    <el-input v-model="form.cinema" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="地址" :label-width="formLabelWidth">
				    <el-input v-model="form.address" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机" :label-width="formLabelWidth">
				    <el-input v-model="form.phone_num" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="官方地址" :label-width="formLabelWidth">
				    <el-input v-model="form.official_website" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item
				    v-for="(domain, index) in dynamicValidateForm.domains"
				    :label="'放映厅'"
				    :key="domain.key"
				    class="border"
				  >
				  	<el-input v-model="domain.room"></el-input>
				    <el-input v-model="domain.seat"></el-input>
				    <el-button @click.prevent="showSeat(domain)">预览座位</el-button>
				    <el-button @click.prevent="removeDomain(domain)">删除影厅</el-button>
				  </el-form-item>
				<!-- 放映厅和座位按钮 -->
				<el-form-item class="position">
					<el-button type="primary" class="el-icon-plus" @click="addDomain"> 添加放映厅</el-button>
				</el-form-item>
				<!-- <el-form-item label="放映厅" :label-width="formLabelWidth" prop="room">
				    <el-input v-model="form.room" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="座位" :label-width="formLabelWidth" prop="seat">
				    <el-input v-model="form.seat" auto-complete="off"></el-input>
				</el-form-item> -->
				<el-form-item class="position">
				    <el-button type="primary" @click="isOk('ruleForm')">添加数据</el-button>
				    <el-button @click="resetForm('ruleForm')">重 置</el-button>
				    <el-button @click="dialogFormVisible = false">取 消</el-button>
				    <el-button @click="test">测试</el-button>
			    </el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import {ajax} from "@/js/tools";
	export default{
		props:["show"],
		data(){
			return {
				dialogFormVisible:false,
				formLabelWidth:"80px",
				form:{
					cinema:"",
					address:"",
					phone_num:"",
					official_website:"",
					auditoriumInfo:[]    //包含 放映厅、座位、时间
				},
				ruleForm:{
					cinema:""
				},
				rules:{
					cinema:[
						{required:true,message: '*院线名不能留空', trigger: 'blur'}
					]
				},
				dynamicValidateForm: {
		          domains: [{
		            room: '',
		            seat: ''
		          }]
		        },
		        dialogVisible:false,
		        imgColor:[]
			}
		},
		methods:{
			isOk(formName){
				this.$refs[formName].validate((valid) => {
					if(valid){
						this.form.auditoriumInfo = JSON.stringify(this.dynamicValidateForm.domains);
						console.log(this.form.auditoriumInfo);
						ajax({
							url:"cinemaInfo/add",
							type:"get",
							data:this.form,
							success:(data) => {
								this.dialogFormVisible = false;
								this.show();
							}
						});
						// alert("成功");
					}else{
						return false;
					}
				});
			},
			clearInfo(){
				this.dialogFormVisible = false;   //关闭 添加对话框
			},
			removeDomain(item) {
		        var index = this.dynamicValidateForm.domains.indexOf(item)
		        if (index !== -1) {
		          this.dynamicValidateForm.domains.splice(index, 1)
		        }
		    },
		    addDomain() {
		        this.dynamicValidateForm.domains.push({
		          room: '',
		          seat: '',
		          key: Date.now()
		        });
		    },
		    showSeat(domain){
		      	if(domain.seat == ""){
		      		this.$message({
			          showClose: true,
			          message: '请输入正确的座位数组，再操作！',
			          type: 'error'
			        });
		      	}else{
		      		// 打开预览
		      		this.imgColor = [];
		      		this.dialogVisible = true;
		      		for(let i = 0;i < domain.seat.length;i++){
		      			for(let j = 0;j < domain.seat[i].length;j++){
		      				if(domain.seat[i][j] == 0){
		      					this.imgColor.push("http://192.168.155.1:3000/images/write.png");
		      				}else if(domain.seat[i][j] == 1){
		      					this.imgColor.push("http://192.168.155.1:3000/images/red.png");
		      				}
		      			}
		      		}
		      	}
		    },
		    handleClose(done) {
		        this.$confirm('确认关闭？')
		          .then(_ => {
		            done();
		          })
		          .catch(_ => {});
		    },
		    resetForm(formName){
		    	this.$refs[formName].resetFields();
		    },
		    test(){
		    	console.log(this.dynamicValidateForm.domains);
		    }
		}
	}
</script>
<style lang="css">
	.position{
		text-align: center;
	}
	.border{
		/*border:2px solid red;*/
		box-shadow: 0 0 4px #000;
		text-align:center;
		padding: 10px;
	}
	.border input{
		margin: 10px 0;
	}
</style>