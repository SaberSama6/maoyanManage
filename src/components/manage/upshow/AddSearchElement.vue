<template>	
<div class="search">
 <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="resetForm">
  <el-form-item label="查询类型" prop="mold">
    <el-select v-model="formInline.mold" >
      <el-option label="中文名" value="cName"></el-option>
      <el-option label="英文名" value="eName"></el-option>
      <el-option label="类型" value="type"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item prop="content">
    <el-input v-model="formInline.content" placeholder="查询"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onaddSearch">查询</el-button>
    </el-form-item>
     <el-form-item>
    <el-button type="primary" @click="delSearch()">清空查询</el-button>
    </el-form-item>


</el-form>
</div>
</template>
<script>
import {mapState} from "vuex";
import store from "@/store";
import {HOTMOIVE_ADDSEARCH} from "@/store/mutations";
export default{
  props:["addShowdata","delSearch"],

    data() {
      return {
        formInline: {
          content: '',
          mold: ''
        }
      }
    },
     computed:{
      ...mapState({
        hotmoive_add_data:state=>state.hotMovie.hotmoive_add_data,

      })
    },

    methods: {
      onaddSearch(){
        console.log(123);
        let obj={};
        let type=this.formInline.mold;
        let content=this.formInline.content;
        let searchdata={
          type:type,
          content:content
        }
       obj={
           page:1,
           rows:5,
         }
        store.commit(HOTMOIVE_ADDSEARCH,searchdata);
        obj[type]=content;
        this.addShowdata(obj);
        console.log(this.formInline.mold);
        console.log(this.formInline.content);

      },
      // delSearch(formname){
      //   console.log(212);
      //   this.$refs.resetForm.resetFields();
        // this.$refs.reset.resetFields();
        // console.log( this.$refs.reset);
        // var  obj={
        //    page:1,
        //    rows:5,
        //  }
        //  store.commit(HOTMOIVE_ADDSEARCH,"");
        // this.addShowdata(obj);
      // }

    }

}


</script>
<style lang='css' scoped>


</style>