<template>
	<view class="navigation-container">
		<!-- 背景图 -->
		<image class="bg-image" src="/static/navigation/bg.jpg" mode="aspectFill"></image>

		<!-- 页面标题 -->
		<view class="page-title-container">
			<text class="page-title">导览</text>
			<view class="title-divider"></view>
		</view>

		<!-- 导航项 -->
		<!-- 游览古村镇 - 横向文字 -->
		<view class="nav-item" style="left: 25px; top: 120px; width: 150px; height: 90px;"
			@tap="navigateTo(navItems[0])">
			<image class="nav-icon" :src="navItems[0].icon" style="left: 20px; top: 30px; width: 25px; height: 31px;">
			</image>
			<text class="nav-text horizontal-text" style="left: 60px; top: 35px;">游览古村镇</text>
		</view>

		<!-- 探索发现 - 横向文字 -->
		<view class="nav-item" style="left: 219px; top: 120px; width: 150px; height: 90px;"
			@tap="navigateTo(navItems[1])">
			<image class="nav-icon" :src="navItems[1].icon" style="left: 20px; top: 30px;"></image>
			<text class="nav-text horizontal-text" style="left: 50px; top: 35px;">探索发现</text>
		</view>

		<!-- 文创艺术 - 竖向文字 -->
		<view class="nav-item" style="left: 279px; top: 252px; width: 90px; height: 150px;"
			@tap="navigateTo(navItems[3])">
			<image class="nav-icon" :src="navItems[3].icon" style="left: 30px; top: 20px;"></image>
			<view class="vertical-text-container" style="left: 35px; top: 50px;">
				<text>文</text>
				<text>创</text>
				<text>艺</text>
				<text>术</text>
			</view>
		</view>
		<!-- 云上展馆 - 竖向文字 -->
		<view class="nav-item" style="left: 25px; top: 252px; width: 90px; height: 150px;"
			@tap="navigateTo(navItems[2])">
			<image class="nav-icon" :src="navItems[2].icon" style="left: 30px; top: 20px;"></image>
			<view class="vertical-text-container" style="left: 35px; top: 50px;">
				<text>云</text>
				<text>上</text>
				<text>展</text>
				<text>馆</text>
			</view>
		</view>
		<!-- 特色物产 - 竖向文字 -->
		<view class="nav-item" style="left: 25px; top: 462px; width: 90px; height: 150px;"
			@tap="navigateTo(navItems[4])">
			<image class="nav-icon" :src="navItems[4].icon" style="left: 30px; top: 100px;"></image>
			<view class="vertical-text-container" style="left: 37px; top: 25px;">
				<text>特</text>
				<text>色</text>
				<text>物</text>
				<text>产</text>
			</view>
		</view>


		<!-- 公益教育 - 竖向文字 -->
		<view class="nav-item" style="left: 279px; top: 462px; width: 90px; height: 150px;"
			@tap="navigateTo(navItems[6])">
			<image class="nav-icon" :src="navItems[6].icon" style="left: 30px; top: 100px;"></image>
			<view class="vertical-text-container" style="left: 37px; top: 24px;">
				<text>公</text>
				<text>益</text>
				<text>教</text>
				<text>育</text>
			</view>
		</view>

		<!-- 地图 - 横向文字 -->
		<view class="nav-item map-item"
			style="left: 137px; top: 364px; width: 120px; height: 120px; border-radius: 50%;"
			@tap="navigateTo(navItems[5])">
			<image class="nav-icon" :src="navItems[5].icon" style="left: 45px; top: 40px;"></image>
			<text class="nav-text horizontal-text" style="left: 45px; top: 75px;">地图</text>
		</view>


		<!-- 集章打卡 - 横向文字 -->
		<view class="nav-item" style="left: 25px; top: 654px; width: 150px; height: 90px;"
			@tap="navigateTo(navItems[7])">
			<image class="nav-icon" :src="navItems[7].icon" style="left: 20px; top: 35px;"></image>
			<text class="nav-text horizontal-text" style="left: 55px; top: 37px;">集章打卡</text>
		</view>

		<!-- 线下预约 - 横向文字 -->
		<view class="nav-item" style="left: 219px; top: 654px; width: 150px; height: 90px;"
			@tap="navigateTo(navItems[8])">
			<image class="nav-icon" :src="navItems[8].icon" style="left: 20px; top: 35px;"></image>
			<text class="nav-text horizontal-text" style="left: 55px; top: 37px;">线下预约</text>
		</view>

		<!-- 底部导航栏 -->
		<TabBar current="navigation" />
	</view>
