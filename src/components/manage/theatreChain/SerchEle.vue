<template lang="html">
        <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="选择搜索类型">
                <el-select v-model="formInline.region" placeholder="类型">
                  <el-option label="名字" value="name"></el-option>
                  <el-option label="年龄" value="age"></el-option>
                  <el-option label="性别" value="gender"></el-option>
                  <el-option label="电话" value="phone"></el-option>
                  <el-option label="地址" value="address"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input v-model="formInline.value" placeholder="请输入..."></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
              </el-form-item>
            </el-form>
		</div>
</template>

<script>
    import {ajax} from "@/js/tools";
    import store from "@/store/index.js"; //引入store设置store的时候必须引入
    import {SHOW_SERCHDATA,SHOW_PAGE} from "@/store/mutations";
   export default {
    props:["show"],
    data() {
      return {
        formInline: {
          region: '',
          value:"",
        }
    }},
    methods: {
      onSubmit() {
        let data={};
          data[this.formInline.region]=this.formInline.value;
          store.commit(SHOW_SERCHDATA,data);
          store.commit(SHOW_PAGE,1);
          this.show();
      }
    }
  }                 
</script>

<style lang="css" scoped>

</style>
