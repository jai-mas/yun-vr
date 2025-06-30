<template>
	<view class="welfare-container">
		<!-- 背景图 -->
		<image class="bg-image" src="/static/welfare/ditu.png" mode="aspectFill"></image>
		
		<!-- 标题区域 -->
		<view class="title-area">
			<text class="main-title">公益教育</text>
			<view class="subtitle-box">
				<text class="subtitle">你我公益，造福大家</text>
			</view>
		</view>
		
		<!-- 内容模块区域 -->
		<view class="modules-container">
			<!-- 三下乡活动 -->
			<view class="module-card" @click="navigateTo('/pages/welfare/welfare-item01')">
				<view class="card-left">
					<text class="card-title">三下乡 活动</text>
					<text class="card-desc">长沙老牌三下乡\n全方新媒文化基站</text>
				</view>
				<view class="card-right">
					<image class="card-image" src="/static/welfare/mk01.png" mode="aspectFit"></image>
				</view>
			</view>
			
			<!-- 三下乡活动报名 -->
			<view class="module-card" @click="navigateTo('/pages/welfare/welfare-item02')">
				<view class="card-left">
					<text class="card-title">三下乡 活动报名</text>
					<text class="card-desc">进一步动员到位青年学生\n在社会实践中受锻炼、长才干与\n思想中受教育，培养实践\n作业素养</text>
				</view>
				<view class="card-right">
					<image class="card-image" src="/static/welfare/mk02.png" mode="aspectFit"></image>
				</view>
			</view>
			
			<!-- 三下乡活动资讯 -->
			<view class="module-card" @click="navigateTo('/pages/welfare/welfare-item03')">
				<view class="card-left">
					<text class="card-title">三下乡 活动资讯</text>
					<text class="card-desc">青春远征\n汗滴禾下土沃壤\n筑梦学校</text>
				</view>
				<view class="card-right">
					<image class="card-image" src="/static/welfare/mk03.png" mode="aspectFit"></image>
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
			padding: 180rpx 70rpx 70rpx; /* 上边距增加90rpx，从90rpx调整为180rpx */
			flex-direction: column;
			display: flex;
			align-items: flex-start;
			
			.main-title {
				font-size: 80rpx; /* 保持主标题高度不变 */
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
				margin-bottom: 60rpx; /* 调整与内容模块的间距 */
				
				.subtitle {
					color: #FFFFFF;
					font-size: 28rpx;
					font-family: "楷体", KaiTi, serif;
				}
			}
		}
		
		.modules-container {
			padding: 0 70rpx;
			display: flex;
			flex-direction: column;
			gap: 40rpx;
			
			.module-card {
				background-color: rgba(255, 255, 255, 0.8); /* 80%透明度 */
				border-radius: 20rpx;
				padding: 30rpx;
				display: flex;
				box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.15); /* 外阴影 */
				
				.card-left {
					flex: 1;
					display: flex;
					flex-direction: column;
					
					.card-title {
						font-size: 32rpx;
						font-weight: bold;
						color: #333333;
						margin-bottom: 16rpx;
					}
					
					.card-desc {
						font-size: 24rpx;
						color: #666666;
						line-height: 1.5;
					}
				}
				
				.card-right {
					width: 120rpx;
					height: 120rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					
					.card-image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
			}
		}
	}
</style>
