<template>
  <view>
    <articlelistitem
      v-for="item in articleList"
      :key="item._id"
      :articleId="item._id"
    >
      <!-- 题目 -->
      <template v-slot:title>
        <view>{{ item.name }}</view>
      </template>

      <!-- 分类 -->
      <template v-slot:type>
        <view>{{ item.classify.name }}</view>
      </template>

      <template v-slot:previewCount
        ><text class="iconslot">{{ item.previewCount }}</text></template
      >
      <template v-slot:collectCount
        ><text class="iconslot">{{ item.collectCount }}</text></template
      >
      <template v-slot:likeCount
        ><text class="iconslot">{{ item.likeCount }}</text></template
      >
    </articlelistitem>
    <!-- <view class="over" v-if="flag">——————没有更多的数据啦——————</view> -->
	<view v-if="isLoad || flag" class="cu-load bg-grey" :class="!flag?'loading':'over'"></view>
  </view>
</template>

<script>
import articlelistitem from "./articlelistitem/articlelistitem.vue";
export default {
  name: "articlelist",
  data() {
    return {
      articleList: [], // 渲染页面的数据
      page: null, // 存放当前获取的也main
      articleCount: null, // 文章的总数量,
      id: null, // 分类id
      flag: false, // 显示没有更多数据
	  isLoad: false,
    };
  },
  components: {
    articlelistitem,
  },
  onLoad(option) {
    // option为上一页面传递的参数
    this.id = option.id;
	this.isLoad = true;
    // 发送请求获取文章列表
    this.$request({
      url: "/article/getArticleList",
      method: "GET",
      data: {
        page: "1", // 首次获取第1页，数量为10
        pageSize: "10",
        classifyId: this.id,
      },
    }).then((value) => {
      // 将成功获取的数据保存在data中
      this.articleList = value.data.articleList;
      this.page = value.data.page;
      this.articleCount = value.data.articleCount;
	  this.isLoad = false;
    });
  },

  // 页面触底函数
  onReachBottom() {
    // 如果获取的数据大于等于文章总数, 不进行请求
    if (this.articleList.length >= this.articleCount) return (this.flag = true);
	this.isLoad= true;
    this.page++;
    this.$request({
      url: "/article/getArticleList",
      method: "GET",
      data: {
        page: this.page,
        pageSize: "10",
        classifyId: this.id,
      },
    }).then((value) => {
      // 将新获取的数据追加到原数据后面
      this.articleList.push(...value.data.articleList);
	  this.isLoad = false;
    });
  },
};
</script>

<style lang="less" scoped>
	.bg-grey{
		background-color: #f1f1f1;
		color: #000;
	}
  .iconslot {
  margin-left: 6rpx;
  margin-right: 12rpx;
}
</style>
