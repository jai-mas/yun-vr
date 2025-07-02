<template>
	<view class="welfare-container">
		<!-- 背景图 -->
		<image class="bg-image" src="http://team-img.lizxx.com/team2/welfare/ditu.png" mode="aspectFill"></image>
		
		<!-- 标题区域 -->
		<view class="title-area">
			<!-- 返回按钮 -->
			<view class="back-btn" @click="goBack">
				<image class="back-icon" src="http://team-img.lizxx.com/team2/welfare/return.png" mode="aspectFit"></image>
			</view>
			
			<text class="main-title">三下乡 资讯</text>
			<view class="subtitle-box">
				<text class="subtitle">你我公益，造福大家</text>
			</view>
		</view>
		
		<!-- 内容模块区域 -->
		<view class="content-wrapper">
			<view class="content-area">
				<!-- 资讯卡片列表 -->
				<view class="content-card" v-for="(item, index) in newsList" :key="index" @click="goToDetail(item.id)">
					<view class="card-left">
						<image class="card-image" :src="item.image" mode="aspectFill"></image>
					</view>
					<view class="card-right">
						<text class="card-title">{{ item.title }}</text>
						<view class="card-info">
							<text class="card-date">{{ item.date }}</text>
							<text class="card-views">{{ item.views }}</text>
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
				newsList: [
					{
						id: 301,
						title: '长沙学院文化宣传团公安县文化交流纪实',
						image: 'http://team-img.lizxx.com/team2/welfare/zx301.jpg',
						date: '2024-06-11',
						views: '765'
					},
					{
						id: 302,
						title: '长沙学院法学院开展法治文化进乡村系列讲座',
						image: 'http://team-img.lizxx.com/team2/welfare/zx302.png',
						date: '2024-06-11',
						views: '765'
					},
					{
						id: 303,
						title: '科技助农 | 长沙学院在宁乡县开展农业技术培训',
						image: 'http://team-img.lizxx.com/team2/welfare/zx303.jpg',
						date: '2024-06-15',
						views: '532'
					},
					{
						id: 304,
						title: '教育资源下沉 | 长沙学院师生走进汨罗市山区',
						image: 'http://team-img.lizxx.com/team2/welfare/zx304.jpg',
						date: '2024-06-20',
						views: '621'
					},
					{
						id: 305,
						title: '健康服务进乡村 | 长沙学院医学院岳阳义诊纪实',
						image: 'http://team-img.lizxx.com/team2/welfare/zx305.jpg',
						date: '2024-06-25',
						views: '487'
					},
					{
						id: 306,
						title: '绿色家园共建设 | 长沙学院环保宣讲走进浏阳',
						image: 'http://team-img.lizxx.com/team2/welfare/zx306.jpg',
						date: '2024-06-30',
						views: '398'
					}
				]
			}
		},
		onLoad() {
			// 当接口完成后，在这里调用获取数据的方法
			// this.getNewsList();
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
			},
			// 获取资讯列表（接口完成后实现）
			getNewsList() {
				// 示例接口调用
				/*
				uni.request({
					url: 'https://your-api-url/news',
					method: 'GET',
					success: (res) => {
						if (res.statusCode === 200 && res.data.code === 0) {
							this.newsList = res.data.data;
						}
					}
				});
				*/
			},
			// 跳转到资讯详情页
			goToDetail(id) {
				uni.navigateTo({
					url: `/pages/welfare/xiangqing?id=${id}`
				});
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
							font-size: 28rpx;
							font-weight: bold;
							color: #333333;
							line-height: 1.4;
							margin-bottom: 10rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							text-overflow: ellipsis;
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
