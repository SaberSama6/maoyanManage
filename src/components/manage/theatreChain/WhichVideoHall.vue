<template lang="html">
        <div>
			<el-button type="primary" class="el-icon-search" @click="open">查看放映厅</el-button>
            <el-dialog title="查看放映厅" :visible.sync="dialogFormVisible" size="full" :modal="false">
                <EitVideoHall :show="show"></EitVideoHall>
              <el-table
                :data="tableData"
                border
                style="width: 100%" highlight-current-row @current-change="handleCurrentChange">
                <el-table-column prop="room" label="放映厅名" :show-overflow-tooltip="true"></el-table-column>
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
import EitVideoHall from "@/components/manage/theatreChain/EitVideoHall";
import store from "@/store/index.js"; 
import {THEATRECHAIN_CHOOSEVIDEO} from "@/store/mutations";
 import {mapState} from "vuex";
export default {
    components:{
        EitVideoHall:EitVideoHall
    },
     computed:{          //在这里引用
         ...mapState({
            selected:state => state.theatreChain.theatreChain_choosevideohall  // 选择的数据
        }) 
    },
     data(){
         return{
            tableData:[],
            dialogFormVisible:false,
            currentRow: [],
         }
     },
     methods: {
            open(){   
                if(this.selected._id){
                    this.dialogFormVisible=true;
                    this.tableData=this.selected["auditoriumInfo"];
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
         handleCurrentChange(val) {
            this.currentRow = val;
            console.log("放映厅：")
            console.log(this.currentRow);
            store.commit(THEATRECHAIN_CHOOSEVIDEO,val);
        },
         show(){
             
         }
    }
}
</script>

<style lang="css">
    
</style>
