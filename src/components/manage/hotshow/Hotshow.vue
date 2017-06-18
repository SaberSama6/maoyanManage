
<template lang="html">
   <div>
   <h1>即将上映</h1>
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
  <el-col :span="2"><div class="grid-content bg-purple-light">
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
	 			// this.tableData=data;
	 			// console.log(data);
        // console.log(window.localStorage);
        // window.localStorage = data;
        // var str = JSON.stringify(data)
        //  localStorage.setItem("temp2", str);
        //  console.log(window.localStorage);
        //  var obj = JSON.parse(window.localStorage.temp2);
        //  console.log(obj.rows)
	 			store.commit(HOTMOIVE_SHOWDATA,data);
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
