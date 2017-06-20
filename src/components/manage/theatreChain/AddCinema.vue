<template lang="html">
        <div>
			<el-button type="primary" class="el-icon-plus" @click="open"> 增加影院</el-button>
            <el-dialog title="增加影院" :visible.sync="dialogFormVisible"  size="full" :modal="false">
              <el-table
                :data="tableData"
                border
                style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="cinema" label="影院名" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="address" label="地址"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="phone_num" label="电话"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="official_website" label="官网"></el-table-column>
              </el-table>
              <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="ok">确 定</el-button>
              </div>
            <AddCinemaPage :open="open"></AddCinemaPage>
            </el-dialog>
		</div>
</template>

<script>
import {ajax} from "@/js/tools"; 
import $ from "jquery";
import AddCinemaPage from "@/components/manage/theatreChain/AddCinemaPage";
import store from "@/store/index.js"; 
import {THEATRECHAIN_ADDCINEMADATA} from "@/store/mutations";
 import {mapState} from "vuex";
var count=0;
var newArr2;
export default {
    props:["show"],
    components:{
        AddCinemaPage:AddCinemaPage,
    },
     computed:{          //在这里引用
         ...mapState({
            allCinema:state => state.theatreChain.theatreChain_ids[0].cinema,
            sletcted:state => state.theatreChain.theatreChain_ids[0]
        }) 
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
                      url:"/cinemaInfo/find",
                      data:{
                          page:page,
                          rows:4
                      },
                      success:function(data){
                          this.tableData=data.rows;
						  store.commit(THEATRECHAIN_ADDCINEMADATA,data);
                     }.bind(this)
                   });
            },
          close(){
              this.dialogFormVisible= false
          },
          ok(){
              var newArr=[];
              if(this.allCinema&&count==0){
                      for (let i=0;i<this.multipleSelection.length;i++){
                          var a=0;
                          for (let j=0;j<this.allCinema.length;j++){
                              if(this.multipleSelection[i].cinema==this.allCinema[j].cinema){
                                    a++;
                                  break;
                              }
                          }
                          if(a==0){
                                newArr.push(this.multipleSelection[i]);
                            }
                      }         
              }else{
                  if(count>0){
                       newArr=newArr2;
                       for (let i=0;i<this.multipleSelection.length;i++){
                          var a=0;
                          for (let j=0;j<newArr2.length;j++){
                              if(this.multipleSelection[i].cinema==newArr2[j].cinema){
                                    a++;
                                  break;
                              }
                          }
                          if(a==0){
                                newArr.push(this.multipleSelection[i]);
                            }
                      }
                  }else{
                      for (let i=0;i<this.multipleSelection.length;i++){
                        newArr.push(this.multipleSelection[i]); 
                        }
                      newArr2=newArr;
                      count++;
                  }
              }
              if(newArr.length>0){
                            if(this.allCinema!=undefined){
                                this.sletcted.cinema= this.allCinema.concat(newArr);    
                            }else{
                                this.sletcted.cinema=newArr;
                            }
                         $.ajax({
                              type:"get",
                              url:"/theatres/update",
                              data: this.sletcted,
                              success:function(){
                                  this.$message({
                                      message: '增加影院成功',
                                      type: 'success'
                                });
                                 this.dialogFormVisible= false
                                  this.show();
                              }.bind(this)
                          })
                      }else{
                          this.$message({
                              message: '你选择影院已存在，或者没有选择！',
                              type: 'warning'
                            });
                      }
              
          },
        handleSelectionChange(val) {
        this.multipleSelection = val;
        
      }
    }
}
</script>

<style lang="css">
    
</style>
