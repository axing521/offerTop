<template>
	<view>
		<swiper  class="screen-swiper round-dot" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<view class="uni-swiper-wrapper">
				<view class="uni-swiper-slide-frame">
					<swiper-item><image src="../../../static/todytop.png" mode=""></image></swiper-item>
					<swiper-item><image src="../../../static/todytop2.png" mode=""></image></swiper-item>
					<swiper-item><image src="../../../static/todytop.png" mode=""></image></swiper-item>
					<swiper-item><image src="../../../static/todytop2.png" mode=""></image></swiper-item>
					<swiper-item><image src="../../../static/todytop.png" mode=""></image></swiper-item>
				</view>
			</view>
			<view class="uni-swiper-dots uni-swiper-dots-horizontal">
				<view  class="uni-swiper-dot"></view>
				<view  class="uni-swiper-dot"></view>
				<view  class="uni-swiper-dot"></view>
				<view  class="uni-swiper-dot"></view>
				<view  class="uni-swiper-dot"></view>
			</view>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: "recommend"
	}
</script>

<style>
</style>
