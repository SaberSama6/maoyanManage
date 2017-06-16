<template lang="html">
        <div>  <el-table
                :data="tableData"
                border
                style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="cName" label="电影名"></el-table-column>
                <el-table-column prop="eName" label="英文名"></el-table-column>
                <el-table-column prop="type" label="类型"></el-table-column>
                <el-table-column prop="area" label="地区"></el-table-column>
                <el-table-column prop="duration" label="时间"></el-table-column>
              </el-table>
		</div>
</template>

<script>
    import {mapState} from "vuex"; //引入保存的值得话这样写
    import {ajax} from "@/js/tools";
    import store from "@/store/index.js"; //引入store设置store的时候必须引入
    import {SHOW_ONESTUDENT,SHOW_EIT,THEATRECHAIN_DATA,THEATRECHAIN_DELMOVIE} from "@/store/mutations";
   export default {
    data:function(){
        return{
            multipleSelection: []
        }
    },
     props:["show"],
    computed:{          //在这里引用
         ...mapState({
            tableData:state => state.theatreChain.theatreChain_data.rows
        }) 
    },
    methods: {
       handleEdit(row) {
        console.log(this.multipleSelection);
     /*   store.commit(SHOW_ONESTUDENT,row); 
        store.commit(SHOW_EIT,true); //设置store。*/
      },
      handleDelete(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '删除？', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    ajax({
                        type:"post",
                        url:"student/del",
                        data:{_id:row._id},
                        success:function(){
                           this.show();
                        }.bind(this)
                    });
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
            });
      },
    handleSelectionChange(val) {
        this.multipleSelection = val;
        store.commit(THEATRECHAIN_DELMOVIE,val);
      }
    }
  }                 
</script>

<style lang="css" scoped>
    
</style>
