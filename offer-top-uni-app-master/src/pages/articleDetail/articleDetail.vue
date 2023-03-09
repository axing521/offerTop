<template>
  <view class="article-detail-wrapper">
    <skeleton
  :loading="loading"
  :showTitle="skeleton1.showTitle"
  :row="18"
  :showAvatar="skeleton1.showAvatar"
            avatarSize="false"
>
    <view class="article-detail-content">
      <mpHtml
        style="
          width: calc(100% - 20px);
          overflow: scroll;
          padding: 10px;
          height: calc(100% - 20px);
        "
        :content="content"
        :tag-style="tagStyle"
        copy-link
        scroll-table
        set-title
      ></mpHtml>
      <!-- <rich-text class="content-box" object-fit="contain" :nodes="content"></rich-text> -->
    </view>
		</skeleton>
    
    <view class="article-detail-bottom">
      <view class="article-detail-btn article-detail-like" @click="handleLike">
        <cmd-icon
          class="article-detail-icon"
          :type="likeIconUrl"
          size="20"
          :color="likeIconColor"
        ></cmd-icon>
        <view class="article-detail-like-count">{{ likeCount }}</view>
      </view>
      <view
        class="article-detail-btn article-detail-collect"
        @click="handleCollect"
      >
        <cmd-icon
          class="article-detail-icon"
          :type="collectIconUrl"
          size="20"
          :color="collectIconColor"
        ></cmd-icon>
        <view class="article-detail-collect-text">{{ collectCount }}</view>
      </view>
    </view>
    <view class="article-detail-tips" v-show="showTips">{{ tips }}</view>
  </view>
</template>

