<template lang="html">
        <div>
			<el-button type="primary" class="el-icon-plus" @click="open">增加电影</el-button>
            <el-dialog title="增加电影" :visible.sync="dialogFormVisible">
              <el-table
                :data="tableData"
                border
                style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="cName" label="电影名" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="eName" label="英文名"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="type" label="类型"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="area" label="地区"></el-table-column>
                <el-table-column prop="duration" label="时间"></el-table-column>
              </el-table>
              <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="ok">确 定</el-button>
              </div>
            <Moviepage :open="open"></Moviepage>
            </el-dialog>
		</div>
</template>

<script>
import {ajax} from "@/js/tools"; 
import $ from "jquery";
import Moviepage from "@/components/manage/theatreChain/Moviepage";
import store from "@/store/index.js"; 
import {THEATRECHAIN_ALLMOVIE} from "@/store/mutations";
export default {
      props:["show"],
    components:{
        Moviepage:Moviepage,
    },
     data(){
         return{
            tableData:[],
            dialogFormVisible:false,
            multipleSelection: [],
         }
     },
     methods: {
            open(page=1){
                this.dialogFormVisible=true;
                 ajax({
                  type:"get",
                  url:"/filmInfo/find",
                  data:{
                      page:page,
                      rows:7
                  },
                  success:function(data){
                        store.commit(THEATRECHAIN_ALLMOVIE,data); 
                      this.tableData=data.rows;
                 }.bind(this)
               });
            },
          close(){
              this.dialogFormVisible= false
          },
          ok(){
              $.ajax({
                  type:"get",
                  url:"/theatres/find",
                  data:{},
                  success:function(data){
                      let newArr=[];
                      for (let i=0;i<this.multipleSelection.length;i++){
                          var a=0;
                          for (let j=0;j<data.length;j++){
                              if(this.multipleSelection[i].cName==data[j].cName){
                                    a++;
                                  break;
                              }
                          }
                          if(a==0){
                                delete this.multipleSelection[i]._id;
                                newArr.push(this.multipleSelection[i]);
                            }
                      }
                      if(newArr.length>0){
                          $.ajax({
                              type:"get",
                              url:"/theatres/add",
                              data:{
                                  submitType:"addMore",
                                  data:newArr
                              },
                              success:function(){
                                  this.$message({
                                      message: '增加电影成功',
                                      type: 'success'
                                });
                                 this.dialogFormVisible= false 
                                this.show()
                              }.bind(this)
                          })
                      }else{
                          this.$message({
                              message: '你选择的电影已存在，或者没有选择！',
                              type: 'warning'
                            });
                      }  
                 }.bind(this)
              })
          },
        handleSelectionChange(val) {
        this.multipleSelection = val;
        
      }
    }
}
</script>

<style lang="css">
    
</style>
