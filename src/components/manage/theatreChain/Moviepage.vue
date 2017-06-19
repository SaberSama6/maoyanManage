<template lang="html">
        <div class="mydiv">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="7"
              layout="prev, pager, next, jumper"
              :total="data.total">
            </el-pagination>
        </div>
</template>

<script>
    import {mapState} from "vuex";
    import store from "@/store/index.js";
    import {THEATRECHAIN_PAGE} from "@/store/mutations";
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
              this.page=val;
            this.open(val);
          }
        },
      computed:{
        ...mapState({
             data:state => state.theatreChain.theatreChain_allMovie,
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
