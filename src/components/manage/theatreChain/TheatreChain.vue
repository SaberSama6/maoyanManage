<template lang="html">
        <div>
            <h1>院线匹配</h1>
                <el-row :gutter="0">
                    <el-col :span="16"><div class="grid-content"><SerchEle :show="show"></SerchEle></div></el-col>
                </el-row>
                <el-row :gutter="0">
                  <el-col :span="3"><div class="grid-content"><AddElement :show="show"></AddElement></div></el-col>
                  <el-col :span="3"><div class="grid-content"><DeleteElement></DeleteElement></div></el-col>
                <el-col :span="3"><div class="grid-content"><AddElement :show="show"></AddElement></div></el-col>
                  <el-col :span="3"><div class="grid-content"><DeleteElement></DeleteElement></div></el-col>
               </el-row>
                <TableEle :show="show"></TableEle>
		</div>
</template>

<script>
    import {ajax} from "@/js/tools";
    import TableEle from "@/components/manage/theatreChain/TableEle";
    import SerchEle from "@/components/manage/theatreChain/SerchEle";
    import PageTurm from "@/components/manage/theatreChain/PageTurm";
    import AddElement from "@/components/manage/theatreChain/AddElement";
    import DeleteElement from "@/components/manage/theatreChain/DeleteElement";
    import EitEle from "@/components/manage/theatreChain/EitEle";
    import store from "@/store/index.js"; //引入store设置store的时候必须引入
    import {THEATRECHAIN_DATA} from "@/store/mutations";
    import {mapState} from "vuex";
   export default {
    components:{
        TableEle:TableEle,
        DeleteElement:DeleteElement,
        SerchEle:SerchEle,
        /*PageTurm:PageTurm,
        EitEle:EitEle,*/
        AddElement:AddElement,
    },
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        }
    }},
    created(){
        this.show();
    },
    computed:{
        ...mapState({
        page:state => state.studentStore.page,
        data:state => state.theatreChain.theatreChain_data,
        })
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      show:function(){
          let newdata=Object.assign({page:this.page,rows:5,},this.data);
            ajax({
              type:"get",
              url:"/theatres/find",
              data:{
                  page:1,
                  rows:5
              },
              success:function(data){
                  store.commit(THEATRECHAIN_DATA,data); //设置store。
             }
           });
        }
    }
  }                 
</script>

<style lang="css" scoped>
    h1{
        margin:0;
        padding:60px 0;
    }
</style>


