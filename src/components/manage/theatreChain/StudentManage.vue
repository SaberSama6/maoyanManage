<template lang="html">
        <div>
            <h1>学生管理</h1>
                <SerchEle :show="show"></SerchEle>
                <AddElement :show="show"></AddElement>
                <EitEle></EitEle>
                <TableEle :show="show"></TableEle>
                <PageTurm :show='show'></PageTurm>
		</div>
</template>

<script>
    import {ajax} from "@/js/tools";
    import TableEle from "@/components/student/TableEle";
    import SerchEle from "@/components/student/SerchEle";
    import PageTurm from "@/components/student/PageTurm";
    import AddElement from "@/components/student/AddElement";
    import EitEle from "@/components/student/EitEle";
    import store from "@/store/index.js"; //引入store设置store的时候必须引入
    import {SHOW_DATA,SHOW_STUDENT} from "@/store/mutations";
    import {mapState} from "vuex";
   export default {
    components:{
        TableEle:TableEle,
        SerchEle:SerchEle,
        PageTurm:PageTurm,
        EitEle:EitEle,
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
        data:state => state.studentStore.searchdata,
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
              url:"/student/find",
              data:newdata,
              success:function(data){
                  store.commit(SHOW_DATA,data); //设置store。
                  store.commit(SHOW_STUDENT,data.rows);
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
