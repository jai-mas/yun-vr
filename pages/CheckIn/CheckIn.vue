<template>
  <view class="checkIn-container">
    <!-- 背景图 -->
    <image src="http://team-img.lizxx.com/team2/product/bg2.png" class="background"></image>
    
    <!-- 内容区域 -->
    <view class="content">
      <!-- 头部区域：标题 + 返回按钮 -->
      <view class="header">
        <!-- 返回按钮单独一行 -->
        <!-- <view class="top-row">
          <image 
            class="back-icon" 
            src="http://team-img.lizxx.com/team2/common/nav-left-icon.png" 
            mode="widthFix" 
            @click="goBack"
          ></image>
        </view> -->
        
        <!-- 标题和头像一行 -->
        <view class="bottom-row">
          <text class="title">集章打卡</text>
          <image 
            class="avatar" 
            src="http://team-img.lizxx.com/team2/product/avatar.png" 
            mode="widthFix"
          ></image>
        </view>
      </view>
	  
	  <!--徽章展示墙-->
<view class="list-container show-list">
  <text class="section-title">徽章展示墙</text>
  <view class="items-wrapper">
	  <view class="show-item">
	    <image class="showitem-img" src="http://team-img.lizxx.com/team2/icon-colorful/icon/1.png" mode="aspectFill"></image>
		<image class="showitem-img" src="http://team-img.lizxx.com/team2/icon-colorful/icon/2.png" mode="aspectFill"></image>
		<image class="showitem-img" src="http://team-img.lizxx.com/team2/icon-colorful/icon/3.png" mode="aspectFill"></image>
		<image class="showitem-img" src="http://team-img.lizxx.com/team2/icon-colorful/icon/4.png" mode="aspectFill"></image>
		<image class="showitem-img" src="http://team-img.lizxx.com/team2/icon-colorful/icon/5.png" mode="aspectFill"></image>
		<image class="showitem-img" src="http://team-img.lizxx.com/team2/icon-colorful/icon/6.png" mode="aspectFill"></image>
		<image class="showitem-img" src="http://team-img.lizxx.com/team2/icon-colorful/icon/7.png" mode="aspectFill"></image>
		<image class="showitem-img" src="http://team-img.lizxx.com/team2/icon-colorful/icon/8.png" mode="aspectFill"></image>
      </view>
  </view>
</view>

<text style="font-size: 25rpx; margin: 8rpx 0 11rpx 35px;">浏览靖港古城</text>

      <!-- 已打卡列表 -->
<view class="list-container checked-list">
  <text class="section-title">已打卡</text>
  <view class="items-wrapper">
    <view class="check-item" v-for="(item, index) in checkedList" :key="index" @click="goToMuseum(item)">
      <image class="item-img" :src="item.img" mode="aspectFill"></image>
      
      <!-- 新增 item-info 容器，包含 item-name 和 item-des -->
      <view class="item-info">
        <text class="item-name">{{item.name}}</text>
        <text class="item-des">{{item.des}}</text>
      </view>
      
      <image class="item-img2" :src="item.img2" mode="aspectFill"></image>
      <image class="arrow-icon" src="http://team-img.lizxx.com/team2/common/nav-right-icon.png" mode="widthFix"></image>
    </view>
  </view>
