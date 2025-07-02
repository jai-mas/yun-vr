<template>
  <view class="tab-bar">
    <!-- 首页 -->
    <view class="tab-item" :class="{ active: currentTab === 'home' }" @tap="switchTab(tabList[0])">
      <view class="tab-content">
        <image :src="currentTab === 'home' ? tabList[0].activeIcon : tabList[0].icon" class="tab-icon" mode="aspectFit">
        </image>
        <text class="tab-text" :class="{ 'active-text': currentTab === 'home' }">{{ tabList[0].text }}</text>
      </view>
    </view>

    <!-- 导览 -->
    <view class="tab-item" :class="{ active: currentTab === 'navigation' }" @tap="switchTab(tabList[1])"
      @longpress="navigateToNavigation">
      <view class="tab-content">
        <image :src="currentTab === 'navigation' ? tabList[1].activeIcon : tabList[1].icon" class="tab-icon"
          mode="aspectFit"></image>
        <text class="tab-text" :class="{ 'active-text': currentTab === 'navigation' }">{{ tabList[1].text }}</text>
      </view>
    </view>

    <!-- 我的 -->
    <view class="tab-item" :class="{ active: currentTab === 'my' }" @tap="switchTab(tabList[2])">
      <view class="tab-content">
        <image :src="currentTab === 'my' ? tabList[2].activeIcon : tabList[2].icon" class="tab-icon" mode="aspectFit">
        </image>
        <text class="tab-text" :class="{ 'active-text': currentTab === 'my' }">{{ tabList[2].text }}</text>
      </view>
    </view>

    <!-- 悬浮窗组件 -->
    <float-ball :visible="showFloatBall" @close="closeFloatBall"></float-ball>
  </view>
</template>

<script>
import router from '@/common/router.js'
import FloatBall from '@/compents/FloatBall.vue'

export default {
  name: 'TabBar',
  components: {
    FloatBall
  },
  props: {
    current: {
      type: String,
      default: 'home'
    }
  },
  data() {
    return {
      currentTab: this.current,
      showFloatBall: false,
      tabList: [
        {
          name: 'home',
          text: '首页',
          icon: 'http://team-img.lizxx.com/team2/icons/home-active.png',
          activeIcon: 'http://team-img.lizxx.com/team2/icons/home-active.png',
          url: '/pages/home/home'
        },
        {
          name: 'navigation',
          text: '导览',
          icon: 'http://team-img.lizxx.com/team2/icons/navigation-active.png',
          activeIcon: 'http://team-img.lizxx.com/team2/icons/navigation-active.png',
          url: '/pages/Navigation/Navigation'
        },
        {
          name: 'my',
          text: '我的',
          icon: 'http://team-img.lizxx.com/team2/icons/my.png',
          activeIcon: 'http://team-img.lizxx.com/team2/icons/my.png',
          url: '/pages/mine/mine'
        }
      ]
    }
  },
  watch: {
    current: {
      handler(val) {
        this.currentTab = val;
      },
      immediate: true
    }
  },
  methods: {
    switchTab(item) {
      if (item.name === 'navigation') {
        // 导览按钮点击显示悬浮窗
        this.showFloatBall = true;
        this.currentTab = item.name;
        this.$emit('change', item.name);
      } else if (this.currentTab !== item.name) {
        if (item.url) {
          this.currentTab = item.name;
          // 如果是首页，添加跳过引导页的参数
          if (item.name === 'home') {
            router.navigateTo(item.url, { skipGuide: 'true' });
          } else {
            router.navigateTo(item.url);
          }
          this.$emit('change', item.name);
        } else {
          uni.showToast({
            title: '该功能暂未开放',
            icon: 'none'
          });
        }
      }
    },
    closeFloatBall() {
      this.showFloatBall = false;
    },
    handleTooltipClick(index) {
      // 点击扩展按钮时直接跳转到导览页面
      if (index === 0) { // 第一个按钮是"扩展"
        const navigationItem = this.tabList[1]; // 导览按钮
        if (navigationItem && navigationItem.url) {
          router.navigateTo(navigationItem.url);
          this.currentTab = 'navigation';
          this.$emit('change', 'navigation');
        }
      }
    },
    navigateToNavigation() {
      // 实现长按跳转到导览页面的逻辑
      const navigationItem = this.tabList[1];

      // 获取当前页面路径
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const currentPagePath = '/' + currentPage.route;

      // 检查当前是否已经在导览页面，如果不是则执行跳转
      if (navigationItem && navigationItem.url && currentPagePath !== navigationItem.url) {
        router.redirectTo(navigationItem.url);
        this.currentTab = 'navigation';
        this.$emit('change', 'navigation');
        // 关闭悬浮球，因为我们直接跳转到了导览页面
        this.showFloatBall = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: none;
  z-index: 999;
  // opacity: 1;

  /* 适配iPhone底部安全区 */
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.tab-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.tab-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 2px;

}

.tab-text {
  font-size: 15px;
  color: #040507;
}

.active .tab-icon {
  color: #ff0000;
}

.active-text {
  color: #b2552f;
}
</style>