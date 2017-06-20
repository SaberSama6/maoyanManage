
<template lang="html">
   <div>
   <h1>热映电影</h1>
 <el-row>
  <el-col :span="15">
  <div class="grid-content bg-purple-light">
  	<SearchElement :show="show"></SearchElement>
  </div>
  </el-col>
  <el-col :span="3">
  <div class="grid-content bg-purple-light">
  	<AddElement :show="show"></AddElement>
  </div>
  </el-col>
  <el-col :span="3"><div class="grid-content bg-purple-light">
  	<DeleteElement :show="show"></DeleteElement>
  </div>
  </el-col>
</el-row>

<TableElement ></TableElement>
<PageElement :show="show"></PageElement>

    </div>  
</template>

<script>
import TableElement from "./TableElement";
import SearchElement from "./SearchElement";
import AddElement from "./AddElement";
import DeleteElement from "./DeleteElement";
import PageElement from "./PageElement";
import{ajax} from "@/js/tools";
import store from "@/store";
import {mapState} from "vuex";
import {HOTMOIVE_SHOWDATA} from "@/store/mutations";
import {HOTMOIVE_SEARCH} from "@/store/mutations";
export default{
	components:{
  	TableElement,SearchElement,
  	AddElement,DeleteElement,
  	PageElement


  },
   created:function(){

    	let obj = {
    		page:1,
    		rows:5
    	};
      store.commit(HOTMOIVE_SEARCH,"");
    	this.show(obj);

    },
  methods:{
  	  	show:function(obj){

	        	ajax({
	            type:"get",
	            url:"/hotMovie/find",
	            data:obj,
              cache: true,
	            success:function(data){
	 			store.commit(HOTMOIVE_SHOWDATA,data);
	        	}.bind(this)
	        })
	  },
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
