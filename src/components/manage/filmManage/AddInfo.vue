<template>
	<div>
		<el-button type="primary" class="el-icon-plus" @click="dialogFormVisible = true"> 添加</el-button>
		<el-dialog title="添加电影" size="small" :visible.sync="dialogFormVisible" @close = "clearInfo">
			<el-form :model="form"  ref="ruleForm" :rules="rules">
			    <el-form-item label="电影中文名" :label-width="formLabelWidth" prop="cName">
			      <el-input v-model="form.cName" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="电影英文名" :label-width="formLabelWidth" prop="eName">
			      <el-input v-model="form.eName" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
			      <el-input v-model="form.type" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="电影评分" :label-width="formLabelWidth" prop="score">
			      <el-input v-model="form.score" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="演员" :label-width="formLabelWidth" prop="actors">
			      <el-input v-model="form.actors" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="想看" :label-width="formLabelWidth" prop="want">
			      <el-input v-model="form.want" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="区域" :label-width="formLabelWidth" prop="area">
			      <el-input v-model="form.area" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="年代" :label-width="formLabelWidth" prop="decade">
			    	<el-date-picker
					    v-model="form.decade"
					    align="right"
					    type="year"
					    placeholder="选择年代">
					</el-date-picker>
			    </el-form-item>
			    <el-form-item label="时长(分钟)" :label-width="formLabelWidth" prop="duration">
			      <el-input v-model="form.duration" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="上映时间" :label-width="formLabelWidth" prop="release">
		    		<el-date-picker type="date" placeholder="上映时间" v-model="form.release" style="width: 100%;" ></el-date-picker>
		    	</el-form-item>
			    <el-form-item label="上映地区" :label-width="formLabelWidth" prop="release_area">
			      <el-input v-model="form.release_area" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="票房" :label-width="formLabelWidth" prop="box_office">
			      <el-input v-model="form.box_office" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="剧情介绍" :label-width="formLabelWidth" prop="synopsis">
			      <el-input v-model="form.synopsis" auto-complete="off"></el-input>
			    </el-form-item>
			    <!-- 封面 -->
			    <el-form-item>
			    	<el-upload
  						class="upload-demo"
  						ref="upload_fengmian"
  						action="/upload"
  						:on-remove="handleRemove_fengmian"
  						:on-success="isSuccess_fengmian"
  						:auto-upload="false"
  						list-type="picture">
  					<el-button size="small" type="primary">上传封面图片</el-button>
 						<div slot="tip" class="el-upload__tip">这里是上传封面哟~不要搞错了！</div>
					</el-upload>
			    </el-form-item>
			    <!-- 导演 -->
			    <el-form-item>
			    	<el-upload
					  class="upload-demo"
					  ref="upload_daoyan"
					  action="/upload"
					  :on-remove="handleRemove_daoyan"
					  :on-success="isSuccess_daoyan"
					  :auto-upload="false"
					  list-type="picture">
					  <el-button size="small" type="primary">上传导演图片</el-button>
					  <div slot="tip" class="el-upload__tip">这里是上传导演图片哟~不要搞错了！</div>
					</el-upload>
			    </el-form-item>
			    <!-- 演员 -->
			    <el-form-item>
			    	<el-upload
					  class="upload-demo"
					  ref="upload_yanyuan"
					  action="/upload"
					  :on-remove="handleRemove_yanyuan"
					  :on-success="isSuccess_yanyuan"
					  :auto-upload="false"
					  list-type="picture">
					  <el-button size="small" type="primary">上传演员图片</el-button>
					  <div slot="tip" class="el-upload__tip">这里是上传演员们的图片哟~不要搞错了！</div>
					</el-upload>
			    </el-form-item>
			    <!-- 相关图集 -->
			    <el-form-item>
			    	<el-upload
					  class="upload-demo"
					  ref="upload_imgs"
					  action="/upload"
					  :on-remove="handleRemove_imgs"
					  :on-success="isSuccess_imgs"
					  :auto-upload="false"
					  list-type="picture">
					  <el-button size="small" type="primary">上传相关图集</el-button>
					  <div slot="tip" class="el-upload__tip">这里是上传此部电影的相关图集哟~不要搞错了！</div>
					</el-upload>
			    </el-form-item>
			    <el-form-item class="position">
			    	<el-button type="info" @click="submitUpload">确认上传图片</el-button>
				    <el-button type="primary" @click="isOk('ruleForm')">添加数据</el-button>
				    <el-button @click="resetForm('ruleForm')">重 置</el-button>
				    <el-button @click="dialogFormVisible = false">取消</el-button>
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
				formLabelWidth: '93px',
				fileList:[],
				form:{
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
					synopsis:"",
					coverImg:[],      //封面【可能多张】
					directorImg:[],   //导演【张】
					actorsImg:[],   //演员【多张】
					infoImgs:[]   //图集
				},
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
		        	decade:[
		        		{type: 'date',required:true,message: '*年代不能留空', trigger: 'blur'}
		        	],
		        	duration:[
		        		{required:true,message: '*时长不能留空', trigger: 'blur'}
		        	],
		        	release:[
		        		{type: 'date',required:true,message: '*上映时间不能留空', trigger: 'blur'}
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
		methods:{
			isOk(formName){
				this.$refs[formName].validate((valid) => {
					if(valid){
						let decade = new Date(this.form.decade),
							newDecade = decade.getFullYear(),
							release = new Date(this.form.release),
							newRelease = release.getFullYear() + '-' + (release.getMonth() + 1) + '-' + release.getDate()
						this.form.coverImg = JSON.stringify(this.form.coverImg);   //需转成字符串
						this.form.directorImg = JSON.stringify(this.form.directorImg); //需转换字符串
						this.form.actorsImg = JSON.stringify(this.form.actorsImg);   //需转成字符串
						this.form.infoImgs = JSON.stringify(this.form.infoImgs);//需转成字符串
						this.form.decade = newDecade;
						this.form.release = newRelease;
						ajax({
							url:"filmInfo/add",
							type:"post",
							data:this.form,
							success:(data) => {
								this.$message({
							        message: '数据添加成功~',
							        type: 'success'
							    });
							    this.dialogFormVisible = false;
							    this.show();
							}
						});
					}else{
						return false;
					}
				});
			},
			submitUpload() {
		        this.$refs.upload_fengmian.submit();  //上传封面图片
		        this.$refs.upload_daoyan.submit();  //上传导演图片
		        this.$refs.upload_yanyuan.submit();  //上传演员图片
		        this.$refs.upload_imgs.submit();   //上传相关图集
		    },
		    isSuccess_fengmian(response, file, fileList){
		    	// 设置封面图片
		    	this.form.coverImg.push(response);
		    },
		    isSuccess_daoyan(response, file, fileList){
		    	// 设置导演图片
		    	this.form.directorImg.push(response);
		    },
		    isSuccess_yanyuan(response, file, fileList){
		    	// 设置演员图片
		    	this.form.actorsImg.push(response);
		    },
		    isSuccess_imgs(response, file, fileList){
		    	// 设置图集
		    	this.form.infoImgs.push(response);
		    },
			handleRemove_fengmian(file, fileList) {
				if(this.form.coverImg.length > 0){
					this.form.coverImg.splice(this.coverImg.indexOf(file.url),1);
				}
		    },
		    handleRemove_daoyan(file, fileList) {
		        if(this.form.coverImg.length > 0){
					this.form.directorImg.splice(this.directorImg.indexOf(file.url),1);
				}
		    },
		    handleRemove_yanyuan(file, fileList) {
		        if(this.form.coverImg.length > 0){
					this.form.actorsImg.splice(this.actorsImg.indexOf(file.url),1);
				}
		    },
		    handleRemove_imgs(file, fileList) {
		        if(this.form.coverImg.length > 0){
					this.form.infoImgs.splice(this.infoImgs.indexOf(file.url),1);
				}
		    },
			clearInfo(){
				this.dialogFormVisible = false;   //关闭 添加对话框
				this.form.cName = "";
				this.form.eName = "";
				this.form.type = "";
				this.form.score = "";
				this.form.actors = "";
				this.form.want = "";
				this.form.area = "";
				this.form.decade = "";
				this.form.duration = "";
				this.form.release = "";
				this.form.release_area = "";
				this.form.box_office = "";
				this.form.synopsis = "";
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