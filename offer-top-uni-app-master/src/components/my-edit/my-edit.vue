<template>
	<view class="container" :style="{
		paddingBottom: showMoreTool ? '220rpx' : '120rpx'
	}"> 
		 <editor
		 	class="ql-container margin-top:40rpx"
		 	:placeholder="placeholder"
		 	:show-img-size="true"
		 	:show-img-toolbar="true"
		 	:show-img-resize="true"
		 	@ready="onEditorReady"
		 	id="editor"
		 	@statuschange="statuschange"
		 	@focus="editFocus" 
		 	@blur="editBlur"
		 	ref="editot"
		 ></editor> 
		<!-- 操作工具 -->
		<view class="tool-view" > 
			<view class="tool">
				<editIcon class="single" type="&#xe6f3;" font-size="44rpx" title="插入图片" @click="insertImage"></editIcon>
				<editIcon class="single" type="&#xe6f9;" font-size="44rpx" title="修改文字样式" @click="showMore" :color="showMoreTool ? activeColor : '#666666'"></editIcon>
				<editIcon class="single" type="&#xe6eb;" font-size="44rpx" title="分割线" @click="insertDivider"></editIcon>
				<editIcon class="single" type="&#xe6e8;" font-size="44rpx" title="撤销" @click="undo"></editIcon>
				<editIcon class="single" type="&#xe705;" font-size="44rpx" title="重做" @click="redo"></editIcon>
				<editIcon class="single" type="&#xeb8a;" font-size="44rpx" title="设置" @click="showSetting"></editIcon>
			</view>
			<!-- 文字相关操作 -->
			<view class="font-more" :style="{ height: showMoreTool ? '90rpx' : 0 }">
				<editIcon class="single" type="&#xe6e7;" font-size="44rpx" title="加粗" @click="setBold" :color="showBold ? activeColor : '#666666'"></editIcon>
				<editIcon class="single" type="&#xe6fe;" font-size="44rpx" title="斜体" @click="setItalic" :color="showItalic ? activeColor : '#666666'"></editIcon>
				<editIcon class="single" type="&#xe6f8;" font-size="44rpx" title="分割线" @click="setIns" :color="showIns ? activeColor : '#666666'"></editIcon>
				<editIcon class="single" type="&#xe6e3;" font-size="44rpx" title="标题" @click="setHeader" :color="showHeader ? activeColor : '#666666'"></editIcon>
				<editIcon class="single" type="&#xe6f1;" font-size="44rpx" title="居中" @click="setCenter" :color="showCenter ? activeColor : '#666666'"></editIcon>
				<editIcon class="single" type="&#xe6ed;" font-size="44rpx" title="居右" @click="setRight" :color="showRight ? activeColor : '#666666'"></editIcon>
			</view>
			<view class="setting-layer-mask" v-if="showSettingLayer" @click="showSetting"></view>
			<view class="setting-layer" v-if="showSettingLayer">
				<view class="single" @click="release">
					<editIcon class="icon" type="&#xe639;" ></editIcon>
					<view>确认发布</view>
				</view>
			</view>
		</view>
		 
	</view>
</template>

