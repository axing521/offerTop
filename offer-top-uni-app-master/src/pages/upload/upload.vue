<template>
    <view class="container" >
		<!-- :style="{
			paddingTop:'120rpx'
		}" -->
		
	<view class ="card">
		
	<form>
	
	 <view class="cu-form-group margin-top "> 
	 <view class="cuIcon-titles text-blue title">标题</view> 
	 <input  @input="onInputTitle" placeholder="请输入..."></input> 
	 </view>
	
	
	<view class="cu-form-group margin-top"> 
		<view class=" cuIcon-titles title text-orange">标签</view>
		<picker @change="bindPickerChange" :range ="array" >
                    
                    <view class ="picker text-align:inherit">{{array[catogoryindex]}}</view>
                </picker> 
				</view>
	<view class="margin-top ">
	
	<my-edit class="padding-top" :placeholder="placeholder"  @editOk="editOk"></my-edit>
	</view>
	</form>
	<!-- <view class="pad2">
		
		</view> -->
	</view>
	
	</view>
	
        <!-- <view class="display: flex; justify-conten:flex-start">
            <view class="uploadTitle">
                <input placeholder="我是标题输入框" @input="onInputTitle" id="fileupload"/>
            </view>
            <view class="uni-form-item uni-column uploadTag">
                <picker @change="bindPickerChange" :range ="array">
                    <label>我是选择框：  </label>
                    <label>{{array[index]}}</label>
                </picker>
            </view >
            
        </view> -->
        
    
</template>

<script>
	import myEdit from '../../components/my-edit/my-edit.vue'
    export default {
        components:{
			myEdit,
        },
		created() {
			let _this = this;
			uni.getStorage({
				key: "user",
				// 成功则发送请求
				success(res) {
					_this.userId = res.data._id
				}
			})
		},
        data() {
            return {
                array: ['--请选择--','HTML','CSS','JavaScript','Vue'],
				catogory: {'HTML':'61190d163b823e024d639c41','CSS':'61190d0b582bee02368944d5','JS':'61190cf0582bee02368944d2','JavaScript':'61190cf0582bee02368944d2'},
                catogoryindex: 0,
                color: {
					r: 255,
					g: 0,
					b: 0,
					a: 0.6
				},
				placeholder: '输入详细内容',
                title:'',
                content:{

                },
				userId: ''
            }
        },
        methods: {
            onInputTitle: function(e) {
                this.title = e.detail.value
                console.log(this.title)
            },
            bindPickerChange: function(e) {
                this.catogoryindex = e.target.value
                this.jg = this.array[this.catogoryindex]
                //console.log("选择了", this.jg)
            },
            // uploadContent: function() {
            //     this.content.title = ''
            //     this.content.tag = this.jg
            //     this.content.html = this.html
            //     console.log(this.content)
            // },
			editOk(res) {
				//name, content, type, classifyId, labelId, userId
				if(this.title.length==0){
					uni.showToast({
					    icon:'error',
					    title:'标题为空'
					})
					return 
				}
				if(this.catogoryindex == 0){
					uni.showToast({
					    icon:'error',
					    title:'类别未选择'
					})
					return 
				}
                this.content.name = this.title
                this.content.type = 2
                this.content.content = res.html
				this.content.classifyId = this.catogory[this.jg]
				this.content.labelId = 0
				this.content.userId = this.userId
                //res是一个对象 res.text就是没有html格式的内容
                console.log(this.content)
				
                this.$request({
                    url:'/article/addArticle/',
                    method:'POST',
                    data:this.content,
					success: (res) => {
						console.log(res)
					}
                }).then(value => {
					//console.log("返回",value)
					if(value.statusCode !== 200) {
					    uni.showToast({
					        icon:'error',
					        title:'提交失败'
					    })
					} else {
						uni.showToast({
							icon:'success',
							title:'提交成功'
						})
					}
					uni.navigateTo({
					            // url: 'test?id=1&name=uniapp'  c传递参数
					
					            url:"/pages/login/login"
					
					        })
				})
				//console.log(response)
                
                
            }
		}
    }
</script>

<style>
    /* @import "./editor.css"; */
    .container {

        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
		/* opacity: 0.6;
        background: url('https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qcveq1/3b9cc276b9afd0d7_1629456541658.png') no-repeat left top;
 */
    }
	.pad {
		height: 120rpx;
		width: 100%;
		background-color: #0081FF;
		opacity: 0.8;
	}
	.pad2 {
		height: 320rpx;
		width: 100%;
		background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
		color: #ffffff;
		opacity: 0.8;
		position: fixed;
		bottom: 0;
		left: 0;
	}
	.card {
		/* margin: 20px; */
		border-radius: 5px;
		box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
		position: relative;
		opacity: 1;
		 
	}
	
    .uploadTitle {
        background-color: #ffff;
        border: 1px solid gray;
        /* padding: 0 15px; */
        display: block;
        font-size: 14px;
        position: relative;
        /* margin: 20px; */
        max-width: 200px;
        flex-wrap: wrap;
        border-radius: 5px;
       
    }
    .uploadTag {
        background-color: #ffff;
        border: 1px solid gray;
        padding: 0 15px;
        display: block;   
        font-size: 14px;
        position: relative;
        margin: 20px;
        max-width: 200px;
        flex-wrap: wrap;
        border-radius: 5px;
		
    }

</style>