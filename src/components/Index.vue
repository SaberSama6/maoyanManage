//这个文件就是导航。 用router-link这种写法去指向跳转的路由。 to=""里面根据你的实际情况改。 这个要和src/router/index.js下你写的路由匹配。
<template lang="html">
  <div>
    <el-row>
      <el-col :xs="18" :sm="18" :md="18" :lg="20">
          <div class="grid-content bg-purple">
              <h1 class="logoh1">maoyan Manage</h1>
          </div></el-col>
      <el-col :xs="6" :sm="6" :md="6" :lg="4">
          <div class="grid-content bg-purple-light">
              <el-menu theme="dark" class="el-menu-demo" mode="horizontal" :router="true">
                  <el-menu-item index="login" @click="clear">{{session}}</el-menu-item>
              </el-menu>
          </div>
     </el-col>
    </el-row>
    <el-row  class="row-bg" >
        <router-view ></router-view>
    </el-row>
    <el-row>
      
    </el-row>
  </div>
</template>

<script>
		import {ajax} from "@/js/tools"
		
export default {
	data:function(){
		return{
			session:""
		}
	},
	updated:function(){
		ajax({
			type:"post",
			url:"/getSession",
			success:function(data){
				this.session=data.name
			}.bind(this)
		});
	},
	methods:{
		clear:function(){
		ajax({
			type:"post",
			url:"/logout",
			success:function(data){
				this.session="";
				this.$router.push("login");
			}.bind(this)
		});
		}
	}
	
}

</script>

<style lang="css">
  body{
    margin:0;
    padding:0;
  }
  .logoh1{
    margin:0;
    height:60px;
    line-height:60px;
    color: #bfcbd9
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #324157;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    min-height: 36px;
  }
  .row-bg {
    padding: 0px 0;
    background-color: #f9fafc;
  }
</style>
