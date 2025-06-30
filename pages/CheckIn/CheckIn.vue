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
            src="/static/product/1.png" 
            mode="widthFix"
          ></image>
        </view>
      </view>

      <!-- 已打卡列表 -->
      <view class="list-container checked-list">
        <text class="section-title">已打卡</text>
        <view class="items-wrapper">
          <view class="check-item" v-for="(item, index) in checkedList" :key="index" @click="handleItemClick(item)">
            <image class="item-img" :src="item.img" mode="aspectFill"></image>
            <image class="arrow-icon" src="/static/common/nav-right-icon.png" mode="widthFix"></image>
          </view>
        </view>
      </view>

      <!-- 未打卡列表 -->
      <view class="list-container unchecked-list">
        <text class="section-title">未打卡</text>
        <view class="items-wrapper">
          <view class="check-item" v-for="(item, index) in uncheckedList" :key="index" @click="toCloudMuseum">
            <image class="item-img" :src="item.img" mode="aspectFill"></image>
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
        { img: '/static/home/home-windows-image-1.png' },
        { img: '/static/home/home-windows-image-2.png' },
        { img: '/static/home/home-windows-image-1.png' },
        { img: '/static/home/home-windows-image-2.png' }
      ],
      uncheckedList: [ 
        { img: '/static/product/p2.png' },
        { img: '/static/home/home-windows-image-4.png' },
		{ img: '/static/home/home-windows-image-5.png' },
		{ img: '/static/home/home-windows-image-1.png' },
		{ img: '/static/home/home-windows-image-3.png' }
      ]
    }
  },
  methods: {
    goBack() { 
      uni.navigateBack();
    },
    handleItemClick(item) { 
      console.log('点击已打卡项', item);
    },
    toCloudMuseum() { 
      uni.navigateTo({
        url: '/pages/cloudMuseum/cloudMuseum'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
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
    /* 扣除底部35vh空间给导航栏 */
    padding-bottom: 35vh;
    box-sizing: border-box;
    min-height: 0; /* 确保flex子元素可以收缩 */
  }

  /* 头部样式 */
  .header {
    display: flex;
    flex-direction: column;
    padding: 20rpx;
    
    .top-row {
      height: 60rpx; // 控制返回按钮行高度
      display: flex;
      align-items: center;
      
      /*返回按钮*/
      .back-icon {
        width: 45rpx;
        height: 45rpx;
        margin-left: 20rpx;
      }
    }

    /*标题+头像*/
    .bottom-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end; // 标题和头像底部对齐
      margin-top: -18px;
      
      /*标题*/
      .title {
        font-size: 32px;
        font-weight: bold;
        color: #555555;
        margin-bottom: 0; // 移除默认底部间距
        margin-left: 20px;
      }
      
      /*头像*/
      .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        margin-right: 60rpx;
		border: 6rpx solid #fafafa;
      }
    }
  }

  /* 列表容器样式 */
  .list-container {
    flex: 1;
    padding: 20rpx 40rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    min-height: 0; /* 确保flex子元素可以收缩 */
    
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
      background-color: rgba(255, 255, 255, 0.3); /* 提高外层矩形透明度 */
      border: 0.4rpx solid #b4ccaf;
	  border-radius: 40rpx;
      //padding: 20rpx 60rpx 20rpx 25rpx;/*前面上下，后面左右 ;上右下左*/
	  padding: 20rpx 25rpx;
      box-sizing: border-box;
      overflow-y: scroll; /* 改为scroll始终显示滚动条 */
      display: flex;
      flex-direction: column;
      gap: 15rpx;
      height: 460rpx; /* 固定高度，确保能显示3个内容 */
      min-height: 460rpx; /* 最小高度 */
      
      /* 滚动条样式 - uniapp兼容 */
      &::-webkit-scrollbar {
        width: 12rpx; /* 增加滚动条宽度 */
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
      
      /* 打卡项样式 */
      .check-item {
        width: 100%;
        height: 133rpx;
        background-color: rgba(102, 123, 105, 0.15); /* 提高内容矩形透明度 */
        border: 1rpx solid #d3d3d3;
		border-radius: 35rpx;
        display: flex;
        align-items: center;
        padding: 0 30rpx;
        box-sizing: border-box;
        flex-shrink: 0; /* 防止项目被压缩 */
        
        .item-img {
          width: 120rpx;
          height: 90rpx;
          border-radius: 10rpx;
          margin-right: 20px;
		  //border: 1px solid #afafaf;
        }
        
        .arrow-icon {
          width: 30rpx;
          height: 30rpx;
          margin-left: auto;
        }
      }
    }
  }
  
  /* 已打卡列表样式 */
  .checked-list {
    margin-bottom: 10rpx;
    flex: 1; /* 平分剩余空间 */
    display: flex;
    flex-direction: column;
	margin-bottom: 140px;
  }
  
  /* 未打卡列表样式 */
  .unchecked-list {
    margin-top: 10rpx;
    flex: 1; /* 平分剩余空间 */
    display: flex;
    flex-direction: column;
  }
  
}
</style>