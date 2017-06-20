<template>  
<div class="add">
<el-button type="primary" @click="addData('form')"><i class="el-icon-plus"></i> 添加</el-button>
<el-dialog class="addform" :before-close="closeForm" title="增加" size="tiny" :visible.sync="dialogFormVisible">
  <el-form :model="form"  :rules="rules" ref="form" prop="form" class="demo-ruleForm">
    <el-form-item label="电影名" prop="cName" :label-width="formLabelWidth">
      <el-input v-model="form.cName" auto-complete="off" size="small"></el-input>
    </el-form-item>
  <el-form-item label="标题"  prop="title"  :label-width="formLabelWidth">
      <el-input v-model="form.title" auto-complete="off" size="small"></el-input>
    </el-form-item>
    <el-form-item label="导演"  prop="direct" :label-width="formLabelWidth">
      <el-input v-model="form.direct"s auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="电影详情"  prop="film_details" :label-width="formLabelWidth">
      <el-input v-model="form.film_details" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="演员"   prop="actor" :label-width="formLabelWidth">
      <el-input v-model="form.actor" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="热评"   prop="Hot_comments" :label-width="formLabelWidth">
      <el-input v-model="form.Hot_comments" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="浏览数" prop="look" :label-width="formLabelWidth">
      <el-input v-model="form.look" auto-complete="off"></el-input>
    </el-form-item>
<el-upload
  class="upload-demo"
  action="/upload"
  ref="upload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-success="success"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="closeForm">取 消</el-button>
    <el-button type="primary" @click="confirmAdd('form')">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>
<script>
import{ajax} from "@/js/tools";
import store from "@/store";
import {mapState} from "vuex";
import {HOTMOIVE_SEARCH} from "@/store/mutations";
import {REFER_EDIT} from "@/store/mutations";
export default{
  props:["show"],
  data(){
    var checkcName = (rule, value, callback) => {
       
        if (value === '') {
          callback(new Error('请输入电影名'));
        }else{

          if (/\S/.test(this.form.cName)){
              callback();        
          }else{
            callback(new Error('请输入正确格式'));

          }
         
        }
      };
      var checktitle = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入标题'));
        } else if (/\S/.test(this.form.title)) {
          callback();
        
        } else {
           callback(new Error('请输入正确格式'));
        }
      };
        var checkdirect = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入导演'));
        } else if (/\S/.test(this.form.direct)) {
          callback();
        
        } else {
           callback(new Error('请输入正确格式'));
        }
      };
        var checkfilm_details = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入电影详情'));
        } else if (/\S/.test(this.form.film_details)) {
          callback();
        
        } else {
           callback(new Error('输入正确格式'));
        }
      };
        var checkactor = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入演员'));
        } else if (/\S/.test(this.form.actor)) {
          callback();
        
        } else {
           callback(new Error('输入正确格式'));
        }
      };
        var checkHot_comments = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入热评'));
        } else if (/\S/.test(this.form.Hot_comments)) {
          callback();
        
        } else {
           callback(new Error('输入正确格式'));
        }
      };
        var checklook = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入浏览量'));
        } else if (/^\d{1,}$/.test(this.form.look)) {
          callback();
        
        } else {
           callback(new Error('输入正确格式'));
        }
      };
      return {
      fileList:[],
        dialogFormVisible:false,
         form:{
          cName:"",
          title:"",
          direct:"",
          film_details:"",
          actor:"",
          Hot_comments:"",
          look:"",
      
          },
      rules:{
          cName: [
            { required:true,validator: checkcName, trigger: 'blur' }
          ],
          title: [
            { required:true,validator: checktitle, trigger: 'blur' }
          ],
           direct: [
            { required:true,validator: checkdirect, trigger: 'blur' }
          ],
           film_details: [
            { required:true,validator: checkfilm_details, trigger: 'blur' }
          ],
            actor: [
            {required:true, validator: checkactor, trigger: 'blur' }
          ],
            Hot_comments: [
            { required:true,validator: checkHot_comments, trigger: 'blur' }
          ],
             look: [
            { required:true,validator: checklook, trigger: 'blur' }
          ],
        },

          formLabelWidth: '100px',
          imgs:[],
    }
},
 computed:{
      ...mapState({
      refer_data:state=>state.hotMovie.refer_data

      })
    },
     methods:{
      handleRemove(file, fileList) {
     
        var str = file.response.split('\\');
    
        var num = this.imgs.indexOf(str[1]);

        this.imgs.splice(num,1)
        },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handlePreview(file) {

      },
      success(file){
       var str = file.split('\\');
      this.imgs.push(str[1]);
      console.log(JSON.stringify(this.imgs));
      },
      addData(form){
        console.log(this.fileList);
        console.log( this.imgs);
        
          this.imgs =[];
          this.dialogFormVisible = true;
          console.log(this.$refs[form]);
          this.$refs[form].resetFields();
      },
      closeForm(){
        this.$refs.upload.clearFiles();
        this.dialogFormVisible = false;
      },
      confirmAdd(form){
        console.log(this.$refs.upload);
         console.log(this.$refs);
        store.commit(HOTMOIVE_SEARCH,"");
        this.fileList =[];
        var addobj = {
          page:this.refer_data.maxpage,
          rows:5
           }
            let obj={
              cName:this.form.cName,
              title:this.form.title,
              direct:this.form.direct,
              film_details:this.form.film_details,
              actor:this.form.actor,
              Hot_comments:this.form.Hot_comments,
              look:this.form.look,
              j_img:JSON.stringify(this.imgs)
          };
        this.$refs[form].validate((valid) => {
          if (valid) {

              ajax({
                    type:"post",
                    url:"/refer/add",
                    data:obj,
                    success:function(){
                    this.show(addobj);
                     store.commit(REFER_EDIT,"");
                    this.dialogFormVisible = false, 

                    this.$refs.form.resetFields();
                    this.$refs.upload.clearFiles();
                        this.$message({
                        type: 'success',
                        message: '添加成功!'
                        });

                        console.log('成功');
                    }.bind(this)

                  })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        }
      }
  }

</script>
<style lang='css' scoped>
	
</style>