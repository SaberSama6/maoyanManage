<template lang="html">
        <div>
			<el-button type="primary" class="el-icon-search" @click="open"> 查看影院</el-button>
            <el-dialog title="查看影院" :visible.sync="dialogFormVisible">
                 <el-col :span="5"><div class="grid-content"><AddCinema :show="show"></AddCinema></div></el-col>
                <el-col :span="5"><div class="grid-content"><WhichVideoHall :show="show"></WhichVideoHall></div></el-col>            
              <el-table
                :data="tableData"
                border
                style="width: 100%" highlight-current-row @current-change="handleCurrentChange">
                <el-table-column prop="cinema" label="影院名" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="address" label="地址"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="phone_num" label="电话"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="official_website" label="官网"></el-table-column>
              </el-table>
              <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="ok">确 定</el-button>
              </div>
            <WhichCinemaPage :open="open"></WhichCinemaPage>
            </el-dialog>
		</div>
</template>

<script>
import {ajax} from "@/js/tools"; 
import $ from "jquery";
import WhichCinemaPage from "@/components/manage/theatreChain/WhichCinemaPage";
import AddCinema from "@/components/manage/theatreChain/AddCinema";
import WhichVideoHall from "@/components/manage/theatreChain/WhichVideoHall";
import store from "@/store/index.js"; 
import {THEATRECHAIN_CHOOSEVIDEOHALL,THEATRECHAIN_WHICHDATA} from "@/store/mutations";
 import {mapState} from "vuex";
export default {
    components:{
        WhichCinemaPage:WhichCinemaPage,
        AddCinema:AddCinema,
        WhichVideoHall:WhichVideoHall
    },
     computed:{          //在这里引用
         ...mapState({
            selected:state => state.theatreChain.theatreChain_ids  // 选择的数据
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
                if(this.selected.length==1){
                    this.dialogFormVisible=true;
                    this.tableData=this.selected[0]["cinema"];
					store.commit(THEATRECHAIN_WHICHDATA,this.selected[0]["cinema"]);
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
            console.log("电影院：");
            console.log(val);
            store.commit(THEATRECHAIN_CHOOSEVIDEOHALL,val);
        },
         show(){
              this.tableData=this.selected[0]["cinema"];
         }
    }
}
</script>

<style lang="css">
    
</style>
