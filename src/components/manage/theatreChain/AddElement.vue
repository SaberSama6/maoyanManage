<template lang="html">
        <div>
			<el-button type="primary" class="el-icon-plus" @click="open">增加电影</el-button>
            <el-dialog title="增加电影" :visible.sync="dialogFormVisible">
              <el-table
                :data="tableData"
                border
                style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="cName" label="电影名" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="eName" label="英文名"  show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="type" label="类型"  show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="area" label="地区"></el-table-column>
                <el-table-column prop="duration" label="时间"></el-table-column>
              </el-table>
              <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="ok">确 定</el-button>
              </div>
            </el-dialog>
		</div>
</template>

<script>
import {mapState} from "vuex";
import {ajax} from "@/js/tools";  //下面用到了ajax 所以这里引了！ 注意引用的位置，别写到export default 里面去了
export default {
      props:["show"],
     data(){
         return{
            tableData:[],
            dialogFormVisible:false,
            multipleSelection: [],
            theatresData:[]
         }
     },
     computed:{          //在这里引用
         ...mapState({
            tableData:state => state.theatreChain.theatreChain_data
        }) 
    },
     methods: {
            open(){
                this.dialogFormVisible=true;
                 ajax({
                  type:"get",
                  url:"/filmInfo/find",
                  data:{
                      page:1,
                      rows:7
                  },
                  success:function(data){
                      console.log(data);
                      this.tableData=data.rows;
                 }.bind(this)
               });
            },
          close(){
              this.dialogFormVisible= false
          },
          ok(){
              ajax({
                  type:"get",
                  url:"/theatres/find",
                  data:{},
                  success:function(data){
                      console.log(data);
                      let newArr=[];
                      for (let i=0;i<this.multipleSelection.length;i++){
                          for (let j=0;j<data.rows.length;j++){
                              if(this.multipleSelection[i].cName!=data.rows[j].cName){
                                delete this.multipleSelection[i]._id
                                  newArr.push(this.multipleSelection[i]);
                                  return;
                              }
                              return;
                          }
                      }
                      console.log(newArr);
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
