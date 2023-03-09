<template>
	<view class="browse">
		<swiper class="swiper-box" duration="300" circular="circular" current="current" vertical="true" @animationfinish="swiperChange">
			<swiper-item v-if="objList[0].id" :item-id="objList[0].index">
				<rich-text class="content-box" object-fit="contain" :nodes="objList[0].content"></rich-text>
			</swiper-item>
			<swiper-item v-if="objList[1].id" :item-id="objList[1].index">
				<rich-text class="content-box" object-fit="contain" :nodes="objList[1].content"></rich-text>
			</swiper-item>
			<swiper-item v-if="objList[2].id" :item-id="objList[2].index">
				<rich-text class="content-box" object-fit="contain" :nodes="objList[2].content"></rich-text>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				circular: false, // 到末尾是否回到开头
    			current: 0, // 当前的位置
				objList: { 
					0: {},
					1: {},
					2: {}
				},
			}
		},
		onLoad(e) {
			this.pageStatus = 0 // 页面初始化状态
			this.dataList = [] // 渲染的视频
			this.curIndex = 0 // 当前视频的位置
		},
		onReady() {
			console.log('*****')
			uni.getStorage({
				key: 'user',
				success: (res) => {
					this.info = res.data
					this.getDetails();
				},
			})
			// 获取列表
		},
		methods: {
			// swiper切换
  			swiperChange(e) {
				if (e.detail.source == "touch") {
					// 旧的滑块位置
					const oldCurrent = this.current
					// 当前滑块的位置
					const current = e.detail.current
					if (oldCurrent === current) return;
					this.current = current;
					// 当前视频在列表中的索引
					this.curIndex = parseInt(e.detail.currentItemId)
					if(e.detail.current === 0 && oldCurrent === 2) {
						this.getDetails(this.objList[oldCurrent]._id)
					} else if(e.detail.current === 2 && oldCurrent === 0) {
						this.getDetails()
					} else {
						this.lazyContent()
					}
				}
			},
			// 加载
			lazyContent() {
				const dataList = this.dataList // 渲染的数组
				const curIndex = this.curIndex // 当前播放的视频在数组里的索引
				const current = this.current // 滑块位置
				const lastData = dataList[curIndex - 1] || {}
				const lastTwoData = dataList[curIndex - 2] || {}
				const nowData = dataList[curIndex] || {}
				const nextData = dataList[curIndex + 1] || {}
				const nextTwoData = dataList[curIndex + 2] || {}
				if (curIndex == 0) {
					this.circular = false
					this.objList['0'] = nowData
					this.objList['1'] = nextData
					this.objList['2'] = nextTwoData
				} else if (curIndex == dataList.length - 1) {
					this.circular = false
					this.objList['0'] = lastTwoData
					this.objList['1'] = lastData
					this.objList['2'] = nowData
				} else {
					if (current == 0) {
						this.circular = true
						this.objList['0'] = nowData
						this.objList['1'] = nextData
						this.objList['2'] = lastData
					}
					if (current == 1) {
						this.circular = true
						this.objList['0'] = lastData
						this.objList['1'] = nowData
						this.objList['2'] = nextData
					}
					if (current == 2) {
						this.circular = true
						this.objList['0'] = nextData
						this.objList['1'] = lastData
						this.objList['2'] = nowData
					}
				}
			},
			async getDetails(articleId) {
				const {_id} = this.info
				let res = await this.$request({
				    url: `/article/recommend/${_id}/${articleId ? articleId : ''}`,
				    method:'GET',
				});
				this.dataList = [{...res.data.previousArticle, id: true, index: 0}, {...res.data, id: true, index: 1}, {...res.data.nextArticle, id: true, index: 2}]
				console.log('@@@@@')
				this.lazyContent();
				// 第一次播放
				if (this.pageStatus == 0) {
					// 第一次初始化加载完毕
					this.pageStatus = 1
					// 滑块位置
					const current = this.current
				}
			},
		}
	}
</script>

<style>
.browse {
  width: 100vw;
  height: 100vh;
  position: relative;
  color: #fff;
}

.browse .swiper-box {
  width: 100vw;
  height: 100vh;
}

.browse .swiper-box .content-box {
  display: block;
  height: 90vh;
  color: #000;
  margin: 10px 20px;
  word-break: break-all;
  overflow-y: auto;
}
</style>

