<template>
	<view class="home-container">
		<!-- 起始页面 -->
		<view v-if="!isSecondPage" class="start-page" @click="goToSecondPage">
			<image class="bg-image" src="/static/home/beijing.png" mode="aspectFill"></image>
		</view>
		
		<!-- 第二个页面 -->
		<view v-else class="second-page">
			<image class="bg-image" src="/static/home/beijing1.jpg" mode="aspectFill"></image>
			
			<!-- 轮播图包裹框 -->
			<view class="carousel-wrapper" @click="goToMap">
				<!-- 轮播图容器 -->
				<view class="carousel-container">
					<!-- 轮播图内容区 -->
					<view class="carousel-content">
						<!-- 图片层 -->
						<image 
							v-for="(item, index) in carouselImages" 
							:key="index"
							class="carousel-image" 
							:src="item.src" 
							mode="aspectFill"
							:style="{opacity: currentIndex === index ? 1 : 0}"
						></image>
						
						<!-- 过渡遮罩层 -->
						<image 
							class="carousel-mask" 
							src="/static/home/home-windows-mask.png" 
							mode="aspectFill"
							:style="{opacity: maskOpacity}"
						></image>
					</view>
				</view>
			</view>
			
			<!-- 留言图标 -->
			<view class="message-icon" @click="goToMessage">
				<image 
					class="message-image" 
					src="/static/leavemessage/message.png" 
					mode="aspectFit"
				></image>
			</view>
			
			<!-- 底部导航栏 -->
			<TabBar :current="'home'" @change="onTabChange" />
		</view>
	</view>
</template>

<script>
	import TabBar from '@/compents/TabBar.vue'
	
	export default {
		components: {
			TabBar
		},
		data() {
			return {
				isSecondPage: false,
				carouselImages: [
					{ src: '/static/home/home-windows-image-1.png' },
					{ src: '/static/home/home-windows-image-2.png' },
					{ src: '/static/home/home-windows-image-3.png' },
					{ src: '/static/home/home-windows-image-4.png' },
					{ src: '/static/home/home-windows-image-5.png' }
				],
				currentIndex: 0,
				maskOpacity: 0,
				autoPlayTimer: null,
				isTransitioning: false
			}
		},
		onLoad() {
			// 当进入第二个页面时启动轮播
			if (this.isSecondPage) {
				this.startAutoPlay();
			}
		},
		onUnload() {
			// 清除定时器
			if (this.autoPlayTimer) {
				clearInterval(this.autoPlayTimer);
			}
		},
		methods: {
			goToSecondPage() {
				this.isSecondPage = true;
				// 启动自动轮播
				this.$nextTick(() => {
					this.startAutoPlay();
				});
			},
			
			// 跳转到留言页面
			goToMessage() {
				uni.navigateTo({
					url: '/pages/leavemessage/message'
				});
			},
			
			// 跳转到地图页面
			goToMap() {
				uni.navigateTo({
					url: '/pages/map/map'
				});
			},
			
			// 处理 TabBar 切换事件
			onTabChange(tabName) {
				console.log('Tab changed to:', tabName);
			},
			
			// 开始自动轮播
			startAutoPlay() {
				this.autoPlayTimer = setInterval(() => {
					if (!this.isTransitioning) {
						this.nextImage();
					}
				}, 4000); // 4秒切换一次
			},
			
			// 切换到下一张图片
			nextImage() {
				if (this.isTransitioning) return;
				this.isTransitioning = true;
				
				// 显示遮罩
				this.showMaskAnimation(() => {
					// 切换到下一张
					this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
					
					// 延迟一段时间，让遮罩保持显示状态
					setTimeout(() => {
						// 隐藏遮罩
						this.hideMaskAnimation(() => {
							this.isTransitioning = false;
						});
					}, 800); // 遮罩显示时间
				});
			},
			
			// 显示遮罩动画
			showMaskAnimation(callback) {
				let opacity = 0;
				const step = 0.05;
				const interval = 50;
				
				const showInterval = setInterval(() => {
					opacity += step;
					this.maskOpacity = opacity;
					
					if (opacity >= 1) {
						clearInterval(showInterval);
						if (callback) callback();
					}
				}, interval);
			},
			
			// 隐藏遮罩动画
			hideMaskAnimation(callback) {
				let opacity = 1;
				const step = 0.05;
				const interval = 50;
				
				const hideInterval = setInterval(() => {
					opacity -= step;
					this.maskOpacity = opacity;
					
					if (opacity <= 0) {
						clearInterval(hideInterval);
						if (callback) callback();
					}
				}, interval);
			}
		}
	}
</script>

<style scoped>
	.home-container {
		width: 100vw;
		height: 100vh;
		position: relative;
		overflow: hidden;
	}
	
	.start-page {
		width: 100%;
		height: 100%;
		position: relative;
		cursor: pointer;
	}
	
	.second-page {
		width: 100%;
		height: 100%;
		position: relative;
		padding-bottom: 50px; /* 为底部导航栏预留空间 */
	}
	
	.bg-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	/* 轮播图包裹框 */
	.carousel-wrapper {
		position: absolute;
		top: 20%;
		left: 50%;
		transform: translateX(-50%);
		width: 560rpx;
		height: 560rpx;
		background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3));
		border-radius: 50%;
		border: 4rpx solid rgba(255, 255, 255, 0.4);
		box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		cursor: pointer;
		transition: all 0.3s ease;
		/* 禁用点击时的默认效果 */
		-webkit-tap-highlight-color: transparent;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	
	.carousel-wrapper:hover {
		transform: translateX(-50%) scale(1.05);
		box-shadow: 0 12rpx 48rpx rgba(0, 0, 0, 0.2);
	}
	
	.carousel-wrapper:active {
		transform: translateX(-50%) scale(0.98);
	}
	
	/* 轮播图容器样式 */
	.carousel-container {
		width: 500rpx;
		height: 500rpx;
		position: relative;
	}
	
	/* 轮播内容区 */
	.carousel-content {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		overflow: hidden;
	}
	
	/* 轮播图图片样式 */
	.carousel-image {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		transition: opacity 1.5s ease;
	}
	
	/* 过渡遮罩样式 */
	.carousel-mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		border-radius: 50%;
		opacity: 0;
	}
	
	/* 留言图标样式 */
	.message-icon {
		position: absolute;
		bottom: 370rpx; /* 调整位置，为底部导航栏留出空间 */
		right: 10rpx;
		width: 100rpx;
		height: 100rpx;
		z-index: 20;
		cursor: pointer;
		transition: transform 0.3s ease;
		/* 禁用点击时的默认效果 */
		-webkit-tap-highlight-color: transparent;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		outline: none;
	}
	
	.message-icon:hover {
		transform: scale(1.1);
	}
	
	.message-icon:focus {
		outline: none;
	}
	
	.message-icon:active {
		outline: none;
		-webkit-tap-highlight-color: transparent;
	}
	
	.message-image {
		width: 100%;
		height: 100%;
	}
</style> 