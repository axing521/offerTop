<template>
  <view class="center">
    <view class="center_top">
      <!-- style="`background:url(${user.pic}) no-repeat 20% 35%`" -->
      <view class="center_top_mask"></view>
    </view>
    <view class="center_box_bg">
      <view class="profily">
        <view class="base" @click="turnToInpersonData()">
          <view v-if="!user.pic" class="cu-avatar round margin-left">
            <open-data
              type="userAvatarUrl"
            ></open-data>
          </view>
          <image  v-if="user.pic" class="profily_header" :src="user.pic" />
          <text>{{ user.userName }}</text>
          <image
            class="icon-right"
            :src="require('../../static/center-icon-right.png')"
          />
        </view>
        <view class="item_collection">
          <view class="collection" v-for="item in collection" :key="item.id">
            <cmd-icon
              class="icon"
              :type="item.url"
              size="28"
              color="#3C8CFF"
            ></cmd-icon>
            <text>{{ item.name }}</text>
          </view>
          <view class="item_custom">
            <view
              class="custom"
              v-for="item in custom"
              :key="item.id"
              @click="personalEnterArticleDetail(item.path)"
              cuIcon-appreciate
            >
              <cmd-icon
                class="icon"
                :type="item.url"
                size="28"
                color="#3C8CFF"
              ></cmd-icon>
              <text>{{ item.name }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="baiban"></view>
      <view class="center_menu">
        <view class="menu_item" v-for="item in menus" :key="item.id">
          <cmd-icon :type="item.url" size="28" color="#3C8CFF"></cmd-icon>
          <text>{{ item.name }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import cmdIcon from "../../components/cmd-icon/cmd-icon.vue";
export default {
  computed: mapState(["hasLogin", "user"]),
  components: {
    //   login
    cmdIcon,
  },
  data() {
    return {
      custom: [
        {
          id: 1,
          name: "我的点赞",
          url: "heart",
          path: "./myHeart",
        },
        {
          id: 2,
          name: "浏览历史",
          url: "list",
          path: "./myHistory",
        },
        {
          id: 3,
          name: "我的收藏",
          url: "star",
          path: "./myStar",
        },
      ],
      menus: [
        {
          id: 1,
          name: "帮助中心",
          url: "check-circle",
        },
        {
          id: 1,
          name: "意见反馈",
          url: "mail",
        },
        {
          id: 1,
          name: "关于我们",
          url: "alert-circle",
        },
      ],
    };
  },
  created() {
    this.setUserInfo(uni.getStorageSync("user"));
    console.log(this.hasLogin, this.user);
  },
  methods: {
    ...mapMutations("user", ["setUserInfo"]),
    personalEnterArticleDetail(path) {
      uni.navigateTo({
        url: path,
      });
    },
    turnToInpersonData() {
      uni.navigateTo({
        url: "../inpersonData/inpersonData",
        fail: function (err) {
          console.log(err);
        },
      });
    },
  },
};
</script>

<style lang="less">
page {
  height: 100%;
}

.center {
  height: 100%;
  &_top {
    height: 18%;
    background-size: contain;
    &_mask {
      background: rgba(0, 0, 0, 0.4);
      height: 100%;
    }
  }
  &_box_bg {
    background: #f9f9f9;
    position: relative;
    .profily {
      position: absolute;
      width: 90%;
      margin: 0 auto;
      top: -100rpx;
      left: 5%;
      background: #fefefe;
      padding: 35rpx;
      box-sizing: border-box;
      box-shadow: 0px 2px 5px #ededed;
    }
  }
}

.profily,
.profily_header {
  border-radius: 8px;
}
.cu-avatar {
  height: 120rpx;
  width: 120rpx;
  overflow: hidden;
}
.base {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #eeecec;
  padding-bottom: 35rpx;
  position: relative;
  .profily_header {
    height: 120rpx;
    width: 120rpx;
    background-size: auto;
    display: block;
  }

  text {
    margin-left: 20px;
    font-size: 30rpx;
  }

  .icon {
    position: absolute;
    height: 40rpx;
    width: 40rpx;
    right: 0px;
    top: 0px;
  }
}

.item_custom {
  display: flex;
  justify-content: space-between;
  margin-top: 35rpx;
  .custom {
    width: 140rpx;
    font-size: 24rpx;
    text-align: center;
    letter-spacing: 0.5px;
    display: flex;
    flex-direction: column;
    .icon {
      width: 50rpx;
      height: 50rpx;
      margin: 0 auto;
      margin-bottom: 5px;
    }
  }
}

.baiban {
  background: #fefefe;
  height: 300rpx;
}

.center_menu {
  width: 100%;
  display: inline-block;

  .menu_item {
    font-size: 28rpx;
    letter-spacing: 1px;
    padding: 14px 5%;
    background: #fefefe;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 1px solid #efefef;

    &::after {
      content: "";
      width: 30upx;
      height: 30upx;
      position: absolute;
      right: 5%;
      background: url("../../static/center-icon-right.png") no-repeat;
      background-size: 100%;
    }

    text:nth-of-type(1) {
      margin-left: 10px;
    }

    &:nth-of-type(4) {
      margin-top: 5px;
    }
  }
}
.icon-right {
  // float:right;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0;
}
</style>
