<template lang="html">
	<div>
		<div class="grid-content bg-purple">
			<el-table :data="filmData" border style="width: 100%" @selection-change="choose">
				<el-table-column fixed="left" type="selection"></el-table-column>
				<el-table-column
					:show-overflow-tooltip="true"
					label="电影中文名"
					width= "110"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.cName}}</span>
					</template>
				</el-table-column>

				<el-table-column
					:show-overflow-tooltip="true"
					label="电影英文名"
					width= "110"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.eName}}</span>
					</template>
				</el-table-column>
				<el-table-column
					:show-overflow-tooltip="true"
					label="类型"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.type}}</span>
					</template>
				</el-table-column>
				<el-table-column
					:show-overflow-tooltip="true"
					label="电影评分"
					width= "100"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.score}}</span>
					</template>
				</el-table-column>
				<el-table-column
					:show-overflow-tooltip="true"
					label="演员"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.actors}}</span>
					</template>
				</el-table-column>
				<el-table-column
					:show-overflow-tooltip="true"
					label="想看"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.want}}</span>
					</template>
				</el-table-column>
				<el-table-column
					:show-overflow-tooltip="true"
					label="区域"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.area}}</span>
					</template>
				</el-table-column>
				<el-table-column
					:show-overflow-tooltip="true"
					label="年代(年份)"
					width= "110"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.decade}}</span>
					</template>
				</el-table-column>
				<el-table-column
					:show-overflow-tooltip="true"
					label="时长(分钟)"
					width= "110"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.duration}}</span>
					</template>
				</el-table-column>
				<el-table-column
					:show-overflow-tooltip="true"
					label="上映时间"
					width= "110"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.release}}</span>
					</template>
				</el-table-column>
				<el-table-column
					:show-overflow-tooltip="true"
					label="上映地区"
					width= "110"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.release_area}}</span>
					</template>
				</el-table-column>
				<el-table-column
					:show-overflow-tooltip="true"
					label="票房"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.box_office}}</span>
					</template>
				</el-table-column>
				<el-table-column
					:show-overflow-tooltip="true"
					label="剧情介绍"
					width= "110"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.synopsis}}</span>
					</template>
				</el-table-column>
				<el-table-column
					:show-overflow-tooltip="true"
					label="图集"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.coverImg}}</span>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="80px">
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
	import {FILM_DELDATA,FILM_CHANGEDATA,FILM_DIALOG} from "@/store/mutations";
	export default{
		props:["show"],
		data(){
			return {
				isChoose:[]
			}
		},
		computed:{
			...mapState({
				filmData:state => state.filmManageStore.film_data.rows
			})
			
		},
		methods:{
			handleEdit(index,row){
				console.log(index,row);
				// //根据id查询数据
				ajax({
					url:"filmInfo/find",
					type:"get",
					data:{
						_id:row._id
					},
					success:(data) => {
						store.commit(FILM_CHANGEDATA,data);   //保存需要修改的数据
						store.commit(FILM_DIALOG,true);   //在点击修改按钮时，显示对话框，并填充数据
 					}
				});
			},
			choose(val){
				console.log(val);
				this.isChoose = val;
				store.commit(FILM_DELDATA,this.isChoose);  //保存需要删除的数据
			}
		}
	}
</script>