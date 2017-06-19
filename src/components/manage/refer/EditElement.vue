<template>  
<div class="add">
<el-dialog title="修改" :before-close="closeDialog" :visible.sync="refer_visibledata">
  <el-form :model="refer_editdata">
    <el-form-item label="电影名" :label-width="formLabelWidth">
      <el-input v-model="refer_editdata.cName" auto-complete="off" size="small"></el-input>
    </el-form-item>
  <el-form-item label="标题" :label-width="formLabelWidth">
      <el-input v-model="refer_editdata.title" auto-complete="off" size="small"></el-input>
    </el-form-item>
    <el-form-item label="导演" :label-width="formLabelWidth">
      <el-input v-model="refer_editdata.direct" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="电影详情" :label-width="formLabelWidth">
      <el-input v-model="refer_editdata.film_details" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="演员" :label-width="formLabelWidth">
      <el-input v-model="refer_editdata.actor" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="热评" :label-width="formLabelWidth">
      <el-input v-model="refer_editdata.Hot_comments" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="浏览数" :label-width="formLabelWidth">
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
    <el-button type="primary" @click="confirmData">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>
<script>
import{ajax} from "@/js/tools";
import store from "@/store";
import {mapState} from"vuex";
import {REFER_VISIBLE} from "@/store/mutations";
export default{
  props:["show"],
  data(){
      return {
      fileList:[],
        formLabelWidth: '100px',
        imgs:[],
        // j_img:"",
   
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
          url:"http://127.0.0.1:3000/images/"+ele
        });
   
      
    }.bind(this));

  }
},
  computed:{
      ...mapState({
      refer_visibledata:state=>state.hotMovie.refer_visibledata,
      refer_editdata:state=>state.hotMovie.refer_editdata,
      refer_data:state=>state.hotMovie.refer_data

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
      confirmData(file){
        console.log(this.refer_editdata);
        
      let obj1={
        page:this.refer_data.curpage,
        rows:this.refer_data.eachpage
      }
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
             this.$message('修改成功');
          }.bind(this)
        })


        }
      }
  }

</script>
<style lang='css' scoped>
.add{
  margin-top: 20px;
}

</style>