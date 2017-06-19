<template lang="html">
        <div>
            <el-dialog title="增加" :visible.sync="dialogFormVisible" size="tiny" :before-close="close">
              <el-form :model="form" label-width="80px">
                <el-form-item label="姓名">
                  <el-input v-model="student.name" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="性别">
                  <el-select v-model="student.gender" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="年龄">
                  <el-input v-model="student.age" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                  <el-input v-model="student.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                  <el-input v-model="student.address" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="ok">确 定</el-button>
              </div>
            </el-dialog>
		</div>
</template>

<script>
import store from "@/store/index.js"; //引入store设置store的时候必须引入
import {SHOW_EIT} from "@/store/mutations";
import {mapState} from "vuex";
import {ajax} from "@/js/tools";//下面用到了ajax 所以这里引了！ 注意引用的位置，别写到export default 里面去了
export default {
      props:["show"],
     data(){
        return{
            
        }
     },
     computed:{          //在这里引用
         ...mapState({
            dialogFormVisible:state => state.studentStore.dialogFormVisible,
            student:state => state.studentStore.onestudent
        }) 
    },
    watch:{
        dialogFormVisible:function(){
            this.student= {
              name: '',
              age: '',
              gender: '',
              phone: '',
              address:""
            }
        }
    },
     methods: {
          close(){
               store.commit(SHOW_EIT,false);
          },
          ok(){
            ajax({
                type:"post",
                url:"student/update",
                data:this.student,
                success:function(){
                store.commit(SHOW_EIT,false); 
                    this.show()
                }.bind(this)
            })
             
          }
        },
}
</script>

<style lang="css">
    
</style>
