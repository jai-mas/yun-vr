<template>
  <view class="product-container">
    <!-- 背景图片 -->
    <image src="/static/product/bg.png" class="background"></image>
    
    <!-- 顶部标题 -->
    <view class="title">特色·物产</view>
    
    <!-- 主商品展示区 -->
    <view class="main-product-container">
      <!-- 左侧标签 -->
      <view class="side-tags left-tags">
        <view v-for="(tag, index) in leftTags" :key="index" class="tag">
          {{ tag }}
        </view>
      </view>
      
      <!-- 主商品内容 -->
      <view class="main-product">
        <image 
          :src="currentProduct.image" 
          class="main-image" 
          @click="navigateToDetail"
        />
        <view class="product-name">{{ currentProduct.name }}</view>
      </view>
      
      <!-- 右侧标签 -->
      <view class="side-tags right-tags">
        <view v-for="(tag, index) in rightTags" :key="index" class="tag">
          {{ tag }}
        </view>
      </view>
    </view>
    
    <!-- 商品描述 -->
    <view class="product-desc">
      <view v-for="(line, index) in productDescLines" :key="index" class="desc-line">
        {{ line }}
      </view>
    </view>
    
    <!-- 操作提示 -->
    <view class="tip">
      <image src="/static/product/arrow.png" class="arrow-fade"></image>
    </view>
    
    <!-- 商品列表 -->
    <scroll-view 
      class="product-list" 
      scroll-y 
      :scroll-top="scrollTop"
      :scroll-with-animation="true"
      @scroll="handleScroll"
    >
      <view class="list-container">
        <view 
          v-for="(product, index) in products" 
          :key="index" 
          class="product-item"
          :id="'product-' + index"
          :class="{ 'active': currentIndex === index }"
          @click="selectProduct(index)"
        >
          <view class="item-content">
            <image 
              :src="product.image" 
              class="product-image"
              :class="{ 'active-image': currentIndex === index }"
              mode="aspectFill"
            />
            <text class="item-name">{{ product.name }}</text>
            <text class="item-ellipsis" v-if="currentIndex !== index">...</text>
          </view>
        </view>
      </view>
    </scroll-view>
	
    <!-- 底部导航栏 -->
	<TabBar current="products"/>
  </view>
</template>

<script>
import { TabBar } from "../../compents/TabBar.vue"
export default {
  name: 'Products',
  components:{ TabBar },
  data() {
    return {
      currentIndex: 0,
      scrollTop: 0,
      products: [
        {
          name: '莓茶',
          image: '/static/product/p1.png',
          desc: '土家族秘传宝物|让健康与美味同行',
          tags: ['营养价值高', '降"三高"', '民族特色', '品饮体验佳', '"红军茶"', '滋味醇厚回甘']
        },
        {
          name: '蜂蜜',
          image: '/static/product/p2.png',
          desc: '深山野生蜜源|自然醇甜滋养',
          tags: ['野生采集', '纯天然', '润肺养颜', '百花蜜源', '无加工', '营养丰富']
        },
        {
          name: '竹笋干',
          image: '/static/product/p3.png',
          desc: '高山鲜笋晾制|保留自然本味',
          tags: ['新鲜竹笋', '传统晾晒', '脆嫩可口', '烹饪佳品', '无硫熏制', '健康食材']
        },
        {
          name: '腊肉',
          image: '/static/product/p4.png',
          desc: '农家古法腌制|烟熏风味独特',
          tags: ['农家自制', '传统腌制', '松木烟熏', '肉质紧实', '风味独特', '下饭佳品']
        },
        {
          name: '香菇',
          image: '/static/product/p5.png',
          desc: '高山椴木香菇|肉质厚实鲜美',
          tags: ['椴木栽培', '肉质厚实', '香味浓郁', '煲汤佳品', '富含氨基酸', '自然生长']
        }
      ]
    }
  },
  computed: {
    currentProduct() {
      return this.products[this.currentIndex] || {}
    },
    productDescLines() {
      return this.currentProduct.desc?.split('|') || []
    },
    leftTags() {
      return this.currentProduct.tags?.slice(0, 3) || []
    },
    rightTags() {
      return this.currentProduct.tags?.slice(3, 6) || []
    }
  },
  methods: {
    selectProduct(index) {
      if (this.currentIndex === index) return;
      
      this.currentIndex = index;
      
      // 计算滚动位置，确保选中项完整显示在视图中
      const itemHeight = 150; // 每个商品项的高度
      const listHeight = 350; // 列表可视区域高度(35vh约等于350rpx)
      const visibleItems = Math.floor(listHeight / itemHeight);
      
      // 确保选中项在可视区域中间位置
      let targetScrollTop = index * itemHeight - (listHeight - itemHeight) / 2;
      
      // 边界检查
      targetScrollTop = Math.max(0, targetScrollTop);
      targetScrollTop = Math.min(targetScrollTop, (this.products.length - 1) * itemHeight - (listHeight - itemHeight));
      
      this.scrollTop = targetScrollTop;
    },
    handleScroll(e) {
      // 可以在这里添加自定义滚动逻辑
    },
    navigateToDetail() {
      // 显示当前产品详情，而不是跳转到不存在的页面
      uni.showToast({
        title: `${this.currentProduct.name}详情页开发中`,
        icon: 'none',
        duration: 2000
      })
    }
  }
}
</script>

