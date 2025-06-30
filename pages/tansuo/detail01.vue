<template>
  <view class="detail01-page">
    <!-- 封面区 -->
    <view class="cover-container">
      <image :src="coverImg" class="cover-img" mode="aspectFill"></image>
      <view class="icon-btn back-btn" @click="goBack">
        <u-icon name="arrow-left" size="28" color="#fff"></u-icon>
      </view>

    </view>
    <!-- 内容区 -->
    <view class="content-card">
      <view class="title">{{ storyName }}</view>
      <view class="address">
        <u-icon name="map" size="18" color="#888"></u-icon>
        <text class="address-text">{{ address }}</text>
      </view>
      <view class="desc">{{ desc }}</view>
      <view class="pics" v-if="pics && pics.length">
        <image v-for="(pic, idx) in pics" :key="idx" :src="pic" class="pic-img" mode="aspectFill"></image>
      </view>
      <view class="icon-btn fav-btn" @click="toggleFav">
        <u-icon :name="isFav ? 'star-fill' : 'star'" size="28" color="#fff"></u-icon>
      </view>
    </view>
	<TabBar :current="'home'" @change="onTabChange" />
  </view>
</template>

<script>
import TabBar from '@/compents/TabBar.vue'
import FloatBall from '@/compents/FloatBall.vue'
export default {
  name: 'TabBar',
  components: {
    TabBar,
    FloatBall
  },
  data() {
    return {
      storyName: '靖港古镇"江河码头"智慧',
      coverImg: '/static/tansuo/6.webp',
      address: '靖港古镇',
      desc: '江河之秋的古老码头，智慧之光悄然闪烁，是历史的低语，还是未来的预兆？每一步，都伴随着疑问的回响。这里到底有多少秘密？',
      pics: [
		'/static/tansuo/1.webp',
		'/static/tansuo/2.webp',
		'/static/tansuo/3.webp',
		'/static/tansuo/4.webp',
		'/static/tansuo/5.webp',
		'/static/tansuo/6.webp'
      ],
      isFav: false
    }
  },
  onLoad(options) {
    // 不要写任何赋值，直接用 data 里的内容
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    toggleFav() {
      this.isFav = !this.isFav
      uni.showToast({
        title: this.isFav ? '已收藏' : '已取消收藏',
        icon: 'none'
      })
    }
  }
}
</script>

<style scoped>
.detail-page {
  background: #f5f5f5;
  min-height: 100vh;
}
.cover-container {
  position: relative;
  width: 100%;
  height: 240px;
}
.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
}
.icon-btn {
  position: absolute;
  top: 18px;
  width: 38px;
  height: 38px;
  background: rgba(0,0,0,0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.back-btn {
  left: 16px;
  top: 50px;
 }
.fav-btn {
  right: 16px;
 }
.content-card {
  background: #fff;
  border-radius: 18px;
  margin: -32px 16px 0 16px;
  padding: 20px 16px 16px 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  position: relative;
  z-index: 2;
}
.title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 8px;
}
.address {
  display: flex;
  align-items: center;
  color: #888;
  margin-bottom: 12px;
}
.address-text {
  margin-left: 6px;
  font-size: 15px;
}
.desc {
  font-size: 16px;
  color: #333;
  margin-bottom: 14px;
  line-height: 1.7;
}
.pics {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}
.pic-img {
  width: 48%;
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
}
</style>