<script>
import editIcon from './edit-icons.vue';
import InspireCloud from '../../util/inspirecloud-mp.min.js'
//import themeImage from '../../static/theme.png'
const serviceId ='qcveq1'
const fileUploadToken = '0f596c19-f3a1-4f8f-801e-620bcf8f7b9a'
const inspirecloud = new InspireCloud({serviceId})
export default {
	props: {
		// 点击图片时显示图片大小控件
		showImgSize: {
			type: Boolean,
			default: false
		},
		// 点击图片时显示工具栏控件
		showImgToolbar: {
			type: Boolean,
			default: false
		},
		// 点击图片时显示修改尺寸控件
		showImgResize: {
			type: Boolean,
			default: false
		},
		// 占位符
		placeholder: {
			type: String,
			default: '开始输入...'
		},
		// 图片上传的地址
		uploadFileUrl: {
			type: String,
			default: '#'
		},
		// 上传文件时的name
		fileKeyName: {
			type: String,
			default: 'file'
		},
		// 上传图片时，http请求的header
		header: {
			type: Object
		},
		// 初始化html
		html: {
			type: String
		}
	},
	computed:{
		
	},
	data() {
		return {
			//themeImage: themeImage,
			showMoreTool: false,
			showBold: false,
			showItalic: false,
			showIns: false,
			showHeader: false,
			showCenter: false,
			showRight: false,
			showSettingLayer: false,
			activeColor: '#00aaff'
		};
	},
	components: {
		editIcon
	},
	created() {
		
	},
	methods: {
		onEditorReady(e) {
			uni.createSelectorQuery()
				.in(this)
				.select('.ql-container')
				.fields({
					size: true,
					context: true
				},res => {
					this.editorCtx = res.context;
					this.editorCtx.setContents({
						html: this.htmls
					})
				})
				.exec();
		},
		undo() {
			this.editorCtx.undo();
		},
		// 插入图片
		insertImage() {
			uni.chooseImage({
				count: 9, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择
				success: async(res) => {
					var tempFilePaths = res.tempFilePaths;
					uni.showLoading({
						title: '正在上传中...'
					})
					for (let temp of tempFilePaths) {
						// 图片上传服务器
						const file = {
							path: temp
						}
						//console.log(temp)
						//console.log()
						inspirecloud.file.upload(this.fileKeyName, file, {token: fileUploadToken})
							.then((data) => {
								console.log(data.url)
								this.editorCtx.insertImage({
									src: data.url,  // 此处需要将图片地址切换成服务器返回的真实图片地址
									alt: '图片',
									success: function(e) {console.log('插入图片')}
								});
								uni.hideLoading()
							})
							.catch((error) => {
								console.log(error)
							})
						console.log('debug')
						// await uni.uploadFile({
						// 	url: this.uploadFileUrl,
						// 	filePath: temp,
						// 	name: this.fileKeyName,
						// 	header: this.header,
						// 	success: res => {
						// 		// 上传完成后处理
						// 		this.editorCtx.insertImage({
						// 			src: 'https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qcveq1/3b9cc276b9afd0d7_1629456541658.png',  // 此处需要将图片地址切换成服务器返回的真实图片地址
						// 			alt: '图片',
						// 			success: function(e) {console.log('插入图片')}
						// 		});
						// 		uni.hideLoading()
						// 	},
							
						// });
					}
				}
			});
		},
		insertDivider() {
			this.editorCtx.insertDivider();
		},
		redo() {
			this.editorCtx.redo();
		},
		showMore() {
			this.showMoreTool = !this.showMoreTool;
			this.editorCtx.setContents()
		},
		setBold() {
			this.showBold = !this.showBold;
			this.editorCtx.format('bold');
		},
		setItalic() {
			this.showItalic = !this.showItalic;
			this.editorCtx.format('italic');
		},
		checkStatus(name, detail, obj) {
			if (detail.hasOwnProperty(name)) {
				this[obj] = true;
			} else {
				this[obj] = false;
			}
		},
		statuschange(e) {
			var detail = e.detail;
			this.checkStatus('bold', detail, 'showBold');
			this.checkStatus('italic', detail, 'showItalic');
			this.checkStatus('ins', detail, 'showIns');
			this.checkStatus('header', detail, 'showHeader');
			if (detail.hasOwnProperty('align')) {
				if (detail.align == 'center') {
					this.showCenter = true;
					this.showRight = false;
				} else if (detail.align == 'right') {
					this.showCenter = false;
					this.showRight = true;
				} else {
					this.showCenter = false;
					this.showRight = false;
				}
			} else {
				this.showCenter = false;
				this.showRight = false;
			}
		},
		setIns() {
			this.showIns = !this.showIns;
			this.editorCtx.format('ins');
		},
		setHeader() {
			this.showHeader = !this.showHeader;
			this.editorCtx.format('header', this.showHeader ? 'H2' : false);
		},
		setCenter() {
			this.showCenter = !this.showCenter;
			this.editorCtx.format('align', this.showCenter ? 'center' : false);
		},
		setRight() {
			this.showRight = !this.showRight;
			this.editorCtx.format('align', this.showRight ? 'right' : false);
		},
		showSetting() {
			this.showSettingLayer = !this.showSettingLayer;
		},
		async editFocus() {
			
		},
		editBlur() {
			
		},
		release() {
			this.showSettingLayer = false;
			// let res = this.$request({
            //         url:'',
            //         method:'POST',
            //         data:''
            //     })
			this.editorCtx.getContents({
				success: res => {
					console.log(res.html) //
					this.$emit('editOk', res);
				},
				fail: res => {
					console.log('fail')
				} 
			})
		},
	}
};
</script>

<style scoped>
.container {
	/* padding: 30rpx 0; */
	box-sizing: border-box;
	padding-bottom: 120rpx;
	background-color: #FFFFFF;
}

.ql-container {
	line-height: 160%;
	font-size: 34rpx;
	width: calc(100% - 60rpx); 
	height: auto;
	margin: 0 auto;
	/* background-color: aliceblue; */
	padding: 10px;
	border: 1px solid;
	border-radius: 5px;
	background-color: aliceblue;
	box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
	/* background-image: {themeImage} */
	
	
	} 
.tool-view{
	width: 100vw;
	/* position: fixed; */
	bottom: 0;
	left: 0;
	
}
.tool {
	height: 100rpx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	background: #FFFFFF;
}

.font-more {
	position: absolute;
	left: 0;
	bottom: 100rpx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	background: #FFFFFF;
	/* background: rgb(235, 235, 235); */
	overflow: hidden;
	transition: all 0.15s;
}

.setting-layer {
	position: absolute;
	bottom: 100rpx;
	background: #fff;
	width: 250rpx;
	right: 20rpx;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	border-radius: 8rpx;
}
.setting-layer .single {
	height: 80rpx;
	font-size: 32rpx;
	padding: 0 30rpx;
	display: flex;
	align-items: center;
	line-height: 80rpx;
	flex-direction: row;
	color: #666;
}
.setting-layer .single .icon {
	margin-right: 20rpx;
}
.setting-layer-mask{
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	background: transparent; 
}
</style>
