<template>	
<div class="search">
 <el-form :inline="true" :model="formInline" ref="resetForm" class="demo-form-inline">
  <el-form-item label="查询类型" prop="mold">
    <el-select v-model="formInline.mold"  placeholder="查询类型">
      <el-option label="中文名" value="cName"></el-option>
      <el-option label="英文名" value="eName"></el-option>
      <el-option label="类型" value="type"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item  prop="content">
    <el-input v-model="formInline.content" placeholder="查询内容"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSearch">查询</el-button>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="delSearch">清空查询</el-button>
    </el-form-item>

</el-form>
</div>
</template>
<script>
import {mapState} from "vuex";
import store from "@/store";
import {HOTMOIVE_SEARCH} from "@/store/mutations";
export default{
  props:["show"],

    data() {
      return {
        formInline:{
          content: '',
          mold: ''
        }
      }
    },
     computed:{
      ...mapState({
        hotmoive_data:state=>state.hotMovie.hotmoive_data,

      })
    },

    methods: {
      onSearch(){
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
        store.commit(HOTMOIVE_SEARCH,searchdata)
         obj[type]=content;
        this.show(obj);
        console.log(this.formInline.user);
        console.log(this.formInline.mold);

      },
      //重置查询
      delSearch(){

        var obj = {
            page:1,
            rows:5
        }
        store.commit(HOTMOIVE_SEARCH,"");
        this.show(obj);
        this.$refs.resetForm.resetFields();
      }
    }

}


</script>
<style lang='css' scoped>


</style>