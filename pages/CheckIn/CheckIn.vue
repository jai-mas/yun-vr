<template>
  <view class="checkIn-container">
    <!-- 背景图 -->
    <image src="/static/product/bg2.png" class="background"></image>
    
    <!-- 内容区域 -->
    <view class="content">
      <!-- 头部区域：标题 + 返回按钮 -->
      <view class="header">
        <!-- 返回按钮单独一行 -->
        <view class="top-row">
          <image 
            class="back-icon" 
            src="/static/common/nav-left-icon.png" 
            mode="widthFix" 
            @click="goBack"
          ></image>
        </view>
        
        <!-- 标题和头像一行 -->
        <view class="bottom-row">
          <text class="title">打卡列表</text>
          <image 
            class="avatar" 
            src="/static/product/avatar.png" 
            mode="widthFix"
          ></image>
        </view>
      </view>

      <!-- 已打卡列表 -->
      <view class="list-container checked-list">
        <text class="section-title">已打卡</text>
        <view class="items-wrapper">
          <view class="check-item" v-for="(item, index) in checkedList" :key="index" @click="goToMuseum(item)">
            <image class="item-img" :src="item.img" mode="aspectFill"></image>
            <text class="item-name">{{item.name}}</text>
            <image class="arrow-icon" src="/static/common/nav-right-icon.png" mode="widthFix"></image>
          </view>
        </view>
      </view>

      <!-- 未打卡列表 -->
      <view class="list-container unchecked-list">
        <text class="section-title">未打卡</text>
        <view class="items-wrapper">
          <view class="check-item" v-for="(item, index) in uncheckedList" :key="index" @click="goToMuseum(item)">
            <image class="item-img" :src="item.img" mode="aspectFill"></image>
            <text class="item-name">{{item.name}}</text>
            <image class="arrow-icon" src="/static/common/nav-right-icon.png" mode="widthFix"></image>
          </view>
        </view>
      </view>
	  
      <!-- 底部导航栏 -->
      <TabBar current="my" />
    </view>
  </view>
</template>

<script>
import { TabBar } from "../../compents/TabBar.vue"
export default {
  name: 'CheckIn',
  components:{ TabBar },
  data() {
    return {
      checkedList: [
        {
          id: 1,
          name: '长沙市博物馆',
          img: '/static/checkin/m1.png',
          url: 'https://www.720yun.com/t/3evkuerh5f7?scene_id=38521806' 
        },
        {
          id: 2,
          name: '韶山毛泽东同志纪念馆',
          img: '/static/checkin/m2.png',
          url: 'https://www.720yun.com/t/8bf2baf5jln?scene_id=706908' 
        }
      ],
      uncheckedList: [
        {
          id: 3,
          name: '湖南省地质博物馆',
          img: '/static/checkin/m3.png',
          url: 'https://www.720yun.com/t/aa3jtdwfOk2?scene_id=13097270' 
        },
        {
          id: 4,
          name: '隆平水稻博物馆',
          img: '/static/checkin/m4.png',
          url: 'https://www.720yun.com/t/94vkiyiy087?scene_id=34409322' 
        },
        {
          id: 5,
          name: '雷锋纪念馆',
          img: '/static/checkin/m5.png',
          url: 'https://www.720yun.com/t/daakibqyp8q?scene_id=124562138' 
        },
        {
          id: 6,
          name: '湘绣博物馆',
          img: '/static/checkin/m6.png',
          url: 'https://www.kuleiman.com/161810/879473/' 
        },
        {
          id: 7,
          name: '谢子龙影像艺术馆',
          img: '/static/checkin/m7.png',
          url: 'https://www.720yun.com/t/e2vkz7f7s89?scene_id=81587874' 
        }
      ]
    }
  },
  methods: {
    goBack() { 
      uni.navigateBack();
    },
    goToMuseum(item) {
      // 直接跳转到静态URL（H5适用）
      if (process.env.VUE_APP_PLATFORM === 'h5') {
        window.location.href = item.url;
      } 
      // 小程序使用web-view跳转
      else {
        uni.navigateTo({
          url: `/pages/webview/webview?url=${encodeURIComponent(item.url)}`
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* 样式部分完全保持不变 */
.checkIn-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    top: 0;
    left: 0;
  }
  
  .content {
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    padding-bottom: 35vh;
    box-sizing: border-box;
    min-height: 0;
  }

  .header {
    display: flex;
    flex-direction: column;
    padding: 20rpx;
    margin-bottom: -20rpx;
    
    .top-row {
      height: 60rpx;
      display: flex;
      align-items: center;
      
      .back-icon {
        width: 45rpx;
        height: 45rpx;
        margin-left: 20rpx;
      }
    }

    .bottom-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: -18px;
      
      .title {
        font-size: 32px;
        font-weight: bold;
        color: #555555;
        margin-bottom: 0;
        margin-left: 20px;
      }
      
      .avatar {
        width: 150rpx;
        height: 150rpx;
        border-radius: 50%;
        margin-right: 60rpx;
      }
    }
  }

  .list-container {
    flex: 1;
    padding: 20rpx 40rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    min-height: 0;
    
    .section-title {
      display: block;
      font-size: 24px;
      color: #333;
      margin-bottom: 20rpx;
      font-weight: bold;
      text-align: left;
      margin-left: 15px;
    }
    
    .items-wrapper {
      flex: 1;
      background-color: rgba(255, 255, 255, 0.3);
      border: 0.4rpx solid #b4ccaf;
      border-radius: 40rpx;
      padding: 20rpx 25rpx;
      box-sizing: border-box;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      gap: 15rpx;
      height: 460rpx;
      min-height: 460rpx;
      
      &::-webkit-scrollbar {
        width: 12rpx;
        background-color: transparent;
      }
      
      &::-webkit-scrollbar-track {
        background: rgba(200, 200, 200, 0.5);
        border-radius: 6rpx;
        margin: 4rpx;
      }
      
      &::-webkit-scrollbar-thumb {
        background: rgba(100, 100, 100, 0.8);
        border-radius: 6rpx;
        border: 2rpx solid rgba(255, 255, 255, 0.3);
        min-height: 40rpx;
      }
      
      &::-webkit-scrollbar-thumb:hover {
        background: rgba(80, 80, 80, 0.9);
      }
      
      .check-item {
        width: 100%;
        height: 133rpx;
        background-color: rgba(102, 123, 105, 0.15);
        border: 1rpx solid #d3d3d3;
        border-radius: 35rpx;
        display: flex;
        align-items: center;
        padding: 0 30rpx;
        box-sizing: border-box;
        flex-shrink: 0;
        
        .item-img {
          width: 120rpx;
          height: 90rpx;
          border-radius: 10rpx;
          margin-right: 20px;
        }
        
        .item-name {
          font-size: 28rpx;
          color: #333;
          margin-left: 20rpx;
          flex: 1;
        }
        
        .arrow-icon {
          width: 30rpx;
          height: 30rpx;
          margin-left: auto;
        }
      }
    }
  }
  
  .checked-list {
    margin-bottom: 10rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 140px;
  }
  
  .unchecked-list {
    margin-top: 10rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>