<template lang="html">
        <div class="mydiv">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="page"
              :page-size="5"
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
                
            }
       },
       props:['show'],
       methods: {
          handleSizeChange(val) {
            store.commit(THEATRECHAIN_PAGE,val);
            this.show();
          },
          handleCurrentChange(val) {
            store.commit(THEATRECHAIN_PAGE,val);
            this.show();
          }
        },
      computed:{
        ...mapState({
             page:state => state.theatreChain.theatreChain_page,
             data:state => state.theatreChain.theatreChain_data,
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