</template>

<script>
import FloatBall from '@/compents/FloatBall.vue'
import TabBar from '@/compents/TabBar.vue'
import router from '@/common/router.js'

export default {
	components: {
		FloatBall,
		TabBar
	},
	data() {
		return {
			navItems: [
				{
					title: '游览古村镇',
					icon: '/static/icons/village.png',
					bg: '/static/navigation/nav-bg1.png',
					url: ''
				},
				{
					title: '探索发现',
					icon: '/static/icons/discover.png',
					bg: '/static/navigation/nav-bg2.png',
					url: '/pages/tansuo/faxian'
				},
				{
					title: '云上展馆',
					icon: '/static/icons/cloud-museum.png',
					bg: '/static/navigation/nav-bg3.png',
					url: '/pages/exhibition/exhibition'
				},
				{
					title: '文创艺术',
					icon: '/static/icons/art.png',
					bg: '/static/navigation/nav-bg4.png',
					url: '/pages/MyCreation/MyCreation'
				},
				{
					title: '特色物产',
					icon: '/static/icons/product.png',
					bg: '/static/navigation/nav-bg5.png',
					url: '/pages/Products/products'
				},
				{
					title: '地图',
					icon: '/static/icons/map.png',
					bg: '/static/navigation/nav-bg6.png',
					url: '/pages/map/map'
				},
				{
					title: '公益教育',
					icon: '/static/icons/education.png',
					bg: '/static/navigation/nav-bg7.png',
					url: '/pages/welfare/welfare-main'
				},
				{
					title: '集章打卡',
					icon: '/static/icons/stamp.png',
					bg: '/static/navigation/nav-bg8.png',
					url: '/pages/CheckIn/CheckIn'
				},
				{
					title: '线下预约',
					icon: '/static/icons/appointment.png',
					bg: '/static/navigation/nav-bg9.png',
					url: ''
				}
			]
		}
	},
	methods: {
		// 导航到指定页面
		navigateTo(item) {
			if (item.url) {
				router.navigateTo(item.url)
			} else {
				uni.showToast({
					title: '该功能暂未开放',
					icon: 'none'
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.navigation-container {
	position: relative;
	height: 100vh;
	width: 100%;
	min-height: 100%;
	display: flex;
	flex-direction: column;
}

.bg-image {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -2;
	object-fit: cover;
}

.page-title-container {
	padding: 50px 40px 10px;
	position: relative;
	z-index: 10;
}

.page-title {
	font-size: 32px;
	font-weight: bold;
	color: #333;
}

.title-divider {
	margin-top: 10px;
	height: 1px;
	background-color: #e0e0e0;
	width: 100%;
}

/* 导航项基本样式 */
.nav-item {
	position: absolute;
	z-index: 1;
	transition: transform 0.2s ease;
	border-radius: 12px;
	background-color: white;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	display: flex;
	align-items: center;
	justify-content: center;
}

.nav-item:active {
	transform: scale(0.95);
}

.nav-bg {
	position: absolute;
	border-radius: 8px;
	z-index: 1;
}

.map-bg {
	width: 140px;
	height: 140px;
	border-radius: 50%;
}

.nav-icon {
	position: absolute;
	width: 30px;
	height: 30px;
	z-index: 10;
}

.nav-text {
	position: absolute;
	z-index: 3;
	color: #140b0b;
	font-size: 16px;
}

.horizontal-text {
	writing-mode: horizontal-tb !important;
	/* 水平方向，从左到右 */
	white-space: nowrap;
}

.vertical-text-container {
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 3;

	text {
		color: #140b0b;
		font-size: 16px;
		line-height: 1.2;
	}
}
</style>
