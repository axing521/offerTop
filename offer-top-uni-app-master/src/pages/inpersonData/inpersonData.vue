<!--
 * @Author: scg
 * @Date: 2021-08-22 17:32:32
 * @LastEditTime: 2021-08-22 19:58:16
 * @LastEditors: scg
 * @Description: 
-->
<template>
  <view class="center">
    <form @submit="submit">
      <view class="cu-form-group margin-top">
        <view class="title">昵称</view>
        <input :placeholder="user.userName" name="userName" />
      </view>
      <view class="cu-form-group margin-top">
        <view class="title">头像</view>
        <view
          @click="changePic"
          v-if="!pic"
          class="cu-avatar round margin-left"
        >
          <open-data type="userAvatarUrl"></open-data>
        </view>
        <Image
          v-if="pic"
          @click="changePic"
          :src="pic"
          class="shadow-blur bg-white bg-img"
          style="width: 50px; height: 50px; border-radius: 50px"
        ></Image>
      </view>
      <view class="padding flex flex-direction">
        <button form-type="submit" class="cu-btn bg-blue lg">提交</button>
      </view>
    </form>
  </view>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
    pic() {
      return this.userPic || this.user.pic
    },
  },
  data() {
    return {
      login: false,
      userPic: "",
    };
  },
  methods: {
    ...mapMutations("user", ["setUserInfo"]),
    submit({ detail }) {
      let userInfo = {
        userName: detail.value?.userName||this.user.userName,
        pic: this.pic,
      };
      this.$request({
        url: `/user/setUserInfo/` + uni.getStorageSync("user")._id,
        method: "put",
        data: userInfo,
      }).then((res) => {
        uni.showToast({
          title: "修改成功",
          duration: 2000,
        });
        this.setUserInfo(res.data);
        uni.setStorage({
          key: "user",
          data: res.data,
          success: function () {
            console.log("success");
          },
        });
      });
    },
    changePic() {
      const InspireCloud = require("./libs/inspirecloud.min-0.2.3.js");
      const serviceId = "qcveq1"; // 替换成你的 serviceId，可在后台「设置」页面获取
      const inspirecloud = new InspireCloud({ serviceId });
      const fileUploadToken = "0f596c19-f3a1-4f8f-801e-620bcf8f7b9a";
      // 调用小程序接口，选择文件
      let _this = this;
      wx.chooseImage({
        success(res) {
          // 注意：file 对象中的 path 必须为绝对路径
          const file = {
            path: res.tempFilePaths[0],
          };
          inspirecloud.file
            .upload("axing.jpg", file, { token: fileUploadToken })
            .then((data) => {
              // 上传成功
              console.log(data.url);
              _this.login = true;
              _this.userPic = data.url;
            })
            .catch((error) => {
              // 调用失败，进行错误处理
              console.log(error);
            });
        },
      });
    },

    changeName() {
      console.log(2);
      uni.navigateTo({
        url: "./changeName",
        fail: function (err) {
          console.log(err);
        },
      });
    },
  },
};
</script>

<style>
.cu-form-group .title {
  min-width: calc(4em + 15px);
}
.cu-avatar {
  width: 100rpx;
  height: 100rpx;
  overflow: hidden;
}
</style>