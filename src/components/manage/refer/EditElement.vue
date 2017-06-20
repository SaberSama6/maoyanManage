<template>  
<div class="add">
<el-dialog title="修改" :before-close="closeDialog" :visible.sync="refer_visibledata">
  <el-form :model="refer_editdata" ref="ruleForm" :rules="rules">
    <el-form-item label="电影名" :label-width="formLabelWidth" prop="cName">
      <el-input v-model="refer_editdata.cName" auto-complete="off" size="small"></el-input>
    </el-form-item>
  <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
      <el-input v-model="refer_editdata.title" auto-complete="off" size="small"></el-input>
    </el-form-item>
    <el-form-item label="导演" :label-width="formLabelWidth" prop="direct">
      <el-input v-model="refer_editdata.direct" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="电影详情" :label-width="formLabelWidth" prop="film_details">
      <el-input v-model="refer_editdata.film_details" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="演员" :label-width="formLabelWidth" prop="actor">
      <el-input v-model="refer_editdata.actor" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="热评" :label-width="formLabelWidth" prop="Hot_comments">
      <el-input v-model="refer_editdata.Hot_comments" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="浏览数" :label-width="formLabelWidth" prop="look">
      <el-input v-model="refer_editdata.look" auto-complete="off"></el-input>
    </el-form-item>
<el-upload
  class="upload-demo"
  action="/upload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :on-success="success"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="closeDialog">取 消</el-button>
    <el-button type="primary" @click="confirmData('ruleForm')">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>
<script>
import{ajax} from "@/js/tools";
import store from "@/store";
import {mapState} from"vuex";
import {REFER_VISIBLE} from "@/store/mutations";
import {REFER_EDIT} from"@/store/mutations";
import {HOTMOIVE_SEARCH} from "@/store/mutations";
export default{
  props:["show"],
  data(){
      return {
      fileList:[],
        dialogFormVisible:false,
        ruleForm:{
          cName:"",
          title:"",
          direct:"",
          film_details:"",
          actor:"",
          Hot_comments:"",
          look:"",
      
          },
      rules:{
         cName:[
                {required:true,message: '*电影中文名不能留空', trigger: 'blur'}
              ],
         title:[
                {required:true,message: '*标题不能留空', trigger: 'blur'}
              ],
          direct:[
                {required:true,message: '*导演不能留空', trigger: 'blur'}
              ],
          film_details:[
                {required:true,message: '*电影详情', trigger: 'blur'}
              ],
          actor:[
                {required:true,message: '*演员不能留空', trigger: 'blur'}
              ],
          Hot_comments:[
                {required:true,message: '*热评不能留空', trigger: 'blur'}
                
              ],
          look:[
                {required:true,message: '*浏览量不能留空', trigger: 'blur'},
                { pattern:/^\d{1,}$/, message: '*只能输入数字', trigger: 'blur' }
              ],
        },

          formLabelWidth: '100px',
          imgs:[],
      }
    
},
  
  watch:{
    refer_editdata:function(){
      console.log(this.refer_editdata);
       this.fileList = [];
       this.refer_editdata.j_img.forEach(function(ele){
        var filename = ele.substring(ele.lastIndexOf("\\")+1);
        this.fileList.push({
          name:"filename",
          url:"http://192.168.14.65:3000/images/"+ele
        });
   
      
    }.bind(this));

  }
},
  computed:{
      ...mapState({
      refer_visibledata:state=>state.hotMovie.refer_visibledata,
      refer_editdata:state=>state.hotMovie.refer_editdata,
      refer_data:state=>state.hotMovie.refer_data,
      hotmoive_search:state=>state.hotMovie.hotmoive_search,

      })
    },
     methods:{
      closeDialog(){
    store.commit(REFER_VISIBLE,false);

      },
      handleRemove(file, fileList) {
        console.log(file);
        var str = file.url.split('/');
        var length= str.length;
        var strimg=str[length-1];
        var num = this.refer_editdata.j_img.indexOf(strimg[1]);
        this.refer_editdata.j_img.splice(num,1)

      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handlePreview(file) {

      },
    success(file){
     var str = file.split('\\');
        console.log(str[1]);
      this.refer_editdata.j_img.push(str[1]);
      console.log(this.refer_editdata.j_img);
      },
    confirmData(ruleForm){
      this.$refs[ruleForm].validate((valid) => {
          if(valid){
      console.log(this.refer_editdata);

      let obj1={
        page:this.refer_data.curpage,
        rows:5
      }
      console.log(this.refer_data.curpage);
      let type=this.hotmoive_search.type;
      let content=this.hotmoive_search.content;
    if(type!=undefined){
        obj1[type]=content;
        }
         console.log(obj1);
      let obj=this.refer_editdata;

      obj.j_img = JSON.stringify(this.refer_editdata.j_img);
      ajax({
            type:"post",
            url:"/refer/update",
            data:obj,
            success:function(data){
            console.log("ok");
            this.show(obj1)
            store.commit(REFER_VISIBLE,false);
            store.commit(REFER_EDIT,"");
             this.$message('修改成功');
          }.bind(this)
        })
    }else{
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