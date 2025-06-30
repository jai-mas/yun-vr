<template>
	<view class="collection-container">
		<!-- 背景图 -->
		<image class="bg-image" src="/static/welfare/ditu.png" mode="aspectFill"></image>
		
		<!-- 顶部返回按钮 -->
		<view class="back-btn" @click="goBack">
			<image class="back-icon" src="/static/welfare/return.png" mode="aspectFit"></image>
		</view>
		
		<!-- 导航标签栏 -->
		<view class="nav-header">
			<view class="tab-container">
				<view class="tab-item" :class="{ active: activeTab === 'explore' }" @click="switchTab('explore')">
					探索发现
				</view>
				<view class="tab-item" :class="{ active: activeTab === 'craft' }" @click="switchTab('craft')">
					工艺教育
				</view>
				<view class="tab-item" :class="{ active: activeTab === 'culture' }" @click="switchTab('culture')">
					文创艺术
				</view>
				<view class="tab-item" :class="{ active: activeTab === 'property' }" @click="switchTab('property')">
					物产
				</view>
			</view>
			<!-- 指示器作为独立元素 -->
			<view class="active-indicator" :style="{ left: indicatorLeft }"></view>
		</view>
		
		<!-- 内容区域 -->
		<view class="content-area">
			<!-- 景点列表 -->
			<view class="scenic-list">
				<view class="scenic-item" v-for="(item, index) in scenicList" :key="index" @click="goToDetail(item.id)">
					<view class="item-content">
						<image class="item-image" :src="item.image" mode="aspectFill"></image>
						<text class="item-title">{{ item.title }}</text>
						<text class="item-arrow">></text>
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
				activeTab: 'property', // 默认选中"物产"标签
				scenicList: [
					{
						id: 1,
						title: '永恒奇茶',
						image: '/static/product/1.png'
					},
					{
						id: 2,
						title: '永恒黑山羊',
						image: '/static/product/2.png'
					}
				],
				indicatorLeft: '87.5%' // 默认指示器位置（物产标签）
			};
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			switchTab(tab) {
				this.activeTab = tab;
				// 设置指示器位置
				switch(tab) {
					case 'explore':
						this.indicatorLeft = '12.5%';
						break;
					case 'craft':
						this.indicatorLeft = '37.5%';
						break;
					case 'culture':
						this.indicatorLeft = '62.5%';
						break;
					case 'property':
						this.indicatorLeft = '87.5%';
						break;
				}
				// 切换标签时加载对应的数据
				this.loadTabData(tab);
			},
			loadTabData(tab) {
				// 根据不同标签加载不同数据
				switch(tab) {
					case 'explore':
						// 加载探索发现数据
						this.scenicList = [
							{
								id: 1,
								title: '永恒奇茶',
								image: '/static/product/1.png'
							},
							
						];
						break;
					case 'craft':
						// 加载工艺教育数据
						break;
					case 'culture':
						// 加载文创艺术数据
						break;
					case 'property':
						// 加载物产数据
						this.scenicList = [
							{
								id: 1,
								title: '永恒奇茶',
								image: '/static/product/1.png'
							},
							{
								id: 2,
								title: '永恒黑山羊',
								image: '/static/product/2.png'
							}
						];
						break;
				}
			},
			goToDetail(id) {
				// 跳转到详情页
				uni.navigateTo({
					url: `/pages/collection/detail?id=${id}`
				});
			}
		},
		onLoad() {
			// 初始化加载数据
			this.loadTabData(this.activeTab);
		}
	}
</script>

<style lang="scss">
	.collection-container {
		position: relative;
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		
		.bg-image {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
		}
		
		.back-btn {
			position: fixed;
			top: 90rpx;
			left: 30rpx;
			width: 60rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 10;
			
			.back-icon {
				width: 40rpx;
				height: 40rpx;
			}
		}
		
		.nav-header {
			margin-top: 180rpx;
			padding: 30rpx 0 10rpx;
			position: relative;
			z-index: 5;
			
			.tab-container {
				display: flex;
				justify-content: space-around;
				align-items: center;
				padding: 0;
				position: relative;
				
				.tab-item {
					padding: 15rpx 0;
					font-size: 28rpx;
					color: #333;
					position: relative;
					flex: 1;
					text-align: center;
					
					&.active {
						color: #4CAF50;
						font-weight: 500;
					}
				}
			}
			
			.active-indicator {
				position: absolute;
				bottom: -2rpx;
				width: 40rpx;
				height: 4rpx;
				background-color: #4CAF50;
				border-radius: 2rpx;
				transition: left 0.3s ease;
				transform: translateX(-50%);
			}
		}
		
		.content-area {
			flex: 1;
			position: relative;
			padding-top: 10rpx;
			padding-bottom: 30rpx;
			
			.scenic-list {
				position: relative;
				padding: 20rpx 30rpx;
				
				.scenic-item {
					margin-bottom: 30rpx;
					
					.item-content {
						background-color: rgba(255, 255, 255, 0.9);
						border-radius: 16rpx;
						padding: 30rpx 20rpx;
						display: flex;
						align-items: center;
						box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
						
						.item-image {
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
							margin-right: 30rpx;
						}
						
						.item-title {
							flex: 1;
							font-size: 30rpx;
							color: #333;
						}
						
						.item-arrow {
							font-size: 30rpx;
							color: #999;
							margin-right: 10rpx;
						}
					}
				}
			}
		}
	}
</style>
