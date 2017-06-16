<template lang="html">
    <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">登录</span>
          </div>
          <div class="text item">
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
          </div>
        </el-card> 
    </div>
</template>

<script>
import {ajax} from "@/js/tools"
    export default {
    data() {
      return {
        ruleForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }, 
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            ajax({
                type:"get",
                url:"user/find",
                data:this.ruleForm,
                success:function(data){
                    if(data.length>0){
                        this.$router.push("student");
                    }else{
                         this.$alert('账号密码错误！', '错误', {
                          confirmButtonText: '确定',
                          callback: action => {
                           this.$refs[formName].resetFields();
                          }
                        });
                    }
                }.bind(this)
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style lang="css" scoped>
    .box-card {
        width: 480px;
        margin:50px auto;
      }
</style>
