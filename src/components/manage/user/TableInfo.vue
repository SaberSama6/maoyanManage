<template lang="html">
	<div>
		<div class="grid-content bg-purple">
			<el-table :data="userData" border style="width: 100%" @selection-change="choose">
				<el-table-column type="selection"></el-table-column>
				<el-table-column
					label="用户名"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.username}}</span>
					</template>
				</el-table-column>

				<el-table-column
					label="邮箱"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.email}}</span>
					</template>
				</el-table-column>
				<el-table-column
					label="生日"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.birthday}}</span>
					</template>
				</el-table-column>
				<el-table-column
					label="手机号"
				>
					<template scope="scope">
					    <span style="margin-left: 10px">{{ scope.row.phone}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="140px">
					<template scope="scope">
					    <el-button
					        size="small"
					        @click="handleEdit(scope.$index, scope.row)" >修改</el-button>
					</template>
				</el-table-column>
			</el-table>
	</div>
	</div>
</template>
<script>
	import {ajax} from "@/js/tools";
	import {USER_DELDATA,USER_CHANGEDATA} from "@/store/mutations";
	import {mapState} from "vuex";
	import store from "@/store";
	export default{
		data:function(){
			return {
				isChoose:[]
			}
		},
		computed:{
			...mapState({
				userData:state => state.userStore.user_data.rows
			})
		},
		methods:{
			handleEdit(index,row){
				console.log(index,row);
				//保存需要修改的数据
				// store.commit(USER_CHANGEDATA,);
			},
			choose(val){
				this.isChoose = val;
				store.commit(USER_DELDATA,this.isChoose);  //保存需要删除的数据
			}
		}
	}
</script>