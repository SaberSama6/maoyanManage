<template>	
<div class="add">
<el-button type="primary" @click="dialogFormVisible = true"><i class="el-icon-plus"></i>增加</el-button>
<el-dialog title="增加" :visible.sync="dialogFormVisible" size="full">
     <el-table
	    ref="singleTable"
	    :data="hotmoive_add_data.rows"
	    highlight-current-row
	     @selection-change="handleSelectionChange"
	    @current-change="handleCurrentChange"
	    style="width: 100%"
	    :fit="true">
	     <el-table-column
     	 type="selection"
      	width="50">
    	</el-table-column>
	    <el-table-column
	      property="cName"
	      label="电影中文名"
	      width="110"
	      :show-overflow-tooltip="true">
	    </el-table-column>
	    <el-table-column
	      property="eName"
	      label="电影英文名"
	      width="110"
	       :show-overflow-tooltip="true">
	    </el-table-column>
	    <el-table-column
	      property="type"
	      label="类型"
	      width="110"
	       :show-overflow-tooltip="true">
	    </el-table-column>
	    <el-table-column
	      property="want"
	      label="想看"
	      width="110"
	      :show-overflow-tooltip="true">
	    </el-table-column>
	     <el-table-column
	      property="score"
	      label="电影评分"
	       width="110"
	       :show-overflow-tooltip="true">
	    </el-table-column>
	     <el-table-column
	      property="actors"
	      label="演员"
	      width="110"
	       :show-overflow-tooltip="true">
	    </el-table-column>
	     <el-table-column
	      property="area"
	      label="区域"
	      width="110"
	       :show-overflow-tooltip="true">
	    </el-table-column>
	     <el-table-column
	      property="decade"
	      label="年代"
	      width="110"
	       :show-overflow-tooltip="true">
	    </el-table-column>
	     <el-table-column
	      property="duration"
	      label="时长"
	      width="110"
	       :show-overflow-tooltip="true">
	    </el-table-column>
	     <el-table-column
	      property="release"
	      label="上映时间"
	      width="110"
	       :show-overflow-tooltip="true">
	    </el-table-column>
	     <el-table-column
	      property="release_area"
	      label="上映地区"
	      width="110"
	       :show-overflow-tooltip="true">
	    </el-table-column>
	     <el-table-column
	      property="box_office"
	      label="票房"
	       :show-overflow-tooltip="true">
	    </el-table-column>
	     <el-table-column
	      property="synopsis"
	      label="剧情简介"
	      :show-overflow-tooltip="true"
	      width="110">
	    </el-table-column>
	     <el-table-column
	      property="imgs"
	      label="图集"
	      idth="110"
	      :show-overflow-tooltip="true">
	    </el-table-column>
	  </el-table>
  <el-pagination
	    layout="prev, pager, next"
	    :total="hotmoive_add_data.total"
	    @current-change="nowpage">
</el-pagination>
  <div slot="footer" class="dialog-footer">
    <el-button @click="closeForm">取 消</el-button>
    <el-button type="primary" @click="ComfirData">确 定</el-button>
  </div>
</el-dialog>

</div>
</template>
<script>
import{ajax} from "@/js/tools";
import store from "@/store";
import {mapState} from "vuex";
import {HOTMOIVE_ADDDATA} from "@/store/mutations";
import PageElement from "./PageElement";
export default{
	props:["show"],
 components:{PageElement},
  data() {
      return {
        dialogFormVisible: false, 
        adddata:"" ,
        addMoredata:""  
    }
  },
  created(){
  	var obj={
  		page:1,
  		rows:5
  	};
  	this.addShowdata(obj)
  },
    computed:{
		...mapState({
			hotmoive_add_data:state=>state.hotMovie.hotmoive_add_data,
		})
	},
  methods:{
  	closeForm(){

  	},
  	ComfirData(){
  		var obj = this.adddata;
  		var addobj = {
  			page:1,
  			rows:5
  		}

		ajax({
	            type:"get",
	            url:"/hotMovie/add",
	            data:obj,
	            success:function(data){

	            this.show(addobj);
	            this.dialogFormVisible = false, 
	 			console.log(data);
	        	}.bind(this)
	        })


  	},
  	addShowdata(obj){
		ajax({
            type:"get",
            url:"/filmInfo/find",
            data:obj,
            success:function(data){
 			console.log(data);
 			store.commit(HOTMOIVE_ADDDATA,data);
        	}.bind(this)
        })

  	},
  	  setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
      	this.adddata = val;
        // this.currentRow = val;
      },
       handleSelectionChange(val) {
       		this
        	console.log(val);
        this.multipleSelection = val;
      },
     nowpage(val){

			console.log(val);
			var obj={
				page:val,
				rows:5

			}
			this.addShowdata(obj);
		}

  }
}
</script>
<style lang='css' scoped>
.add{
	margin-top:20px;
}

</style>