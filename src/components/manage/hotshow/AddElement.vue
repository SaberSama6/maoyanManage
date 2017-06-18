<template>	
<div class="add">
<el-button type="primary" @click="dialogFormVisible=true"><i class="el-icon-plus"></i>增加</el-button>
<el-dialog title="增加" :visible.sync="dialogFormVisible" size="large">
<AddSearchElement :addShowdata="addShowdata" :delSearch="delSearch" ref="reset"></AddSearchElement>
     <el-table
	    ref="multipleTable"
	    :data="hotmoive_add_data.rows"
	 
	     @selection-change="handleSelectionChange"
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
	    :current-page.sync="hotmoive_add_data.curpage"
	    @current-change="nowpage"
	    :page-size="5">
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
import {HOTMOIVE_ADDSEARCH} from "@/store/mutations";
import AddSearchElement from "./AddSearchElement";
export default{
	props:["show"],
 components:{
 	AddSearchElement
 },
  data() {
      return {
        dialogFormVisible: false, 
        adddata:"" 
       
    }
  },
  created(){
  	var obj={
  		page:1,
  		rows:5
  	};
  	this.dialogFormVisible = false;
  	this.addShowdata(obj)
  },
    computed:{
		...mapState({
			hotmoive_add_data:state=>state.hotMovie.hotmoive_add_data,
			hotmoive_data:state => state.hotMovie.hotmoive_data,
			hotmoive_addsearch:state=>state.hotMovie.hotmoive_addsearch
		})
	},
  methods:{
  	closeForm(){
  		this.dialogFormVisible = false;

  	},
  	ComfirData(){
  	  
  		console.log(this.adddata);
  		var addData = this.adddata;
		var obj; 
		var cDATA;
	    var count;
	    var narr=[];
	    var cName=[];
  		var lastpage = this.hotmoive_data.maxpage;
  		var addobj = {
  			page:lastpage,
  			rows:5
  		}
  		//不能添加重复电影
  		ajax({
  			type:"get",
  			url:"/hotMovie/find",
  			data:{},
  			success:function(data){
  		 	for(var i=0;i<addData.length;i++){
             count=false;
             
             for(var j=0;j<data.length;j++){
                 
                 if(data[j].cName==addData[i].cName){
                     count=true;
                     
                 }
                 
             }
             if(count==false){
                 narr.push(addData[i]);

             }
 
         }
         console.log(narr);
		cDATA  = JSON.stringify(narr);
		obj = {
				submitType:"addMore",
				data:cDATA
			}

  		}


  	})
  	 this.$confirm('您将添加选中电影, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
    		ajax({
            type:"get",
            url:"/hotMovie/add",
            data:obj,
            success:function(data){
            this.show(addobj);
            this.dialogFormVisible = false, 
            this.delSearch();

            this.$message({
            type: 'success',

            message: '添加成功!'

          	});
 			console.log(data);
        	}.bind(this)
       		 })
       
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
          });          
        });
  	},
  	addShowdata(obj){
  		
  		// this.dialogFormVisible = true;
		ajax({
            type:"get",
            url:"/filmInfo/find",
            data:obj,
            success:function(data){
 			// console.log(data);
 			store.commit(HOTMOIVE_ADDDATA,data);
        	}.bind(this)
        })

  	},
  	 setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      // handleCurrentChange(val) {
      // 	this.adddata = val;
      // 	console.log(this.adddata);
      //   // this.currentRow = val;
      // },
      
       handleSelectionChange(val) {
       	this.adddata = val;
        	console.log(val);
        // this.multipleSelection = val;
      },
     nowpage(val){
		let type=this.hotmoive_addsearch.type;
        let content=this.hotmoive_addsearch.content;
		var obj={
			page:val,
			rows:5
		}
	  if(type!=undefined){
        obj[type]=content;
        }
		
		this.addShowdata(obj);
		},
		//清空查询
		delSearch(){
        var  obj={
           page:1,
           rows:5,
         }
         this.$refs.reset.$refs.resetForm.resetFields();
         // console.log(this.$refs.reset.$refs.resetForm);
   
         store.commit(HOTMOIVE_ADDSEARCH,"");
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