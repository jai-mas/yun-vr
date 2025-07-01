<template>
  <view class="faxian-bg">
    <view class="explore-view">
      <!-- 标题 -->
      <view class="header">
        <text class="title">探索发现</text>
      </view>
      <view class="divider"></view>

      <!-- 历史故事轮播 -->
      <view class="section">
        <view class="section-title">历史故事</view>
        <swiper
          class="story-swiper"
          :indicator-dots="false"
          :current="historyCurrent"
          @change="onHistoryChange"
          circular
          autoplay
        >
          <swiper-item v-for="(item, index) in historyList" :key="index">
            <view class="story-card">
              <text class="story-name">{{ item.name }}</text>
              <image :src="item.img" class="story-img" mode="aspectFill" />
              <button class="experience-btn" @click="goToDetail(item)">进入体验</button>
              <!-- 进度条 -->
              <view class="progress-bar">
                <view
                  v-for="(dot, i) in historyList.length"
                  :key="i"
                  :class="['dot', { active: i === historyCurrent }]"
                ></view>
              </view>
            </view>
          </swiper-item>
        </swiper>
        <!-- 简介 -->
        <view class="story-desc">
          {{ historyList[historyCurrent] ? historyList[historyCurrent].desc : '' }}
        </view>
      </view>

      <!-- 趣闻趣事轮播 -->
      <view class="section">
        <view class="section-title">趣闻趣事</view>
        <swiper
          class="fun-swiper"
          :indicator-dots="false"
          :current="funCurrent"
          @change="onFunChange"
          circular
          autoplay
        >
          <swiper-item v-for="(item, index) in funList" :key="index">
            <view class="fun-card">
              <image :src="item.img" class="fun-img" mode="aspectFill" />
              <view class="fun-label">{{ item.label }}</view>
            </view>
			<!-- 进度条 -->
			<view class="progress-bar">
			  <view
			    v-for="(dot, i) in funList.length"
			    :key="i"
			    :class="['dot', { active: i === funCurrent }]"
			  ></view>
			</view>
          </swiper-item>
        </swiper>
		<TabBar current="home" />
      </view>
    </view>
	
  </view>
</template>

<script>
import TabBar from '@/compents/TabBar.vue'
import FloatBall from '@/compents/FloatBall.vue'
export default {
  name: 'Faxian',
  components: {
    TabBar,
    FloatBall
  },
  data() {
    return {
      historyCurrent: 0,
      funCurrent: 0,
      historyList: [
        {
          name: '靖港古镇"江河码头"智慧',
          img: '/static/tansuo/6.webp',
          desc: '江河之秋的古老码头，智慧之光悄然闪烁，是历史的低语，还是未来的预兆？每一步，都伴随着疑问的回响。这里到底有多少秘密？'
        },
		{
          name: '靖港古镇"江河码头"智慧',
          img: '/static/tansuo/8.webp',
          desc: '玛卡巴卡'
        },
		{
          name: '靖港古镇"江河码头"智慧',
          img: '/static/tansuo/9.webp',
          desc: '阿西吧'
        },
        // 可继续添加更多历史故事
      ],
      funList: [
        {
          img: '/static/tansuo/4.webp',
          label: '海绵宝宝'
        },
        {
          img: '/static/tansuo/3.webp',
          label: '派大星'
        },
		{
          img: '/static/tansuo/5.webp',
          label: '章鱼哥'
        }
        // 可继续添加更多趣闻趣事
      ]
    }
  },
  methods: {
    onHistoryChange(e) {
      this.historyCurrent = e.detail.current
    },
    onFunChange(e) {
      this.funCurrent = e.detail.current
    },
    goToDetail(item) {
      // 跳转到详情页，需根据实际路由调整
      uni.navigateTo({
        url: `/pages/tansuo/detail01?name=${item.name}`
      })
    },
    onTabChange(tabName) {
      // 处理底部标签栏变化
      console.log('Tab changed to:', tabName)
    }
  }
}
</script>

<style lang="scss">
.faxian-bg {
  min-height: 100vh;
  width: 100vw;
  background: url('/static/tansuo/beijing.jpg') no-repeat center center;
  background-size: cover;
}
.explore-view {
  padding: 24rpx;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}
.header {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;
  padding-top: 80rpx;
  .title {
    font-size: 40rpx;
    font-weight: bold;
  }
}
.divider {
  height: 2rpx;
  background: #e0e0e0;
  margin-bottom: 24rpx;
}
.section {
  margin-bottom: 40rpx;
}
.section-title {
  font-size: 32rpx;
  font-weight: 600;
  margin-bottom: 16rpx;
}
.story-swiper {
  width: 100%;
  height: 500rpx;
  margin-bottom: 12rpx;
}
.fun-swiper {
  width: 100%;
  height: 400rpx;
  margin-bottom: 12rpx;
}
.story-card, .fun-card {
  position: relative;
  border-radius: 16rpx;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10rpx);
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.1);
  height: 100%;
  border: 1rpx solid rgba(255, 255, 255, 0.3);
}
.story-name {
  position: absolute;
  top: 16rpx;
  left: 16rpx;
  color: #fff;
  font-weight: bold;
  background: rgba(0,0,0,0.3);
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
  z-index: 2;
}
.story-img, .fun-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.experience-btn {
  position: absolute;
  right: 16rpx;
  bottom: 16rpx;
  background: #666;
  color: #fff;
  font-size: 28rpx;
  border-radius: 24rpx;
  padding: 8rpx 24rpx;
  z-index: 2;
}
.progress-bar {
  position: absolute;
  left: 16rpx;
  bottom: 16rpx;
  display: flex;
  gap: 8rpx;
  z-index: 2;
  .dot {
    width: 12rpx;
    height: 12rpx;
    border-radius: 50%;
    background: #e0e0e0;
    &.active {
      background: #6ecbff;
    }
  }
}
.story-desc {
  font-size: 26rpx;
  color: #666;
  margin-top: 8rpx;
  margin-bottom: 16rpx;
}
.fun-label {
  position: absolute;
  right: 16rpx;
  bottom: 16rpx;
  background: rgba(0,0,0,0.3);
  color: #fff;
  font-size: 26rpx;
  padding: 4rpx 16rpx;
  border-radius: 12rpx;
}
</style>
