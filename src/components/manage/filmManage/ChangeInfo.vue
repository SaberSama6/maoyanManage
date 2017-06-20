<template lang="html">
	<div>
		<el-dialog title="修改电影信息" size="small" :visible.sync="visible" :before-close = "closeDialog">
			<el-form :model="itemInfo" ref="ruleForm" :rules="rules">
		    	<el-form-item label="电影中文名" :label-width="formLabelWidth" prop="cName">
			      <el-input v-model="itemInfo.cName" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="电影英文名" :label-width="formLabelWidth" prop="eName">
			      <el-input v-model="itemInfo.eName" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
			      <el-input v-model="itemInfo.type" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="电影评分" :label-width="formLabelWidth" prop="score">
			      <el-input v-model="itemInfo.score" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="演员" :label-width="formLabelWidth" prop="actors">
			      <el-input v-model="itemInfo.actors" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="想看" :label-width="formLabelWidth" prop="want">
			      <el-input v-model="itemInfo.want" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="区域" :label-width="formLabelWidth" prop="area">
			      <el-input v-model="itemInfo.area" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="年代" :label-width="formLabelWidth" prop="decade">
			    	<el-date-picker
					    v-model="itemInfo.decade"
					    align="right"
					    type="year"
					    placeholder="选择年">
					</el-date-picker>
			    </el-form-item>
			    <el-form-item label="时长(分钟)" :label-width="formLabelWidth" prop="duration">
			      <el-input v-model="itemInfo.duration" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="上映时间" :label-width="formLabelWidth" prop="release">
		    		<el-date-picker type="date" placeholder="上映时间" v-model="itemInfo.release" style="width: 100%;" ></el-date-picker>
		    	</el-form-item>
			    <el-form-item label="上映地区" :label-width="formLabelWidth" prop="release_area">
			      <el-input v-model="itemInfo.release_area" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="票房" :label-width="formLabelWidth" prop="box_office">
			      <el-input v-model="itemInfo.box_office" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="剧情介绍" :label-width="formLabelWidth" prop="synopsis">
			      <el-input v-model="itemInfo.synopsis" auto-complete="off"></el-input>
			    </el-form-item>
			    <!-- 封面 -->
			    <el-form-item>
			    	<el-upload
					  class="upload-demo"
					  ref="upload_fengmian"
					  action="/upload"
					  :on-remove="handleRemove1"
					  :on-success="isSuc1"
					  :file-list="fileList1"
					  :auto-upload="false"
					  list-type="picture">
					  <el-button size="small" type="primary">修改封面图片</el-button>
					  <div slot="tip" class="el-upload__tip">修改封面哟！</div>
					</el-upload>
			    </el-form-item>
			    <!-- 导演 -->
			    <el-form-item>
			    	<el-upload
					  class="upload-demo"
					  ref="upload_daoyan"
					  action="/upload"
					  :on-remove="handleRemove2"
					  :on-success="isSuc2"
					  :file-list="fileList2"
					  :auto-upload="false"
					  list-type="picture">
					  <el-button size="small" type="primary">修改导演图片</el-button>
					  <div slot="tip" class="el-upload__tip">修改导演图片哟！</div>
					</el-upload>
			    </el-form-item>
			    <!-- 演员 -->
			    <el-form-item>
			    	<el-upload
					  class="upload-demo"
					  ref="upload_yanyuan"
					  action="/upload"
					  :on-remove="handleRemove3"
					  :on-success="isSuc3"
					  :file-list="fileList3"
					  :auto-upload="false"
					  list-type="picture">
					  <el-button size="small" type="primary">修改演员图片</el-button>
					  <div slot="tip" class="el-upload__tip">修改演员图片哟！</div>
					</el-upload>
			    </el-form-item>
			    <!-- 相关图集 -->
			    <el-form-item>
			    	<el-upload
					  class="upload-demo"
					  ref="upload_imgs"
					  action="/upload"
					  :on-remove="handleRemove4"
					  :on-success="isSuc4"
					  :file-list="fileList4"
					  :auto-upload="false"
					  list-type="picture">
					  <el-button size="small" type="primary">修改相关图集</el-button>
					  <div slot="tip" class="el-upload__tip">修改相关图片哟！</div>
					</el-upload>
			    </el-form-item>
			    <el-form-item class="position">
			    	<el-button type="info" @click="submitUpload">确认上传图片</el-button>
			    	<el-button type="primary" @click="isOk('ruleForm')">确定修改</el-button>
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
	import {FILM_DIALOG} from "@/store/mutations";
	export default{
		props:["show"],
		data:function(){
			return {
				formLabelWidth:"93px",
				fileList1:[],
				fileList2:[],
				fileList3:[],
				fileList4:[],
				ruleForm: {
					cName:"",
					eName:"",
					type:"",
					score:"",
					actors:"",
					want:"",
					area:"",
					decade:"",
					duration:"",
					release:"",
					release_area:"",
					box_office:"",
					synopsis:""
		        },
		        rules:{
		        	cName:[
		        		{required:true,message: '*电影中文名不能留空', trigger: 'blur'}
		        	],
		        	eName:[
		        		{required:true,message: '*电影英文名不能留空', trigger: 'blur'}
		        	],
		        	type:[
		        		{required:true,message: '*类型不能留空', trigger: 'blur'}
		        	],
		        	score:[
		        		{required:true,message: '*分数不能留空', trigger: 'blur'}
		        	],
		        	actors:[
		        		{required:true,message: '*演员不能留空', trigger: 'blur'}
		        	],
		        	want:[
		        		{required:true,message: '*想看不能留空', trigger: 'blur'},
			            { pattern:/^\d{1,}$/, message: '*只能是纯数字', trigger: 'blur' }
		        	],
		        	area:[
		        		{required:true,message: '*区域不能留空', trigger: 'blur'},
		        		{ pattern:/^([A-Za-z,，、 ]|[\u4E00-\u9FA5])+$/, message: '*支持中文和英文，、和空格', trigger: 'blur' }
		        	],
		        	duration:[
		        		{required:true,message: '*时长不能留空', trigger: 'blur'}
		        	],
		        	release_area:[
		        		{required:true,message: '*上映地区不能留空', trigger: 'blur'},
			            { pattern:/^([A-Za-z,，、 ]|[\u4E00-\u9FA5])+$/, message: '*支持中文和英文，、和空格', trigger: 'blur' }
		        	],
		        	box_office:[
		        		{required:true,message: '*票房不能留空', trigger: 'blur'}
		        	],
		        	synopsis:[
		        		{required:true,message: '*剧情介绍不能留空', trigger: 'blur'}
		        	]
		        }
			}
		},
		watch:{
			itemInfo:function(){
				this.fileList1 = [];
				this.fileList2 = [];
				this.fileList3 = [];
				this.fileList4 = [];
				this.itemInfo.coverImg.forEach(function(ele){
					this.fileList1.push({
						name:"图片",
						url:"http://192.168.14.65:3000/" + ele
					});
				}.bind(this));
				this.itemInfo.directorImg.forEach(function(ele){
					this.fileList2.push({
						name:"图片",
						url:"http://192.168.14.65:3000/" + ele
					});
				}.bind(this));
				this.itemInfo.actorsImg.forEach(function(ele){
					this.fileList3.push({
						name:"图片",
						url:"http://192.168.14.65:3000/" + ele
					});
				}.bind(this));
				this.itemInfo.infoImgs.forEach(function(ele){
					this.fileList4.push({
						name:"图片",
						url:"http://192.168.14.65:3000/" + ele
					});
				}.bind(this));
			}
		},
		computed:{
			...mapState({
				itemInfo:state => state.filmManageStore.film_changeData,
				visible:state => state.filmManageStore.isOpen,
				page:state => state.filmManageStore.film_pageData
			})
		},
		methods:{
			submitUpload(){
				this.$refs.upload_fengmian.submit();  //上传封面图片
				this.$refs.upload_daoyan.submit();  //上传导演图片
				this.$refs.upload_yanyuan.submit();  //上传演员图片
				this.$refs.upload_imgs.submit();  //上传图集图片
			},
			isOk(formName){
				this.$refs[formName].validate((valid) => {
					if(valid){
						this.itemInfo.coverImg = JSON.stringify(this.itemInfo.coverImg);
						this.itemInfo.directorImg = JSON.stringify(this.itemInfo.directorImg);
						this.itemInfo.actorsImg = JSON.stringify(this.itemInfo.actorsImg);
						this.itemInfo.infoImgs = JSON.stringify(this.itemInfo.infoImgs);
						ajax({
							url:"/filmInfo/update",
							type:"post",
							data: this.itemInfo,
							success:(data) => {
								if(data === "suc"){
									this.$message({
							            type: 'success',
							            message: '修改成功!'
							        });
						     	    store.commit(FILM_DIALOG,false);
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
				store.commit(FILM_DIALOG,false);
			},
			isSuc1(response, file, fileList){
				this.itemInfo.coverImg.push(response);
			},
			isSuc2(response, file, fileList){
				this.itemInfo.directorImg.push(response);
			},
			isSuc3(response, file, fileList){
				this.itemInfo.actorsImg.push(response);
			},
			isSuc4(response, file, fileList){
				this.itemInfo.infoImgs.push(response);
			},
			handleRemove1(file, fileList) {
				this.itemInfo.coverImg.splice(this.itemInfo.coverImg.indexOf(file.url),1);
		    },
			handleRemove2(file, fileList) {
				this.itemInfo.directorImg.splice(this.itemInfo.directorImg.indexOf(file.url),1);
		    },
			handleRemove3(file, fileList) {
				this.itemInfo.actorsImg.splice(this.itemInfo.actorsImg.indexOf(file.url),1);
		    },
		    handleRemove4(file, fileList) {
		    	this.itemInfo.infoImgs.splice(this.itemInfo.infoImgs.indexOf(file.url),1);
		    }
		}
	}
</script>