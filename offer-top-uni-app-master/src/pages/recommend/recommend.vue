<!--
 * @Author: scg
 * @Date: 2021-08-21 13:41:12
 * @LastEditTime: 2021-08-22 13:33:29
 * @LastEditors: scg
 * @Description: 
-->
<template>
  <view class="browse">
    <view
      class="load-progress"
      :class="loadProgress != 0 ? 'show' : 'hide'"
      :style="[{ top: CustomBar + 'px' }]"
    >
      <view
        class="load-progress-bar bg-blue"
        :style="[
          {
            transform: 'translate3d(-' + (100 - loadProgress) + '%, 0px, 0px)',
          },
        ]"
      ></view>
      <view class="load-progress-spinner text-blue"></view>
    </view>
    <swiper
      class="swiper-box"
      duration="300"
      :circular="false"
      vertical="true"
      @change="change"
    >
      <swiper-item
        v-for="item in dataList"
        :data-id="item._id"
        :key="item._id"
        :item-id="item._id"
        @click="goPage(item._id)"
      >
        <view class="cu-card article dynamic">
          <view class="cu-item shadow">
            <view class="title">
              <view class="text-cut">{{ item.name }}</view>
            </view>
            <view class="content">
              <mpHtml
                style="width: calc(100% - 20px);overflow: scroll;padding: 10px;height: calc(100% - 20px);"
                :content="item.content"
                :tag-style="tagStyle"
                copy-link
                scroll-table
                set-title
              ></mpHtml>
              <!-- <rich-text
                class="content-box"
                object-fit="contain"
                :nodes="item.content"
              ></rich-text> -->
            </view>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import mpHtml from "mp-html/dist/uni-app/components/mp-html/mp-html";
const tagStyle = {
  'h1': 'font-size:14px;margin-bottom: 14px;', 
  'h2': 'font-size:12px;margin-bottom: 14px;', 
  'h3': 'font-size:12px;margin-bottom: 14px;', 
  'table': 'border: 1px solid', 
  'tr': 'border: 1px solid', 
  'td': 'border: 1px solid', 
  'p': 'line-height: 14px;margin-bottom: 8px;',
};
// const containerStyle = {
//   'width': '100%',
// };
export default {
  components: {
    mpHtml,
  },
  data() {
    return {
      dataList: [],
      tagStyle,
      current: 0,
      loading: false,

      CustomBar: this.CustomBar,
      loadProgress: 0,
    };
  },
  onLoad(e) {},
  onReady() {
    uni.getStorage({
      key: "user",
      success: (res) => {
        this.info = res.data;
        this.getDetails();
      },
    });
    // 获取列表
  },
  methods: {
    LoadProgress(progress, load) {
      this.loadProgress = progress;
      if (this.loadProgress < 100 && !load) {
        setTimeout(() => {
          this.LoadProgress(progress + 3, false);
        }, 50);
      } else {
        this.loadProgress = 0;
      }
    },
    goPage(articleId) {
      uni.navigateTo({
        url: `../articleDetail/articleDetail?id=${articleId}`,
        fail: (e) => {
          console.log("fail", e);
        },
      });
    },
    change({ target }) {
      const data = [...this.dataList];
      const temp = data[target.current];
      const nextId = temp.nextId;
      if (this.current >= target.current && loading) {
        return false;
      }
      if (data.findIndex((item) => item._id === nextId) === -1) {
        this.getDetails(nextId);
        this.current = target.current;
      }
    },
    getDetails(articleId) {
      const { _id } = this.info;
      this.loading = true;

      this.LoadProgress(0, false);
      this.$request({
        url: `/article/recommend/${_id}/${articleId ? articleId : ""}`,
        method: "GET",
      }).then((res) => {
        this.loading = false;
        this.LoadProgress(100, true);
        if (this.dataList.length > 0) {
          this.dataList = this.dataList.concat([{ ...res.data }]);
        } else {
          this.dataList = this.dataList.concat([
            { ...res.data },
            { ...res.data.nextArticle },
          ]);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.browse {
  width: 100vw;
  height: calc(100vh - 30rpx);
  position: relative;
  // color: #fff;
}

.browse .swiper-box {
  width: 100vw;
  height: 100%;
}

.browse .swiper-box .content-box {
  display: block;
  height: 100%;
  color: #000;
  margin: 10px 20px;
  word-break: break-all;
  overflow-y: auto;
}
.cu-card,
.cu-item {
  height: 100%;
}
.content {
  height: calc(100% - 40px);
}
.text-cut{
  font-size: 16px;
}
</style>

