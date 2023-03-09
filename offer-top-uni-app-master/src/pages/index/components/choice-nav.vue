<template>
	<view class="grid margin-bottom text-center col-3 choice-background">
		<view :class="item.className" v-for="(item,index) in choiceList" :key="index" @click="turnToArticleList(item.type)">
			<image :src="item.imageSrc" mode="aspectFit"></image>
			<text>{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "choice-nav",
		data() {
			return {
				choiceList: [
					{
						className: "choice-item",
						imageSrc: "../../../static/html5.png",
						name: "HTML",
						type: "HTML"
					},
					{
						className: "choice-item",
						imageSrc: "../../../static/css3.png",
						name: "CSS",
						type: "CSS"
					},
					{
						className: "choice-item",
						imageSrc: "../../../static/js.png",
						name: "JavaScript",
						type: "JS"
					}
				],
				choiceId: null
			}
		},
		methods: {
		  turnToArticleList(name) {
				// 点击那个分类，就将name传进来，并筛选出对应的id
				let currentId = this.choiceId.filter( item => item.name == name);
				// 跳转页面并携带改分类id给文章列表
			  uni.navigateTo({
				  url: `../articlelist/articlelist?id=${currentId[0]._id}`
			  })
		  }
	  },
		created() {
			// 请求分类列表
			this.$request({
				url: '/category/getCategoryList'
			}).then(value => {
			  this.choiceId = value.data;
			})
		}
	}
</script>

<style>
	.choice-background {
		background-color: #ffffff;
	}
	.choice-item {
		padding: 30rpx;
		border: 1px solid #f1f1f1;
	}
	.choice-item image{
		display: block;
		width: 130rpx;
		height: 150rpx;
		margin: 0 auto;
		margin-bottom: 10rpx;
	}
</style>
