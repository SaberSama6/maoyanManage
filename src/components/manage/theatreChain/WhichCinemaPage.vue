<template lang="html">
        <div class="mydiv">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="data.length">
            </el-pagination>
        </div>
</template>

<script>
    import {mapState} from "vuex";
    export default {
       data(){
           return{
                page:1
            }
       },
       props:['open'],
       methods: {
          handleSizeChange(val) {	
            this.page=val;
            this.open(val);
          },
          handleCurrentChange(val) { 
			   console.log(this.data);
              this.page=val;
            this.open(val);
          }
        },
      computed:{
        ...mapState({
             data:state => state.theatreChain.theatreChain_whichdata,
        })
      }
    };
</script>

<style lang="css" scoped>
    .mydiv{
        display:inline-block;
        margin:30px 0 0 30%;
    }
</style>
