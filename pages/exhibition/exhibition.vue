<template>
  <view class="museum-container">
    <!-- 热门博物馆标题 -->
    <view class="hot-title">热门博物馆</view>

    <!-- 顶部轮播图 -->
    <swiper class="hot-museum-swiper" autoplay circular indicator-dots>
      <swiper-item v-for="(item, index) in hotMuseums" :key="index">
        <view class="swiper-item" @click="goToDetail(item)">
          <image class="swiper-image" :src="item.image" mode="aspectFill"></image>
          <view class="swiper-info">
            <text class="museum-name">{{ item.name }}</text>
            <text class="museum-desc">{{ item.desc }}</text>
          </view>
        </view>
      </swiper-item>
    </swiper>

    <!-- 更多博物馆标题 -->
    <view class="section-title">
      <text>更多博物馆</text>
    </view>

    <!-- 博物馆列表 -->
    <scroll-view class="museum-list" scroll-y>
      <view class="museum-item" v-for="(item, index) in moreMuseums" :key="index"
        @touchstart="touchStart(index, $event)" @touchmove="touchMove(index, $event)" @touchend="touchEnd(index)">
        <view class="museum-content" :style="{ transform: `translateX(${item.offsetX}px)` }">
          <!-- 博物馆图片 -->
          <image class="museum-image" :src="item.image" mode="aspectFill" @click="goToDetail(item)"></image>
        </view>

        <!-- 预约按钮（固定在右侧） -->
        <view class="reserve-btn" @click.stop="reserveMuseum(item)" :style="{ opacity: item.offsetX < 0 ? 1 : 0 }">
          点击预约
        </view>
      </view>
    </scroll-view>
    <TabBar current="exhibition" />
  </view>

</template>

<script>
import { getCreationList, deleteCreation } from '../../api/creation.js'
import FloatBall from '@/compents/FloatBall.vue'
import TabBar from '@/compents/TabBar.vue'
export default {
  components: {
    FloatBall,
    TabBar
  },
  data() {
    return {

      startX: 0,
      hotMuseums: [
        {
          id: 1,
          name: '故宫博物馆',
          desc: '中国最大的古代文化艺术博物馆',
          image: '/static/map/test.jpeg',
          offsetX: 0
        },
        {
          id: 2,
          name: '中国国家博物馆',
          desc: '展示中华五千年文明的重要窗口',
          image: '/static/map/test3.jpeg',
          offsetX: 0
        },
        {
          id: 3,
          name: '上海博物馆',
          desc: '中国古代艺术的重要展示中心',
          image: '/static/map/test2.jpeg',
          offsetX: 0
        }
      ],
      moreMuseums: [
        {
          id: 4,
          name: '湖南省博物馆',
          desc: '展示湖南历史文化的重要窗口',
          image: '/static/map/test4.jpg',
          offsetX: 0
        },
        {
          id: 5,
          name: '陕西历史博物馆',
          desc: '展示陕西及中国古代文明的重要场所',
          image: '/static/map/test2.jpeg',
          offsetX: 0
        },
        {
          id: 6,
          name: '南京博物院',
          desc: '中国三大博物馆之一',
          image: '/static/map/test.jpeg',
          offsetX: 0
        }
      ]
    }
  },
  methods: {
    goToDetail(item) {
      uni.navigateTo({
        url: `/pages/museumDetail/museumDetail?id=${item.id}`
      });
    },

    reserveMuseum(item) {
      uni.showToast({
        title: `已预约${item.name}`,
        icon: 'success'
      });
      this.resetOffset();
    },

    touchStart(index, event) {
      this.startX = event.touches[0].clientX;
    },

    touchMove(index, event) {
      const moveX = event.touches[0].clientX;
      const diffX = moveX - this.startX;

      if (diffX < 0) {
        // 左滑，移动图片
        this.moreMuseums[index].offsetX = Math.max(diffX, -120);
      } else {
        // 右滑，恢复原位
        this.moreMuseums[index].offsetX = 0;
      }
    },

    touchEnd(index) {
      if (this.moreMuseums[index].offsetX < -60) {
        // 滑动距离超过60rpx，保持滑动状态
        this.moreMuseums[index].offsetX = -120;
      } else {
        // 滑动距离不够，恢复原位
        this.moreMuseums[index].offsetX = 0;
      }
    },

    resetOffset() {
      this.moreMuseums.forEach(item => {
        item.offsetX = 0;
      });
    }
  }
}
</script>

<style lang="scss">
.museum-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;

  /* 热门博物馆标题 */
  .hot-title {
    padding: 20rpx 30rpx;
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
    background-color: #fff;
  }

  /* 轮播图样式 - 修复显示不全问题 */
  .hot-museum-swiper {
    height: 350rpx;
    width: 100%;
    box-sizing: border-box;

    .swiper-item {
      height: 100%;
      width: 100%;
      position: relative;

      .swiper-image {
        width: 100%;
        height: 100%;
        display: block;
      }

      .swiper-info {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 20rpx;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
        color: #fff;

        .museum-name {
          font-size: 36rpx;
          font-weight: bold;
          display: block;
        }

        .museum-desc {
          font-size: 28rpx;
          display: block;
          margin-top: 10rpx;
        }
      }
    }
  }

  /* 更多博物馆标题 */
  .section-title {
    padding: 30rpx;
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
    background-color: #fff;
    border-top: 1rpx solid #eee;
  }

  /* 博物馆列表样式 - 调整边距和预约按钮 */
  .museum-list {
    flex: 1;
    background-color: #fff;
    padding: 0 30rpx;
    box-sizing: border-box;

    .museum-item {
      position: relative;
      height: 300rpx;
      margin-bottom: 30rpx;
      border-radius: 10rpx;
      overflow: hidden;

      .museum-content {
        width: calc(100% + 120rpx);
        /* 包含预约按钮的宽度 */
        height: 100%;
        transition: transform 0.3s;

        .museum-image {
          width: calc(100% - 120rpx);
          /* 减去预约按钮的宽度 */
          height: 100%;
          display: block;
          border-radius: 10rpx;
        }
      }

      .reserve-btn {
        position: absolute;
        top: 0;
        right: 0;
        width: 220rpx;
        height: 100%;
        background-color: #9c9c9c;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28rpx;
        font-weight: bold;
        transition: opacity 0.3s;
        border-radius: 0 10rpx 10rpx 0;
        z-index: 2;
      }
    }
  }
}
</style>