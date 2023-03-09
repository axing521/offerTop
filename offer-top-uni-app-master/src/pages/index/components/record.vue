<!--
 * @Author: scg
 * @Date: 2021-08-21 13:41:12
 * @LastEditTime: 2021-08-21 21:52:51
 * @LastEditors: scg
 * @Description: 
-->
<template>
	<view class="rcord-box">
		<view class="record-box">
			<button class="record-btn" @click="getDay" :disabled="isRecord">
				<view v-if="isRecord" class="record-text">
					今日已打卡
				</view>
				<template v-else>打卡</template>
			</button>
			<!--  -->
		</view>
		<view>
			<text>累积打卡:{{recordDay}}天</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "record",
		data() {
			return {
				userId: null,
				recordDay: 0,
				isRecord: false
			}
		},
		methods: {
			getDay() {
				let _this = this;
				this.$request({
					url: `/user/clockIn/${this.userId}`,
					method: 'POST'
				}).then(value => {
					this.recordDay = value.data.numberClock;
					_this.isRecord = value.data.clock;
				})
			}
		},
		created() {
			let _this = this;
			uni.getStorage({
				key: "user",
				// 成功则发送请求
				success(res) {
					_this.userId = res.data._id
					_this.$request({
						url: `/user/clockIn/${_this.userId}`,
						method: 'GET'
					}).then(value => {
						_this.recordDay = value.data.numberClock;
						_this.isRecord = value.data.clock;
					})
				}
			})
		}
	}
</script>

<style>
	.rcord-box {
		background-color: #FFFFFF;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		text-align: center;
		padding-bottom: 10rpx;
	}
	.record-box {
		height: 250rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.record-btn {
		background-color: #4887f7;
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 0 50rpx #4887f7;
	}
	.record-btn[disabled]{
		background-color: #4887f7 !important;
		color: #FFFFFF !important;
		filter: grayscale(80%);
	}
	.record-text{
		font-size: 22rpx;
	}
</style>
