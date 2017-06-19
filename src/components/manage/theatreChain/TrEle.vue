<template lang="html">
        <tr>
            <td style='border:1px solid #000;textAlign:center'>{{student.name}}</td>
            <td style='border:1px solid #000;textAlign:center'>{{this.student.age}}</td>
            <td style='border:1px solid #000;textAlign:center'>{{this.student.gender}}</td>
            <td style='border:1px solid #000;textAlign:center'>{{this.student.phone}}</td>
            <td style='border:1px solid #000;textAlign:center'>{{this.student.address}}</td>
            <td style='border:1px solid #000;textAlign:center'>
                <button @click='xiugai'>修改</button>
                <button @click='remove'>删除</button>
            </td>
        </tr>
</template>

<script>
import {ajax} from "@/js/tools";
import store from "@/store/index.js"
import {SHOW_ONESTUDENT} from "@/store/mutations";
export default {
    props:["student","show","update"],
    data:function(){
        return{
            value:"",
            student:{
                name:"",
            }
        }
    },
    methods:{
         remove:function(){
            ajax({
            type:"post",
            url:"student/del",
            data:{_id:this.student._id},
            success:function(){
               this.show();
            }.bind(this)
        })
        },
        xiugai:function(){
           store.commit(SHOW_ONESTUDENT,this.student);
        }
    }
};
</script>

<style lang="css">
    
</style>
