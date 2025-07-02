<template>
  <view class="float-ball-container" v-if="visible">
    <view class="float-ball-mask" @tap="close"></view>
    <view class="float-ball-content">
      <view class="float-ball-grid">
        <view v-for="(item, index) in options" :key="index" class="float-ball-item" @tap="handleSelect(item)">
          <image :src="item.icon" class="float-ball-icon" mode="aspectFit"></image>
          <text class="float-ball-text">{{ item.text }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import router from '@/common/router.js'
export default {
  name: 'FloatBall',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: [
        {
          id: 'option1',
          text: '云上展馆',
          icon: 'http://team-img.lizxx.com/team2/navigation/1.png',
          url: '/pages/exhibition/exhibition'
        },
        {
          id: 'option2',
          text: '探索发现',
          icon: 'http://team-img.lizxx.com/team2/navigation/2.png',
          url: '/pages/tansuo/faxian'
        },
        {
          id: 'option3',
          text: '文创艺术',
          icon: 'http://team-img.lizxx.com/team2/navigation/3.png',
          url: '/pages/MyCreation/MyCreation'
        },
        {
          id: 'option4',
          text: '特色物产',
          icon: 'http://team-img.lizxx.com/team2/navigation/4.png',
          url: '/pages/Products/products'
        },
        {
          id: 'option5',
          text: '公益教育',
          icon: 'http://team-img.lizxx.com/team2/navigation/5.png',
          url: '/pages/welfare/welfare-main'
        },
        {
          id: 'option6',
          text: '浏览云古镇',
          icon: 'http://team-img.lizxx.com/team2/navigation/6.png',
          url: ''
        }
      ]
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    handleSelect(item) {
      if (item.url) {
        router.navigateTo(item.url);
        this.close();
      } else {
        uni.showToast({
          title: '该功能暂未开放',
          icon: 'none'
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.float-ball-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.float-ball-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.float-ball-content {
  position: relative;
  top: 150px;
  width: 80%;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.float-ball-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #ffffff;
}

.float-ball-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.float-ball-item {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.float-ball-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
}

.float-ball-text {
  font-size: 14px;
  color: #0d0505;
}
</style>