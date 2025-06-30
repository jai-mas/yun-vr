<template>
  <view class="map-container">
    <!-- 自定义导航栏 -->
    <view class="custom-navbar">
      <view class="navbar-content">
        <view class="navbar-left" @click="goBack">
          <image class="back-icon" src="/static/map/arrow.png" mode="aspectFit"></image>
        </view>
        <view class="search-container">
          <input 
            class="search-input" 
            placeholder="搜索景点名称" 
            v-model="searchKeyword"
            @confirm="onSearch"
            @focus="showHotSpotList = true"
          />
          <image 
            class="search-icon" 
            src="/static/map/search.png" 
            mode="aspectFit"
            @click="onSearch"
          ></image>
        </view>
      </view>
    </view>

    <!-- 热门景点列表 -->
    <view class="hot-spot-list" v-if="showHotSpotList">
      <view class="hot-spot-title">热门景点</view>
      <scroll-view class="hot-spot-scroll" scroll-y>
        <view 
          class="hot-spot-item" 
          v-for="(spot, index) in hotSpots" 
          :key="index"
          @click="selectHotSpot(spot)"
        >
          <image class="spot-icon" src="/static/map/location_marker.png"></image>
          <text class="spot-name">{{ spot.name }}</text>
        </view>
      </scroll-view>
    </view>

    <!-- 地图组件 -->
    <map 
      id="scenicMap"
      class="map-content"
      :latitude="center.latitude"
      :longitude="center.longitude"
      :markers="markers"
      :scale="scale"
      :show-location="true"
      :enable-zoom="mapSetting.enableZoom"
      :enable-scroll="mapSetting.enableScroll"
      :enable-rotate="mapSetting.enableRotate"
      :enable-overlooking="mapSetting.enableOverlooking"
      :enable-satellite="mapSetting.enableSatellite"
      :enable-traffic="mapSetting.enableTraffic"
      :show-scale="mapSetting.showScale"
      :subkey="mapSetting.subkey"
      @markertap="onMarkerTap"
    ></map>

    <!-- 景点详情底部面板 -->
    <view class="scenic-detail-panel" :class="{ 'show': showDetailPanel }">
      <!-- 拖拽指示器 -->
      <view class="drag-indicator"></view>
      
      <!-- 景点标题 -->
      <view class="panel-header">
        <text class="scenic-title">{{ currentSpot.name }}</text>
        <view class="close-btn" @click="closeDetailPanel">
          <text class="close-text">×</text>
        </view>
      </view>

      <!-- 视频/图片区域 -->
      <view class="media-section">
        <view class="media-container">
          <image 
            class="scenic-image" 
            :src="currentSpot.image" 
            mode="aspectFill"
          ></image>
          <view class="play-overlay" v-if="currentSpot.hasVideo">
            <view class="play-button">
              <text class="play-icon">▶</text>
            </view>
          </view>
          <!-- 视频控制条 -->
          <view class="video-controls" v-if="currentSpot.hasVideo">
            <view class="control-left">
              <view class="play-pause-btn">
                <text class="control-icon">▶</text>
              </view>
              <text class="time-text">{{ currentSpot.currentTime }}</text>
            </view>
            <view class="progress-bar">
              <view class="progress-bg">
                <view class="progress-fill" :style="{ width: currentSpot.progress + '%' }"></view>
              </view>
            </view>
            <text class="time-text">{{ currentSpot.totalTime }}</text>
            <view class="fullscreen-btn">
              <text class="control-icon">⛶</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 景点描述 -->
      <scroll-view class="description-section" scroll-y>
        <text class="description-text">{{ currentSpot.description }}</text>
      </scroll-view>
    </view>

    <!-- 遮罩层 -->
    <view class="overlay" v-if="showDetailPanel" @click="closeDetailPanel"></view>
	<TabBar current="" />
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
		
      center: {
        latitude: 28.1825, // 修改为岳麓书院的坐标
        longitude: 112.9344
      },
      scale: 12,
      markers: [],
      searchKeyword: '',
      showHotSpotList: false,
      showDetailPanel: false,
      currentSpot: {},
      hotSpots: [
        {
          name: '岳麓书院',
          latitude: 28.1825,
          longitude: 112.9344,
          image: '/static/images/yuelu-academy.jpg',
          hasVideo: true,
          currentTime: '00:22',
          totalTime: '03:38',
          progress: 10,
          description: '岳麓书院是中国历史上赫赫闻名的四大书院之一，坐落于中国历史文化名城湖南长沙湘江西岸的岳麓山下。北宋开宝九年（公元976年），潭州太守朱洞在僧人办学的基础上由官府捐资兴建，正式创立岳麓书院。作为世界上最古老的学府之一，历经千年而弦歌不绝，学脉延绵。其代表传统的书院建筑至今被完整保存，每一组院落、每一块石碑、每一枚砖瓦、每一支风荷，都闪烁着时光淬炼的人文精神，向世人诉说着千年学府的沧桑与辉煌。'
        },
        {
          name: '橘子洲头',
          latitude: 28.1865,
          longitude: 112.9624,
          image: '/static/images/juzizhou.jpg',
          hasVideo: false,
          description: '橘子洲头是湘江中的一个冲击沙洲，四面环水，绵延数十里，是国家重点风景名胜区。橘子洲头景区内有毛泽东青年艺术雕塑、问天台等景点。这里是毛泽东青年时代经常游览的地方，也是他写下《沁园春·长沙》的地方。'
        },
        {
          name: '长沙世界之窗',
          latitude: 28.2386,
          longitude: 113.0557,
          image: '/static/images/world-window.jpg',
          hasVideo: false,
          description: '长沙世界之窗是一个融世界各国建筑奇观、五洲风情歌舞表演、大型器械游乐、先锋时尚活动、影视拍摄基地于一体的综合性大型主题公园。园内汇集了世界各地的著名建筑和景观的微缩版本。'
        }
      ],
      apiUrl: 'https://xnlv.lizxx.com/api/vtp/app/scenic/scenicIndex',
      mapSetting: {
        skew: 0,
        rotate: 0,
        showCompass: false,
        showScale: true,
        subkey: 'JAYBZ-KQELT-46OXX-LHLXM-IRYNO-5HFRA',
        layerStyle: 1,
        enableZoom: true,
        enableScroll: true,
        enableRotate: false,
        enableOverlooking: false,
        enableSatellite: false,
        enableTraffic: false,
      }
    }
  },

  onLoad() {
    this.loadScenicSpots();
  },

  methods: {
    goBack() {
      uni.navigateBack();
    },

    async loadScenicSpots() {
      uni.showLoading({ title: '加载中...' });
      
      try {
        const res = await uni.request({
          url: this.apiUrl,
          method: 'GET',
          header: { 'Content-Type': 'application/json' }
        });
        
        const responseData = Array.isArray(res) ? res[1].data : res.data;
        
        if (!responseData?.data || !Array.isArray(responseData.data)) {
          throw new Error('数据格式不正确');
        }
        
        this.markers = responseData.data.map(item => ({
          id: item.scenicId,
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
          iconPath: item.logoUrl || '/static/common/location.png',
          width: 45,
          height: 45,
          callout: {
            content: item.scenicName || '未命名景点',
            color: '#333',
            fontSize: 14,
            borderRadius: 10,
            bgColor: '#fff',
            padding: 10,
            display: 'ALWAYS'
          },
          customData: item
        }));
        
        if (this.markers.length > 0) {
          this.center = {
            latitude: this.markers[0].latitude,
            longitude: this.markers[0].longitude
          };
        }
        
        uni.hideLoading();
      } catch (error) {
        console.error('加载失败:', error);
        uni.hideLoading();
        uni.showToast({ title: '加载失败', icon: 'none' });
        this.addTestMarkers();
      }
    },

    onSearch() {
      if (!this.searchKeyword.trim()) return;
      
      const foundMarker = this.markers.find(marker => 
        marker.customData.scenicName.includes(this.searchKeyword)
      );
      
      if (foundMarker) {
        this.center = {
          latitude: foundMarker.latitude,
          longitude: foundMarker.longitude
        };
        this.showHotSpotList = false;
      } else {
        uni.showToast({ title: '未找到相关景点', icon: 'none' });
      }
    },

    onMarkerTap(e) {
      console.log('点击了标记点:', e); // 添加调试日志
      
      const marker = this.markers.find(item => item.id === e.markerId || item.id === e.detail.markerId);
      console.log('找到的标记点:', marker); // 添加调试日志
      
      if (marker) {
        // 查找对应的热门景点数据
        const hotSpot = this.hotSpots.find(spot => 
          spot.name === marker.customData.scenicName || 
          marker.customData.scenicName.includes(spot.name)
        );
        
        console.log('找到的热门景点:', hotSpot); // 添加调试日志
        
        if (hotSpot) {
          this.currentSpot = hotSpot;
        } else {
          // 如果没有找到对应的热门景点，使用默认数据
          this.currentSpot = {
            name: marker.customData.scenicName,
            image: '/static/images/default-scenic.jpg',
            hasVideo: false,
            description: marker.customData.description || '暂无景点描述信息'
          };
        }
        
        this.showDetailPanel = true;
        this.showHotSpotList = false;
        
        console.log('当前景点:', this.currentSpot); // 添加调试日志
        console.log('显示详情面板:', this.showDetailPanel); // 添加调试日志
      }
    },

    selectHotSpot(spot) {
      this.searchKeyword = spot.name;
      this.center = {
        latitude: spot.latitude,
        longitude: spot.longitude
      };
      this.currentSpot = spot;
      this.showHotSpotList = false;
      // this.showDetailPanel = true;
    },

    closeDetailPanel() {
      this.showDetailPanel = false;
    },

    addTestMarkers() {
      // 添加多个测试标记点，包括岳麓书院
      this.markers = [
        {
          id: 1,
          latitude: 28.1825,
          longitude: 112.9344,
          iconPath: '/static/common/location.png',
          width: 45,
          height: 45,
          callout: {
            content: '岳麓书院',
            color: '#333',
            fontSize: 14,
            borderRadius: 10,
            bgColor: '#fff',
            padding: 10,
            display: 'ALWAYS'
          },
          customData: {
            scenicId: 1,
            scenicName: '岳麓书院',
            address: '湖南省长沙市岳麓区麓山南路',
            description: '千年学府，文化圣地'
          }
        },
        {
          id: 2,
          latitude: 28.1865,
          longitude: 112.9624,
          iconPath: '/static/common/location.png',
          width: 45,
          height: 45,
          callout: {
            content: '橘子洲头',
            color: '#333',
            fontSize: 14,
            borderRadius: 10,
            bgColor: '#fff',
            padding: 10,
            display: 'ALWAYS'
          },
          customData: {
            scenicId: 2,
            scenicName: '橘子洲头',
            address: '湖南省长沙市岳麓区橘子洲头',
            description: '湘江中的冲击沙洲'
          }
        },
        {
          id: 3,
          latitude: 28.2386,
          longitude: 113.0557,
          iconPath: '/static/common/location.png',
          width: 45,
          height: 45,
          callout: {
            content: '长沙世界之窗',
            color: '#333',
            fontSize: 14,
            borderRadius: 10,
            bgColor: '#fff',
            padding: 10,
            display: 'ALWAYS'
          },
          customData: {
            scenicId: 3,
            scenicName: '长沙世界之窗',
            address: '湖南省长沙市开福区三一大道',
            description: '综合性大型主题公园'
          }
        }
      ];
      
      // 设置地图中心为岳麓书院
      this.center = {
        latitude: this.markers[0].latitude,
        longitude: this.markers[0].longitude
      };
    }
  }
}
</script>

