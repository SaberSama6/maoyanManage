<template lang="html">
	<div>
		<div class="grid-content bg-purple">
			<el-table :data="cinemaData" border style="width: 100%" @selection-change="choose">
				<el-table-column type="selection"></el-table-column>
				<el-table-column
					:show-overflow-tooltip="true"
					label="院线名"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.cinema}}</span>
					</template>
				</el-table-column>

				<el-table-column
					:show-overflow-tooltip="true"
					label="地址"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.address}}</span>
					</template>
				</el-table-column>
				<el-table-column
					:show-overflow-tooltip="true"
					label="电话"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.phone_num}}</span>
					</template>
				</el-table-column>
				<el-table-column
					:show-overflow-tooltip="true"
					label="官方网站"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.official_website}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
					    <el-button
					        size="small"
					        type="primary"
					        @click="handleEdit(scope.$index, scope.row)" >修改</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
	import {ajax} from "@/js/tools";
	import store from "@/store";
	import {mapState} from "vuex";
	import {CINEMA_DELDATA,CINEMA_CHANGEDATA,CINEMA_DIALOG} from "@/store/mutations";
	export default{
		props:["show"],
		data(){
			return {
				isChoose:[]
			}
		},
		computed:{
			...mapState({
				cinemaData:state => state.cinemaStore.cinema_data.rows
			})
			// ...mapState({
			// 	cinemaData:state => {
			// 		// console.log("ciema_data:",state.cinemaStore);
			// 		// return state.cinemaStore.cinema_data.rows}
			// })
		},
		methods:{
			choose(val){
				this.isChoose = val;
				store.commit(CINEMA_DELDATA,this.isChoose);   //提交需要删除的数据【可能会有多条】
			},
			handleEdit(index,row){
				console.log(index,row);
				ajax({
					url:"/cinemaInfo/find",
					type:"get",
					data:{
						_id:row._id
					},
					success:(data) => {
						console.log(data);
						store.commit(CINEMA_CHANGEDATA,data);
						store.commit(CINEMA_DIALOG,true);
					}
				});
			}
		}
	}
</script>