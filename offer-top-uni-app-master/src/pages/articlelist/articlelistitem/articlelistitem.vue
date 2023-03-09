
<template>
	<view>
		<view class="card" @click="enterArticleDetail">
			<view class="card-title">
        <slot name="title"></slot>
			</view>
			<view class="card-bottom">
				<view class="classify">
					<slot name="type"></slot>
				</view>
				<view class="feedback">
					<cmd-icon class="cmdicon" type="eye" size="18" color="gray"></cmd-icon>
					<slot name="previewCount"></slot>
					<cmd-icon class="cmdicon" type="heart" size="18" color="gray"></cmd-icon>
					<slot name="likeCount"></slot>
					<cmd-icon class="cmdicon" type="star" size="18" color="gray"></cmd-icon>
					<slot name="collectCount"></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "articlelistitem",
		props: {
			articleId: {
				type: String,
				required: true
			}
		},
		data() {
			return {
			}
		},
		methods: {
			enterArticleDetail () {
				console.log('enterArticleDetail', this.articleId)
				uni.navigateTo({
					url: `../articleDetail/articleDetail?id=${this.articleId}`,
					fail:(e)=>{
						console.log('fail', e)
					},
				})
			}
		},
	}
</script>

<style>
	.card {
		background-color: #FFFFFF;
		margin: 30rpx;
		padding: 30rpx 20rpx;
		border-radius: 10rpx;
	}
	.classify {
		background-color: #0081FF;
		color: #ffffff;
		float: left;
		padding: 5rpx;
		border-radius: 10rpx;
	}
	.feedback {
		float: right;
	}
	.card-bottom {
		overflow: hidden;
		margin-top: 30rpx;
	}
	.lg {
		margin-left: 10rpx;
	}
	.lg text {
		margin-left: 10rpx;
	}
	.cmdicon {
		margin-left: 5rpx;
	}
</style>
