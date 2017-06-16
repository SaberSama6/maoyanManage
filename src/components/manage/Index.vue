<template lang="html">
    <el-row>
      <el-col :span="4">
          <div class="grid-content bg-purple">
             <el-menu default-active="2" class="el-menu-vertical-demo" router="ture">
              <el-menu-item index="user"><i class="el-icon-menu"></i>用户管理</el-menu-item>
              <el-menu-item index="filmManage"><i class="el-icon-menu"></i>电影管理</el-menu-item>
              <el-menu-item index="cinemaManage"><i class="el-icon-menu"></i>院线管理</el-menu-item>
                <el-menu-item index="refer"><i class="el-icon-menu"></i>资讯管理</el-menu-item>
              <el-menu-item index="theatreChain"><i class="el-icon-menu"></i>院线匹配</el-menu-item>
              <el-menu-item index="hotshow"><i class="el-icon-menu"></i>热映管理</el-menu-item>
              <el-menu-item index="playshow"><i class="el-icon-menu"></i>待映管理</el-menu-item>
                <el-menu-item index="upshow"><i class="el-icon-menu"></i>热播管理</el-menu-item>
            </el-menu>
          </div>
      </el-col>
      <el-col :span="20">
          <div class="grid-content bg-purple-light">
                <router-view ></router-view>
          </div></el-col>
    </el-row>
</template>

<script>
</script>

<style lang="css" scoped>
   .grid-content,.el-menu-vertical-demo{
       height:650px;
    }
    .el-menu-vertical-demo{
        background:#C0CCDA
    }
</style>