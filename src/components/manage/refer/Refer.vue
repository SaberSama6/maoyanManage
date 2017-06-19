
<template lang="html">
   <div>
   <h1>资讯</h1>
 <el-row>
  <el-col :span="15">
  <div class="grid-content bg-purple-light">
  	<SearchElement :show="show"></SearchElement>
  </div>
  </el-col>
  <el-col :span="2">
  <div class="grid-content bg-purple-light">
  	<AddElement :show="show"></AddElement>
  </div>
  </el-col>
  <el-col :span="3"><div class="grid-content bg-purple-light">
  	<DeleteElement :show="show"></DeleteElement>
  </div>
  </el-col>
   <el-col :span="2"><div class="grid-content bg-purple-light">
  	<!-- <EditElement :show="show"></EditElement> -->
  </div>
  </el-col>
</el-row>

<TableElement ></TableElement>
<PageElement :show="show"></PageElement>
 <EditElement :show="show"></EditElement>
    </div>  
</template>

<script>
import TableElement from "./TableElement";
import SearchElement from "./SearchElement";
import AddElement from "./AddElement";
import EditElement from "./EditElement";
import DeleteElement from "./DeleteElement";
import PageElement from "./PageElement";
import{ajax} from "@/js/tools";
import store from "@/store";
// import {mapState} from "vuex";
import {REFER_SHOWDATA} from "@/store/mutations";
export default{
	components:{
  	TableElement,
  	SearchElement,
  	AddElement,
  	EditElement,
  	DeleteElement,
  	PageElement


  },
   created:function(){

    	let obj = {
    		page:1,
    		rows:5
    	};
    	this.show(obj);
    },
  methods:{
  	  	show:function(obj){

	        	ajax({
	            type:"get",
	            url:"/refer/find",
	            data:obj,
              cache: true,
	            success:function(data){
	 			store.commit(REFER_SHOWDATA,data);
	        	}.bind(this)
	        })
	  },
  }
}
            
</script>

<style lang="css" scoped>
  .bg-purple-light {
    background: #e5e9f2;
  }
</style>
