<template lang="html">
	<div>
		<el-dialog
		  title="座位预览"
		  :visible.sync="dialogVisible"
		  size="tiny"
		  >
		  <div >
		  	<img v-for="color in imgColor" :src="color" />
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
		<el-dialog title="修改院线" size="tiny" :visible.sync="visible" :before-close = "closeDialog">
			<el-form :model="itemInfo"  ref="ruleForm" :rules="rules" >
				<el-form-item label="院线名" :label-width="formLabelWidth" prop="cinema">
				    <el-input v-model="itemInfo.cinema" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="地址" :label-width="formLabelWidth">
				    <el-input v-model="itemInfo.address" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机" :label-width="formLabelWidth">
				    <el-input v-model="itemInfo.phone_num" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="官方地址" :label-width="formLabelWidth">
				    <el-input v-model="itemInfo.official_website" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item
				    v-for="(domain, index) in itemInfo.auditoriumInfo"
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
				<el-form-item class="position">
				    <el-button type="primary" @click="isOk('ruleForm')">添加数据</el-button>
				    <el-button @click="closeDialog">取 消</el-button>
				    <el-button @click="test">测试</el-button>
			    </el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import {ajax} from "@/js/tools";
	import {mapState} from "vuex";
	import store from "@/store";
	import {CINEMA_DIALOG} from "@/store/mutations";
	export default{
		props:["show"],
		data(){
			return {
				dialogFormVisible:false,
				dialogVisible:false,
				formLabelWidth:"80px",
				ruleForm:{
					cinema:""
				},
				rules:{
					cinema:[
						{required:true,message: '*院线名不能留空', trigger: 'blur'}
					]
				},
				imgColor:[],
				// dynamicValidateForm: {
		  //         domains: [{
		  //           room: '',
		  //           seat: ''
		  //         }]
		  //       }
			}
		},
		computed:{
			...mapState({
				itemInfo:state => state.cinemaStore.cinema_changeData,
				visible:state => state.cinemaStore.isOpen
			})
		},
		methods:{
			isOk(ruleForm){
				this.$refs[ruleForm].validate((valid) => {
					// console.log(this.itemInfo);
					let newauditoriumInfo = JSON.stringify(this.itemInfo.auditoriumInfo);
					if(valid){
						ajax({
							url:"/cinemaInfo/update",
							type:"post",
							data:{
								_id:this.itemInfo._id,
								cinema:this.itemInfo.cinema,
								address:this.itemInfo.address,
								phone_num:this.itemInfo.phone_num,
								official_website:this.itemInfo.official_website,
								auditoriumInfo:newauditoriumInfo
							},
							success:(data) => {
								if(data === "suc"){
									this.$message({
							            type: 'success',
							            message: '修改成功!'
							        });
						     	    store.commit(CINEMA_DIALOG,false);
							        this.show();
								}
							}
						});
					}else{
						return false;
					}
				});
			},
			// resetForm(ruleForm){
			// 	this.$refs[ruleForm].resetFields();
			// },
			closeDialog(){
				store.commit(CINEMA_DIALOG,false);
			},
			removeDomain(item) {
		        var index = this.itemInfo.auditoriumInfo.indexOf(item)
		        if (index !== -1) {
		          this.itemInfo.auditoriumInfo.splice(index, 1)
		        }
		    },
		    addDomain() {
		        this.itemInfo.auditoriumInfo.push({
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
		      					this.imgColor.push("http://127.0.0.1:3000/images/write.png");
		      				}else if(domain.seat[i][j] == 1){
		      					this.imgColor.push("http://127.0.0.1:3000/images/red.png");
		      				}
		      			}
		      		}
		      	}
		    },
			test(){

			}
		}
	}
</script>