<script>
import Skeleton from '../../components/J-skeleton/J-skeleton.vue'
import CmdIcon from "../../components/cmd-icon/cmd-icon.vue";
import mpHtml from "mp-html/dist/uni-app/components/mp-html/mp-html";
const tagStyle = {
  h1: "font-size:14px;margin-bottom: 14px;",
  h2: "font-size:12px;margin-bottom: 14px;",
  h3: "font-size:12px;margin-bottom: 14px;",
  table: "border: 1px solid",
  tr: "border: 1px solid",
  td: "border: 1px solid",
  p: "line-height: 14px;margin-bottom: 8px;",
};
export default {
  name: "ArticleDetail",
  components: {
    CmdIcon,
    Skeleton,
    mpHtml,
  },
  data() {
    return {
      tagStyle,
      userId: "", // 用户id
      articleId: "", // 文章id
      content: "", // 文章内容
      isLike: false, // 是否点赞
      isCollect: false, // 是否收藏
      likeCount: "", // 点赞人数
      collectCount: "", // 收藏人数
      likeWaiting: false, // 点赞等待
      collectWaiting: false, // 收藏等待
      tips: "", // 提示文案
      showTips: false, // 展示文案
      // 骨架屏
      loading: true,
      skeleton1 : {
        showTitle: true,
        showAvatar:false
      },
    }
  },
  computed: {
    likeIconUrl() {
      return this.isLike ? "heart-2" : "heart";
    },
    collectIconUrl() {
      return this.isCollect ? "star-2" : "star";
    },
    likeIconColor() {
      return this.isLike ? "red" : "#3C8CFF";
    },
    collectIconColor() {
      return this.isCollect ? "orange" : "#3C8CFF";
    },
  },
  created() {
    this.reloadData()
  },
  methods: {
    reloadData() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    handleLike () {
      if (this.likeWaiting) return
      this.likeWaiting = true
      this.isLike = !this.isLike
      this.likeCount = this.isLike ? this.likeCount + 1 : this.likeCount - 1
      let url = this.isLike ? '/describe/addlike' : '/describe/cancellike'
      let _this = this
      _this.$request({
        url: url,
        method: 'POST',
        data: {
          articleId: _this.articleId,
          userId: _this.userId
        }
      }).then(res => {
        console.log('res', res.data)
        this.likeWaiting = false
        if (res.data) {
          _this.tips = _this.isLike ? '点赞成功' : '取消点赞成功'
          _this.handleTips()
        } else {
          _this.tips = _this.isLike ? '点赞失败' : '取消点赞失败'
          _this.handleTips()
          _this.likeWaiting = false
          _this.isLike = !_this.isLike
          _this.likeCount = _this.isLike ? _this.likeCount + 1 : _this.likeCount - 1
        }
      }).catch((err) => {
        _this.tips = _this.isLike ? '点赞失败' : '取消点赞失败'
        _this.handleTips()
        _this.likeWaiting = false
        _this.isLike = !_this.isLike
        _this.likeCount = _this.isLike ? _this.likeCount + 1 : _this.likeCount - 1
      })
    },
    handleCollect() {
      if (this.collectWaiting) return;
      this.collectWaiting = true;
      this.isCollect = !this.isCollect;
      this.collectCount = this.isCollect
        ? this.collectCount + 1
        : this.collectCount - 1;
      let url = this.isCollect
        ? "/describe/addcollect"
        : "/describe/cancelcollect";
      let _this = this;
      _this
        .$request({
          url: url,
          method: "POST",
          data: {
            articleId: _this.articleId,
            userId: _this.userId,
          },
        })
        .then((res) => {
          console.log("res", res.data);
          this.collectWaiting = false;
          if (res.data) {
            _this.tips = _this.isCollect ? "收藏成功" : "取消收藏成功";
            _this.handleTips();
          } else {
            _this.tips = _this.isCollect ? "收藏失败" : "取消收藏失败";
            _this.handleTips();
            _this.collectWaiting = false;
            _this.isCollect = !_this.isCollect;
            _this.collectCount = _this.isCollect
              ? _this.collectCount + 1
              : _this.collectCount - 1;
          }
        })
        .catch((err) => {
          _this.tips = _this.isCollect ? "收藏失败" : "取消收藏失败";
          _this.handleTips();
          _this.collectWaiting = false;
          _this.isCollect = !_this.isCollect;
          _this.collectCount = _this.isCollect
            ? _this.collectCount + 1
            : _this.collectCount - 1;
        });
    },
    handleTips() {
      this.showTips = true;
      let _this = this;
      setTimeout(() => {
        _this.showTips = false;
      }, 1000);
    },
  },
  onLoad(options) {
    let _this = this;
    console.log("article details", options);
    _this.articleId = options.id;

    uni.getStorage({
      key: "user",
      // 成功则发送请求
      success(res) {
        _this.userId = res.data._id;
        _this
          .$request({
            url: `/article/getArticle/${_this.articleId}/${_this.userId}`,
            method: "GET",
          })
          .then((res) => {
            console.log("res", res.data);
            let data = res.data;
            _this.content = data.content;
            _this.isLike = data.isLike;
            _this.isCollect = data.isCollect;
            _this.likeCount = data.likeCount;
            _this.collectCount = data.collectCount;
          });
      },
    });
  },
};
</script>

<style>
.article-detail-wrapper {
  position: relative;
}
.article-detail-content {
  padding: 30rpx 30rpx 120rpx 30rpx;
  background: #fff;
}
.article-detail-bottom {
  position: fixed;
  display: flex;
  flex: 1;
  flex-direction: row;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100rpx;
  background: #fff;
  border-top: 1px solid #ccc;
}
.article-detail-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  font-size: 36rpx;
}
.article-detail-like {
  border-right: 1px solid #ccc;
}
.article-detail-icon {
  margin-right: 10rpx;
}
.article-detail-tips {
  position: fixed;
  font-size: 36rpx;
  padding: 6rpx 10rpx;
  background-color: rgba(00, 00, 00, 0.8);
  color: #fff;
  left: 50%;
  bottom: 130rpx;
  transform: translateX(-50%);
}
</style>