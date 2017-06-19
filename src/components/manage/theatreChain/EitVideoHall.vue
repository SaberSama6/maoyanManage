<template lang="html">
        <div>
			<el-button type="primary" class="el-icon-search" @click="open">查看放映厅</el-button>
            <el-dialog title="放映厅播放时间" :visible.sync="dialogFormVisible" size="full" :modal="false">
                <el-table
                    :data="videohall"
                    border
                    style="width: 100%">
                    <el-table-column prop="name" label="场次" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="time" label="播放时间"  :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="money" label="票价"  :show-overflow-tooltip="true"></el-table-column>
              </el-table>
            <h3>增加播放场次</h3>
            <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="开播时间" prop="begin" :rules="[{ required: true, message: '开播时间不能为空'},{ pattern: /^[0-9]{1,2}:[0-9]{1,2}$/, message: '时间格式xx:xx'}]">
                <el-input v-model="ruleForm.begin"></el-input>
              </el-form-item>
              <el-form-item label="结束时间" prop="end" :rules="[{ required: true, message: '结束时间不能为空'},{ pattern: /^[0-9]{1,2}:[0-9]{1,2}$/, message: '时间格式xx:xx'}]">
                <el-input v-model="ruleForm.end"></el-input>
              </el-form-item>
              <el-form-item label="票价" prop="money" :rules="[{ required: true, message: '票价不能为空'},{ type: 'number', message: '票价必须为数字值'}]">
                <el-input v-model.number="ruleForm.money"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即增加</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
		</div>
</template>

<script>
import {ajax} from "@/js/tools"; 
import $ from "jquery";
import EitVideoHall from "@/components/manage/theatreChain/EitVideoHall";
/*import store from "@/store/index.js"; 
import {THEATRECHAIN_ALLMOVIE} from "@/store/mutations";*/
 import {mapState} from "vuex";
export default {
    components:{
        EitVideoHall:EitVideoHall
    },
     computed:{          //在这里引用
         ...mapState({
            movie:state => state.theatreChain.theatreChain_ids, //电影
            videoHall:state => state.theatreChain.theatreChain_choosevideo, // 放映厅
            selected:state => state.theatreChain.theatreChain_choosevideohall // 电影院
        }) 
    },
     data(){
         return{
             videohall:[],
            tableData:[],
            dialogFormVisible:false,
            currentRow: [],
            ruleForm: {
              begin:"",
              end:"",
              money:"",    
            },
         }
     },
     methods: {
            open(){   
                if(this.selected._id){
                    this.dialogFormVisible=true;
                    this.tableData=this.selected;
                    this.videohall=this.videoHall.time;
            }else{
                this.$message({
                  showClose: true,
                  message: '请选择一条电影增加影院',
                  type: 'warning'
                });
            }
        },
          close(){
              this.dialogFormVisible= false
          },
          ok(){
              this.dialogFormVisible= false
          },
         show(){
             this.videohall=this.videoHall.time;
         },
         submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                  let obj={};
                  let str="";
                  let videoIndex=0;//放映厅对应电影院所在的索引
                 let hallIndex=0;//电影院对应电影所在的索引
                  for(let i=0;this.movie[0].cinema.length;i++){
                      if(this.movie[0].cinema[i]._id==this.selected._id){
                          videoIndex=i;
                          break;
                      }
                  }
                  for(let i=0;this.selected.auditoriumInfo.length;i++){
                      if(this.selected.auditoriumInfo[i].room==this.videoHall.room){
                          hallIndex=i;
                          break;
                      }
                  }
                  console.log(1);
                  if(this.videoHall.time&&this.videoHall.time.length>0){
                      obj["name"]=`${Number(this.videoHall.time[this.videoHall.time.length-1].name)+1}`;
                      console.log(2);
                  }else{
                      obj["name"]="1";
                      this.movie[0].cinema[videoIndex].auditoriumInfo[hallIndex]["time"]=[];
                      console.log(-2);
                  }  
                  str=this.ruleForm.begin+"-"+this.ruleForm.end;
                  obj["time"]=str;
                  obj["money"]=this.ruleForm.money;
                  console.log(obj);
                  JSON.stringify(obj);
                  let cinema= this.movie[0].cinema;
                  console.log(cinema);
                  cinema[videoIndex].auditoriumInfo[hallIndex].time.push(obj)
                  $.ajax({
                      type:"get",
                      url:"/theatres/update",
                      data: {
                          _id:this.movie[0]._id,
                          cinema:JSON.stringify(cinema)
                      },
                      success:function(){
                      this.$message({
                         message: '放映厅设置成功',
                         type: 'success'
                      });
                        this.show();
                        this.$refs[formName].resetFields();
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

<style lang="css">
    
</style>
