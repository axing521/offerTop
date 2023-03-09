<template>
  <view>
    <article-list-item v-for="item in starList" :key="item.artiId" :articleId="item.artiId">

      <!-- 题目 -->
      <template v-slot:title>
        <view>{{item.name}}</view>
      </template>

      <!-- 分类 -->
			<template v-slot:type>
			  <view>{{item.classify}}</view>
			</template>
			
			<template v-slot:previewCount><text class="iconslot">{{item.previewCount}}</text></template>
			<template v-slot:collectCount><text class="iconslot">{{item.collectCount}}</text></template>
			<template v-slot:likeCount><text class="iconslot">{{item.likeCount}}</text></template>
    </article-list-item>
	  <view v-if="requestFlag" class="cu-load bg-grey" :class="{'loading': requestFlag}"></view> 
  </view>
</template>

<script>
import ArticleListItem from './articlelistitem'
const TYPE = 1 // 获取文章类型为点赞
export default {
  name: 'MyStar',
  data () {
    return {
      userId: '', // 用户id
      starList: [], // 文章列表
      requestFlag: false, // 请求等待标志
    }
  },
  components: {
    ArticleListItem
  },
  onShow () {
    let _this = this
    _this.starList = []
    _this.requestFlag = true
    uni.getStorage({
      key: "user",
      success(res) {
        _this.userId = res.data._id
        _this.$request({
          url: `/describe/getevent/${_this.userId}/${TYPE}`,
          method: 'GET'
        }).then(res => {
          _this.requestFlag = false
          console.log('res', res.data);
          _this.starList = res.data
        }).catch((err) => {
          _this.requestFlag = false
          console.log('err', err)
        })
      }
    })
  }

}
</script>

<style scoped>
 	.bg-grey{
		background-color: #f1f1f1;
		color: #000;
	}
  .iconslot {
    margin-left: 6rpx;
    margin-right: 12rpx;
  }
</style>