<style lang="scss">
.map-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  
  .custom-navbar {
    position: absolute;
    top: 20px;
    left: 20rpx;
    right: 20rpx;
    width: calc(100% - 40rpx);
    height: 88rpx;
    z-index: 100;
    
    .navbar-content {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 44rpx;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
      padding: 0 24rpx;
      box-sizing: border-box;
    }
    
    .back-icon {
      width: 32rpx;
      height: 32rpx;
      margin-right: 10rpx;
    }
    
    .search-container {
      flex: 1;
      height: 60rpx;
      background: #f5f5f5;
      border-radius: 30rpx;
      display: flex;
      align-items: center;
      padding: 0 20rpx;
      
      .search-input {
        flex: 1;
        height: 100%;
        font-size: 28rpx;
        color: #333;
        background: transparent;
      }
      
      .search-icon {
        width: 32rpx;
        height: 32rpx;
        margin-left: 10rpx;
      }
    }
  }
  
  /* 热门景点列表样式 */
  .hot-spot-list {
    position: absolute;
    top: 120rpx;
    left: 40rpx;
    right: 40rpx;
    background: #fff;
    border-radius: 16rpx;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
    z-index: 101;
    overflow: hidden;
    
    .hot-spot-title {
      padding: 24rpx 30rpx;
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      border-bottom: 1rpx solid #f5f5f5;
    }
    
    .hot-spot-scroll {
      max-height: 500rpx;
      
      .hot-spot-item {
        display: flex;
        align-items: center;
        padding: 24rpx 30rpx;
        border-bottom: 1rpx solid #f5f5f5;
        
        .spot-icon {
          width: 36rpx;
          height: 36rpx;
          margin-right: 20rpx;
        }
        
        .spot-name {
          font-size: 28rpx;
          color: #333;
        }
      }
      
      .hot-spot-item:active {
        background-color: #f9f9f9;
      }
      
      .hot-spot-item:last-child {
        border-bottom: none;
      }
    }
  }

  /* 景点详情底部面板 */
  .scenic-detail-panel {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 80vh; /* 增加高度，因为去掉了底部导航栏 */
    background: #fff;
    border-radius: 20rpx 20rpx 0 0;
    z-index: 200;
    transform: translateY(100%);
    transition: transform 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    
    &.show {
      transform: translateY(0);
    }
    
    .drag-indicator {
      width: 60rpx;
      height: 8rpx;
      background: #e0e0e0;
      border-radius: 4rpx;
      margin: 16rpx auto;
    }
    
    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30rpx 20rpx;
      
      .scenic-title {
        font-size: 36rpx;
        font-weight: bold;
        color: #333;
      }
      
      .close-btn {
        width: 60rpx;
        height: 60rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .close-text {
          font-size: 40rpx;
          color: #999;
        }
      }
    }
    
    .media-section {
      padding: 0 30rpx 20rpx;
      
      .media-container {
        position: relative;
        height: 400rpx;
        border-radius: 16rpx;
        overflow: hidden;
        
        .scenic-image {
          width: 100%;
          height: 100%;
        }
        
        .play-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          
          .play-button {
            width: 100rpx;
            height: 100rpx;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            
            .play-icon {
              color: #fff;
              font-size: 40rpx;
              margin-left: 8rpx;
            }
          }
        }
        
        .video-controls {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80rpx;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
          display: flex;
          align-items: center;
          padding: 0 20rpx;
          
          .control-left {
            display: flex;
            align-items: center;
            
            .play-pause-btn {
              width: 60rpx;
              height: 60rpx;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 16rpx;
              
              .control-icon {
                color: #fff;
                font-size: 24rpx;
              }
            }
            
            .time-text {
              color: #fff;
              font-size: 22rpx;
              margin-right: 16rpx;
            }
          }
          
          .progress-bar {
            flex: 1;
            margin: 0 16rpx;
            
            .progress-bg {
              height: 6rpx;
              background: rgba(255, 255, 255, 0.3);
              border-radius: 3rpx;
              overflow: hidden;
              
              .progress-fill {
                height: 100%;
                background: #fff;
                border-radius: 3rpx;
              }
            }
          }
          
          .time-text {
            color: #fff;
            font-size: 22rpx;
            margin-right: 16rpx;
          }
          
          .fullscreen-btn {
            width: 60rpx;
            height: 60rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            
            .control-icon {
              color: #fff;
              font-size: 24rpx;
            }
          }
        }
      }
    }
    
    .description-section {
      flex: 1;
      padding: 0 30rpx 30rpx; /* 增加底部内边距 */
      
      .description-text {
        font-size: 28rpx;
        line-height: 1.6;
        color: #666;
      }
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 199;
  }
  
  .map-content {
    width: 100%;
    height: 100%;
  }
}
</style>
