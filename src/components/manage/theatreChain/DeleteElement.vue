<template lang="html">
        <div>
            <el-button type="danger" class="el-icon-delete" @click="delmovie"> 移出电影</el-button>
		</div>
</template>

<script>
    import $ from "jquery"; 
    import {mapState} from "vuex";
export default {
     props:["show"],
    computed:{          //在这里引用
         ...mapState({
            ids:state => state.theatreChain.theatreChain_ids
        }) 
    },
    methods: {
       delmovie() {
           if(this.ids.length>0){
               let str="";
                let ids=this.ids.map(function(v){
                    str+=`《${v.cName}》,`;   
                    return v._id
                })

               this.$confirm(`此操作将永久移出 ${str}是否继续?`, '删除？', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:"get",
                        url:"theatres/del",
                        data:{ids:ids},
                        success:function(){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                           this.show();
                        }.bind(this)
                    });
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
                })
           }else{
               this.$message({
                  message: '请至少选择一条数据！',
                  type: 'warning'
                });
           }
            
        }
    }
}
</script>

<style lang="css">
    
</style>
