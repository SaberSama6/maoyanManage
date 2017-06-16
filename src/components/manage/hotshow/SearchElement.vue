<template>	
<div class="search">
 <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="查询类型">
    <el-select v-model="formInline.mold" >
      <el-option label="姓名" value="name"></el-option>
      <el-option label="性别" value="sex"></el-option>
      <el-option label="年龄" value="age"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item >
    <el-input v-model="formInline.content" placeholder="查询"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>


</el-form>
</div>
</template>
<script>
// import {mapState} from "vuex";
// import store from "@/store";
// import {SEARCH_DATA} from "@/store/mutations";
// import AddElement from"./AddElement";
export default{


      data() {
      return {
        formInline: {
          content: '',
          mold: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
//   props:["show"],
// 	 data() {
//       return {
//         formInline: {
//           content: '',
//           mold: ''
//         }
//       }
//     },
//     components:{
//       AddElement
//     },
//      computed:{
//       ...mapState({
//         data:state=>state.studentStore.data

//       })
//     },
//     methods: {
//       onSubmit() {
//         let obj={};
//         console.log(this.formInline.mold);
//         console.log(this);
//         let type=this.formInline.mold;
//         let content=this.formInline.content;
//         let searchdata={
//           type:type,
//           content:content
//         }
//        obj={
//            page:1,
//            rows:this.data.eachpage,
//          }
//         store.commit(SEARCH_DATA,searchdata)
//          obj[type]=content;
//         this.show(obj);
//         console.log(this.formInline.user);
//         console.log(this.formInline.mold);

//       }
//     }

}

</script>
<style lang='css' scoped>
.search{
	margin-top:20px;
}

</style>