</view>



      <!-- 未打卡列表 -->
      <view class="list-container unchecked-list">
        <text class="section-title">未打卡</text>
        <view class="items-wrapper">
          <view class="check-item" v-for="(item, index) in uncheckedList" :key="index" @click="goToMuseum(item)">
            <image class="item-img" :src="item.img" mode="aspectFill"></image>
			
			<view class="item-info">
            <text class="item-name">{{item.name}}</text>
			<text class="item-des">{{item.des}}</text>
			</view>
			
			<image class="item-img2" :src="item.img2" mode="aspectFill"></image>
            <image class="arrow-icon" src="http://team-img.lizxx.com/team2/common/nav-right-icon.png" mode="widthFix"></image>
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
          name: '浏览靖港古镇',
          img: 'http://team-img.lizxx.com/team2/checkin/m1.png',
		  img2: 'http://team-img.lizxx.com/team2/icon-colorful/icon/1.png',
          url: 'https://www.720yun.com/t/3evkclqepp9?scene_id=59207156' ,
		  des:'完成方式：线上游览完成'
        },
        {
          id: 2,
          name: '韶山毛泽东同志纪念馆',
          img: 'http://team-img.lizxx.com/team2/checkin/m2.png',
		  img2: 'http://team-img.lizxx.com/team2/icon-colorful/icon/2.png',
          url: 'https://www.720yun.com/t/8bf2baf5jln?scene_id=706908'  ,
		  des:'完成方式：线上游览完成'
        }
      ],
      uncheckedList: [
        {
          id: 3,
          name: '浏览凤凰古镇',
          img: 'http://team-img.lizxx.com/team2/checkin/m3.png',
		  img2: 'http://team-img.lizxx.com/team2/icon-gray/icon/8.png',
          url: 'https://www.720yun.com/t/15vkuw7y0iw?scene_id=39780982' ,
		  des:'完成方式：线上游览完成'
        },
        {
          id: 4,
          name: '隆平水稻博物馆',
          img: 'http://team-img.lizxx.com/team2/checkin/m4.png',
		  img2: 'http://team-img.lizxx.com/team2/icon-gray/icon/7.png',
          url: 'https://www.720yun.com/t/94vkiyiy087?scene_id=34409322'  ,
		  des:'完成方式：线上游览完成'
        },
        {
          id: 5,
          name: '雷锋纪念馆',
          img: 'http://team-img.lizxx.com/team2/checkin/m5.png',
		  img2: 'http://team-img.lizxx.com/team2/icon-gray/icon/2.png',
          url: 'https://www.720yun.com/t/daakibqyp8q?scene_id=124562138'  ,
		  des:'完成方式：线上游览完成'
        }/*,
        {
          id: 6,
          name: '湘绣博物馆',
          img: 'http://team-img.lizxx.com/team2/checkin/m6.png',
          url: 'https://www.kuleiman.com/161810/879473/' 
        },
        {
          id: 7,
          name: '谢子龙影像艺术馆',
          img: 'http://team-img.lizxx.com/team2/checkin/m7.png',
          url: 'https://www.720yun.com/t/e2vkz7f7s89?scene_id=81587874' 
        }*/
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
    opacity: 0.65; /* 70% 透明度 */
  }

  .content {
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
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
      padding-bottom: 10px;
      border-bottom: 1px solid #959595;
      margin-left: 20px;
      margin-right: 40rpx;

      .title {
        font-size: 24px;
        font-weight: bold;
        color: #181818;
        margin-bottom: 10px;
        margin-left: 10px;
      }

      .avatar {
        width: 150rpx;
        height: 150rpx;
        border-radius: 50%;
      }
    }
  }

  .list-container {
    flex: 1;
    padding: 20rpx 40rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .section-title {
      display: block;
      font-size: 17px;
      color: #1a1a1a;
      margin-bottom: 20rpx;
      text-align: left;
      margin-left: 15px;
    }

    .items-wrapper {
      flex: 1;
      background-color: rgba(255, 255, 255, 1);
      border: 0.4rpx solid #eaf4ee;
      border-radius: 20rpx;
      padding: 57.5rpx 30rpx;
      box-sizing: border-box;
      overflow-y: scroll;
      display: flex;
      flex-direction: row;
      gap: 15rpx;
      height: 260rpx;
      min-height: 260rpx;
	  gap: 30rpx;  /* 增加元素之间的间距 */

      /* 列表项通用样式 */
      .check-item {
        width: 100%;
        height: 165rpx;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 25rpx;
        display: flex;
        align-items: center;
        padding: 0 30rpx;
        box-sizing: border-box;
        flex-shrink: 0;
        box-shadow: 2rpx 3rpx 8rpx rgba(149, 149, 149, 1.0);

        .item-img {
          width: 130rpx;
          height: 100rpx;
          border-radius: 8rpx;
          margin-right: 20px;
        }

        .item-img2 {
          width: 100rpx;
          height: 100rpx;
          margin-left: auto;
          margin-right: 6px;
        }

        .item-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
        }

        .item-name {
          font-size: 26rpx;
          color: #000000;
          margin-left: -10rpx;
        }

        .item-des {
          font-size: 23rpx;
          color: #8a8a8a;
          margin-left: -10rpx;
          margin-top: 15rpx;
        }

        .arrow-icon {
          width: 30rpx;
          height: 30rpx;
          margin-left: auto;
          margin-right: -20rpx;
        }
      }
    }
  }

  /* 徽章展示墙特殊样式*/
  .list-container.show-list {
    .items-wrapper {
      overflow-x: auto; 
      overflow-y: hidden; 
      flex-direction: row; 
      height: 165rpx; 
      min-height: 165rpx;
      padding: 30rpx; 

      /* 滚动条*/
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }

      .show-item {
        display: flex;
        gap: 20rpx;
        width: auto;
        height: 200rpx;
        padding: 0; 
        box-shadow: none;
        background-color: transparent;
        border: none;
      }

      /* 徽章图片样式 */
      .showitem-img {
        width: 195rpx;
        height: 195rpx;
        margin-right: 0;
        object-fit: cover;
        border-radius: 10rpx;
      }
    }
  }

  /* 已打卡列表 */
  .checked-list {
    margin-top: -20rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  /* 未打卡列表 */
  .unchecked-list {
    margin-top: -20rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  /* 徽章展示墙 */
  .show-list {
    margin-top: 10rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>