<template lang="html">
        <div>
            <h1>院线匹配</h1>
                    <el-col :span="15"><div class="grid-content"><SerchEle :show="show"></SerchEle></div></el-col>
                  <el-col :span="3"><div class="grid-content"><AddElement :show="show"></AddElement></div></el-col>
                  <el-col :span="3"><div class="grid-content"><DeleteElement  :show="show"></DeleteElement></div></el-col>
                <el-col :span="3"><div class="grid-content"><WhichCinema :show="show"></WhichCinema></div></el-col>
                <TableEle :show="show"></TableEle>
                <PageTurm :show='show'></PageTurm>
		</div>
</template>

<script>
    import {ajax} from "@/js/tools";
    import TableEle from "@/components/manage/theatreChain/TableEle";
    import SerchEle from "@/components/manage/theatreChain/SerchEle";
    import PageTurm from "@/components/manage/theatreChain/PageTurm";
    import AddElement from "@/components/manage/theatreChain/AddElement";
    import DeleteElement from "@/components/manage/theatreChain/DeleteElement";
    import WhichCinema from "@/components/manage/theatreChain/WhichCinema";
    import store from "@/store/index.js"; //引入store设置store的时候必须引入
    import {THEATRECHAIN_DATA} from "@/store/mutations";
    import {mapState} from "vuex";
    export default {
    components:{
        TableEle:TableEle,
        DeleteElement:DeleteElement,
        SerchEle:SerchEle,
        PageTurm:PageTurm,
        WhichCinema:WhichCinema,
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
        page:state => state.theatreChain.theatreChain_page,
        data:state => state.theatreChain.theatreChain_serch,
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
              data:newdata,
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
		color: rgba(32, 160, 255, 0.75);
        margin:0 0 30px 0;
        padding:30px 0 30px 10px;
		box-shadow: 0 0 10px rgb(105, 187, 250);
    }
</style>


