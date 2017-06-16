<template lang="html">
   <div>

   <!-- 表格模块 -->
      <el-table
	    ref="singleTable"
	    :data="hotmoive_data.rows"
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
    </div>  
</template>

<script>

import {mapState} from "vuex";
export default {

    data() {
      return {
      	// tableData:[]

      }
      
    },

    computed:{
		...mapState({
			hotmoive_data:state=>state.hotMovie.hotmoive_data,
		})
	},
    methods: {
  
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
      	// console.log(val);
        this.currentRow = val;
      },
        handleSelectionChange(val) {
        	console.log(val);
        this.multipleSelection = val;
      }
    }
  }
            
</script>

<style lang="css" scoped>
    
</style>