<style lang="scss">
.product-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  .title {
    position: relative;
    z-index: 2;
    font-size: 60rpx;
    font-weight: bold;
    color: #808000;
    text-align: center;
    margin-top: 130rpx;
    margin-bottom: 80rpx;
    text-shadow: 0 3rpx 3rpx rgba(0, 0, 0, 0.3); 
  }
  
  .main-product-container {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 40rpx;
  }
  
  .side-tags {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 30%;
    
    &.left-tags {
      align-items: flex-end;
      padding-right: 10rpx;
      margin-top: 20px;
    }
    
    &.right-tags {
      align-items: flex-start;
      padding-left: 10rpx;
      margin-top: -20px;
    }
    
    .tag {
      color: #2e3f35;
      font-size: 25rpx;
      padding: 8rpx 20rpx;
      margin: 25rpx 0;
      border: 1rpx solid #000;
      border-radius: 30rpx;
      background: transparent;
      text-align: center;
      box-shadow: 0 2rpx 6rpx rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }
  }
  
  .main-product {
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .main-image {
      width: 340rpx;
      height: 340rpx;
      border-radius: 50%;
      border: 2rpx solid #494949;
      transition: all 0.3s ease;
      
      &:active {
        transform: scale(0.95);
      }
    }
    
    .product-name {
      font-size: 36rpx;
      font-weight: bold;
      color: #333333;
      margin-top: 15rpx;
      margin-bottom: -20rpx;
      letter-spacing: 15rpx;
    }
  }
  
  .product-desc {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20rpx;
    
    .desc-line {
      font-size: 28rpx;
      color: #233028;
      text-align: center;
    }
  }
  
  .tip {
    position: relative;
    margin-bottom: 10rpx;
    left: 0;
    right: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .arrow-fade {
      width: 120rpx;
      height: 70rpx;
      animation: arrowFade 1.5s infinite;
    }
  }
  
  /* 商品列表样式修改 */
  .product-list {
    margin-top: 10px;
    position: relative;
    z-index: 2;
    height: 35vh;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    
    /* 新增的渐变遮罩效果 */
    mask-image: linear-gradient(
      to bottom, 
      transparent 0%, 
      black 9%,
      black 91%, 
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to bottom, 
      transparent 0%, 
      black 5%,
      black 95%, 
      transparent 100%
    );
    
    .list-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .product-item {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 15rpx 0;
      transition: all 0.3s ease;
      
      .item-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        
        .product-image {
          width: 150rpx;
          height: 150rpx;
          border-radius: 50%;
          border: 2rpx solid #eee;
          transition: all 0.3s ease;
          
          &.active-image {
            width: 200rpx;
            height: 200rpx;
            border-color: #808000;
          }
        }
        
        .item-name {
          font-size: 30rpx;
          color: #2b3b32;
          margin-top: 10rpx;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .item-ellipsis {
          font-size: 35rpx;
          color: #2b3b32;
          margin-top: 3rpx;
          font-weight: bold;
        }
      }
      
      &.active {
        .item-name {
          font-size: 34rpx;
          font-weight: bold;
          color: #243827;
        }
      }
    }
  }
}

@keyframes arrowFade {
  0% { opacity: 1; transform: translateY(0); }
  50% { opacity: 0.5; transform: translateY(10rpx); }
  100% { opacity: 1; transform: translateY(0); }
}
</style>