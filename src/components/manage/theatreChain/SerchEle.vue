<template lang="html">
        <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="查询类型">
                <el-select v-model="formInline.region" placeholder="查询类型">
                  <el-option label="电影名" value="cName"></el-option>
                  <el-option label="英文名" value="eName"></el-option>
                  <el-option label="类型" value="type"></el-option>
                  <el-option label="地区" value="area"></el-option>
                  <el-option label="时间" value="duration"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input v-model="formInline.value" placeholder="查询内容"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
              </el-form-item>
			  <el-form-item>
                <el-button type="primary" @click="clear">清空搜索</el-button>
              </el-form-item>
            </el-form>
		</div>
</template>

<script>
    import {ajax} from "@/js/tools";
    import store from "@/store/index.js"; //引入store设置store的时候必须引入
    import {THEATRECHAIN_PAGE,THEATRECHAIN_SERCH} from "@/store/mutations";
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
            store.commit(THEATRECHAIN_SERCH,data);
            store.commit(THEATRECHAIN_PAGE,1);
          this.show();
      },
	  clear(){
		  let data={};
		  store.commit(THEATRECHAIN_SERCH,data);
		  store.commit(THEATRECHAIN_PAGE,1);
		  this.show();
	  }
    }
  }                 
</script>

<style lang="css" scoped>

</style>
