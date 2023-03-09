<template>
	<view class="center">
        <form @submit="formSubmit">
            <view class="center-list"  :hover-class="!login ? 'logo-hover' : 'logo-hover'">
			<view class="logo-title">
				<text class="list-new" >更改名字</text>
                <button form-type="submit" :class="change? 'g-button' : 'w-button'">保存</button>
			</view>
		    </view>

		    <view class="center-list">
			    <view class="center-list-item border-bottom" >
				    <!-- <textarea class="navigat-arrow" ></textarea> -->
                    <input name="input" value="" maxlength=14 @focus="changeName()" class="navigat-arrow" ref="userName" type="text"/>
			    </view>
		    </view>
        </form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				login: false,
                change:false,
                val:"",
				avatarUrl: "../../static/user.png",
				userInfo: {
					avatarUrl:uni.getStorageSync("user").pic,
					name: uni.getStorageSync("user").userName
				}
			}
		},
		methods: {
            formSubmit(e){
                console.log(e);
                console.log(this);
				uni.setStorage({
                    key: "user",
                    data: {
                        clockDate: uni.getStorageSync("user").clockDate,
                        createdAt: uni.getStorageSync("user").createdAt,
                        numberClock: uni.getStorageSync("user").numberClock,
                        openId: uni.getStorageSync("user").openId,
                        updatedAt: uni.getStorageSync("user").updatedAt,
                        userName: e.detail.value.input,
                        _id: uni.getStorageSync("user")._id
                    }
                })
                this.change = false;
            },

            changeName(){
                let _this = this;
                console.log(_this);
                _this.change = true;
                _this.val = this.value;
            }
		}
	}
</script>

<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}

	page,
	view {
		display: flex;
	}

	page {
		background-color: #f8f8f8;
	}

	.center {
		flex-direction: column;
	}

	.logo {
		width: 750upx;
		height: 240upx;
		padding: 20upx;
		box-sizing: border-box;
		background-color: #4cd964;
		flex-direction: row;
		align-items: center;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 150upx;
		height: 150upx;
		border-radius: 150upx;
	}

	.logo-title {
		height: 150upx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20upx;
	}

	.uer-name {
		height: 60upx;
		line-height: 60upx;
		font-size: 38upx;
		color: #FFFFFF;
	}

	.go-login.navigat-arrow {
		font-size: 38upx;
		color: #FFFFFF;
	}

	.login-title {
		height: 150upx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20upx;
	}

	.center-list {
		background-color: #FFFFFF;
		margin-top: 20upx;
		width: 750upx;
		flex-direction: column;
	}

	.center-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}

	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}

	.list-icon {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #4cd964;
		text-align: center;
		font-family: texticons;
		margin-right: 20upx;
	}

    .list-new {
        height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: center;
        font-weight: bold;
    }

	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.navigat-arrow {
		height: 90upx;
		width: 60upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		text-align: left;
		flex: 1;
		/* font-family: texticons; */
	}

    .g-button{
        height: 90upx;
		width: 20upx;
		line-height: 90upx;
		font-size: 30upx;
		background-color:rgb(72, 240, 72);
        color:white;
		text-align: justify;
		flex:0.1
    }

    .w-button{
        height: 90upx;
		width: 20upx;
		line-height: 90upx;
		font-size: 30upx;
		color:gray;
		text-align: justify;
		flex:0.1
    }
</style>