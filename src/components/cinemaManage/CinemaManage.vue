<template lang="html">
   <div v-bind:style='style'>
        <h1 style='textAlign:center'>注册</h1>
        <InputElement type='text' message='用户名' v-model='username.value' :getAllvalue='getnamevalue' :info='username.info' :mstyle='username.mstyle'></InputElement>
        <InputElement type='password' message='密码' v-model='password.value' :getAllvalue='getpasswordvalue' :info='password.info' :mstyle='password.mstyle'></InputElement>
        <InputElement type='password' message='确认密码' v-model='repassword.value' :getAllvalue='getrepassword' :info='repassword.info' :mstyle='repassword.mstyle'></InputElement>
        <InputElement type='text' message='邮箱' v-model='email.value' :getAllvalue='getemail' :info='email.info' :mstyle='email.mstyle'></InputElement>
        <button :style='btnStyle' @click='formSubmit'>提交</button>
    </div>  
</template>

<script>
import {ajax} from "@/js/tools";
import InputElement from "@/components/InputElement";
export default {
   components:{
        InputElement:InputElement
    },   
   data:function(){
            return{
                style:{
                backgroundColor:"rgba(0, 174, 172, 0.09)",
                width:"312px",
                height:"282px",
                margin:"auto"
            }, 
            btnStyle:{
                width:"78px",
                border:"1px solid #000",
                borderRadius:"3px",
                backgroundColor:"red",
                color:"#fff"
	       },
            username:{
                value:"",
                mstyle:{},
                info:""
            },password:{
                value:"",
                mstyle:{},
                info:""
            }, repassword:{
                value:"",
                mstyle:{},
                info:""
            }, email:{
                value:"",
                mstyle:{},
                info:""
            },formReg:[false,false,false,false]
        }    
    },
    methods:{
        formSubmit:function(){
            for(let i=0;i<this.formReg.length;i++){
                if(!this.formReg[i]){			
                    return;
                }
            }
            ajax({
                type:"post",
                url:"/user/add",
                data:{
                    username:this.username.value,
                    password:this.password.value,
                    email:this.email.value
                },
                success:function(){
                    this.$router.push("login");
                }.bind(this)
            })
	   },
        getnamevalue:function(){
           if(/^\w{6,16}$/.test(this.username.value)){
			ajax({
				type:"get",
				url:"user/find",
				data:{
					username:this.username.value,
					findType:"exact"
				},
				success:(data)=>{
					if(data.length==0){
						this.username={
                                value:this.username.value,
								info:"√",
								mstyle:{color:"green"}
							};
                        this.formReg[0]=true
						return;
					}else{
						this.username={
                                value:"",
								info:"用户名已经存在",
								mstyle:{color:"red"}
						};
					}
				}
			})
		  }
        },
        getpasswordvalue:function(){
           if(/^\d{6,14}$/.test(this.password.value)){
			this.password={
                    value:this.password.value,
					info:"√",
					mstyle:{color:"green"},
			};
			this.formReg[1]=true
		}else{
            this.password={
                    value:"",
					info:"× 6-12位数字",
					mstyle:{color:"red"}
			};
		}
        },
        getrepassword:function(){
		if(this.password.value==this.repassword.value){
			this.repassword={
                    value:this.repassword.value,
					info:"√",
					mstyle:{color:"green"}
				};
			this.formReg[2]=true;
		}else{
			this.repassword={
                    value:"",
					info:"x密码不相同",
					mstyle:{color:"green"}
		      }
	       }console.log(this.formReg);
        },
        getemail:function(){
		if(/^\w+@\w+\.\w{3}$/.test(this.email.value)){
			this.email={
                    value:this.email.value,
					info:"√",
					mstyle:{color:"green"},
				};
			this.formReg[3]=true;
		}else{
			this.email={
                    value:'',
					info:"X 请用正确的邮箱格式",
					mstyle:{color:"green"},
				};
		}console.log(this.formReg);
	}     
    }
}
</script>

<style lang="css">
    
</style>
