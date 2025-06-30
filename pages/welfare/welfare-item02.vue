<template>
	<view class="welfare-container">
		<!-- 背景图 -->
		<image class="bg-image" src="/static/welfare/ditu.png" mode="aspectFill"></image>
		
		<!-- 标题区域 -->
		<view class="title-area">
			<!-- 返回按钮 -->
			<view class="back-btn" @click="goBack">
				<image class="back-icon" src="/static/welfare/return.png" mode="aspectFit"></image>
			</view>
			
			<text class="main-title">三下乡 报名</text>
			<view class="subtitle-box">
				<text class="subtitle">你我公益，造福大家</text>
			</view>
		</view>
		
		<!-- 内容模块区域 -->
		<view class="content-wrapper">
			<view class="content-area">
				<view class="content-card" @click="navigateTo('/pages/welfare/baoming')">
					<view class="card-left">
						<image class="card-image" src="/static/welfare/mk02.png" mode="aspectFit"></image>
					</view>
					<view class="card-right">
						<text class="card-title">长沙学院三下乡——益开法治下乡活动报名通知</text>
						<view class="card-info">
							<text class="card-date">2024-06-11</text>
							<text class="card-views">765</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部导航栏 -->
		<TabBar current="navigation" />		
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
				
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			navigateTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			switchTab(tab) {
				// 根据实际路由配置调整
				const routes = {
					home: '/pages/home/home',
					category: '/pages/category/category',
					user: '/pages/user/user'
				}
				
				uni.switchTab({
					url: routes[tab]
				})
			}
		}
	}
</script>

<style lang="scss">
	.welfare-container {
		position: relative;
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		
		.bg-image {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
		}
		
		.title-area {
			padding: 90rpx 70rpx 70rpx; /* 左右边距调整为70rpx */
			flex-direction: column;
			display: flex;
			align-items: flex-start;
			
			.back-btn {
				width: 60rpx;
				height: 60rpx;
				margin-bottom: 80rpx; /* 增加与主标题的间距 */
				margin-left: -60rpx; /* 左移60rpx */
				display: flex;
				justify-content: center;
				align-items: center;
				
				.back-icon {
					width: 60rpx; /* 扩大50% */
					height: 60rpx; /* 扩大50% */
				}
			}
			
			.main-title {
				font-size: 80rpx; /* 字体进一步扩大 */
				font-weight: bold;
				color: #138358;
				margin-bottom: 70rpx; /* 增加与副标题的间距 */
				display: inline-block;
				width: auto;
			}
			
			.subtitle-box {
				display: inline-block;
				width: auto;
				background-color: #F87B34;
				border-radius: 30rpx;
				padding: 10rpx 30rpx;
				margin-bottom: 120rpx; /* 增加与内容模块的间距 */
				
				.subtitle {
					color: #FFFFFF;
					font-size: 28rpx;
					font-family: "楷体", KaiTi, serif;
				}
			}
		}
		
		.content-wrapper {
			position: absolute;
			top: calc(90rpx + 60rpx + 80rpx + 80rpx + 70rpx + 28rpx + 20rpx + 120rpx); /* 调整后的标题区域高度 + 副标题底部间距120rpx */
			left: 70rpx; /* 扩大左边距 */
			right: 70rpx; /* 扩大右边距 */
			bottom: 30rpx;
			background-color: rgba(255, 255, 255, 0.8); /* 80%透明度 */
			border-radius: 20rpx;
			overflow: hidden;
			box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.15);
			
			.content-area {
				width: 100%;
				height: 100%;
				padding: 20rpx;
				box-sizing: border-box;
				overflow-y: auto;
				
				.content-card {
					display: flex;
					flex-direction: row;
					padding: 20rpx;
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
					
					.card-left {
						width: 160rpx;
						height: 120rpx;
						margin-right: 20rpx;
						
						.card-image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}
					
					.card-right {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						
						.card-title {
							font-size: 32rpx;
							font-weight: bold;
							color: #333333;
							line-height: 1.5;
							margin-bottom: 10rpx;
						}
						
						.card-info {
							display: flex;
							justify-content: space-between;
							align-items: center;
							
							.card-date {
								font-size: 24rpx;
								color: #666666;
							}
							
							.card-views {
								font-size: 24rpx;
								color: #999999;
								margin-left: auto;
							}
						}
					}
				}
			}
		}
		
		.tabbar {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100rpx;
			background-color: #FFFFFF;
			display: flex;
			box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
			z-index: 10;
			
			.tab-item {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
				.tab-icon {
					width: 50rpx;
					height: 50rpx;
					margin-bottom: 6rpx;
				}
				
				.tab-text {
					font-size: 22rpx;
					color: #666666;
				}
			}
		}
	}
</style>
