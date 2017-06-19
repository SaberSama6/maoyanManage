<template lang="html">
   <div>

   <!-- 表格模块 -->
      <el-table
	  
	    :data="refer_data.rows"
			ref="multipleTable"
	     @selection-change="handleSelectionChange"
	   
	    style="width: 100%"
	    :fit="true">
	     <el-table-column
     	 type="selection"
      	width="50">
    	</el-table-column>
	    <el-table-column
	      property="cName"
	      label="电影名"
	      width="110"
	      :show-overflow-tooltip="true">
	    </el-table-column>
	    <el-table-column
	      property="title"
	      label="标题"
	      width="110"
	       :show-overflow-tooltip="true">
	    </el-table-column>
	    <el-table-column
	      property="direct"
	      label="导演"
	      width="120"
	       :show-overflow-tooltip="true">
	    </el-table-column>
	       <el-table-column
	      property="film_details"
	      label="电影详情"
	      width="120"
	      :show-overflow-tooltip="true">
	    </el-table-column>
	     <el-table-column
	      property="actor"
	      label="演员"
	       width="120"
	       :show-overflow-tooltip="true">
	    </el-table-column>
	     <el-table-column
	      property="Hot_comments"
	      label="热评"
	      width="120"
	       :show-overflow-tooltip="true">
	    </el-table-column>
	    <el-table-column
	      property="look"
	      label="浏览数"
	      width="110"
	       :show-overflow-tooltip="true">
	    </el-table-column>
	     <el-table-column
	      property="j_img"
	      label="图集"
	      width="120"
	       :show-overflow-tooltip="true">
	    </el-table-column>
	   <el-table-column label="操作">
      <template scope="scope">
        <el-button
        	type="primary"
          size="small"
          @click="handleEdit(scope.row)">修改</el-button>
      </template>
    </el-table-column>
	    
	  </el-table>
    </div>  
</template>

<script>
import {ajax} from "@/js/tools"
import {mapState} from "vuex";
import store from "@/store";
import {HOTMOIVE_DELETE} from"@/store/mutations";
import {REFER_EDIT} from"@/store/mutations";
import {REFER_VISIBLE} from"@/store/mutations";
export default {

    data() {
      return {
      	deleteData:"",
      	deleteArr:[],

      }
      
    },

    computed:{
		...mapState({
			refer_data:state=>state.hotMovie.refer_data,
		})
	},
    methods: {
  
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
        handleSelectionChange(val) {

        //得到id数据
        // th = [];  
        var deletearr = []; 
         for(let i=0;i<val.length;i++){
          deletearr.push(val[i]._id); 
          }
          this.deleteArr = deletearr;
          store.commit(HOTMOIVE_DELETE,this.deleteArr);
        	console.log(this.deleteArr);
       
      },
      handleEdit(row) {
        console.log(row);
        let _id=row._id;
        ajax({
              type:"get",
              url:"/refer/find",
              data:{
                _id:_id
              },
           success:function(data){
           	console.log(123);
           	
            store.commit(REFER_EDIT,data)
            store.commit(REFER_VISIBLE,true)
            }.bind(this)
          })
      },
    }
  }
            
</script>

<style lang="css" scoped>
    
</style>


