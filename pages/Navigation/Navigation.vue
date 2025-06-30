<template>
	<view class="navigation-container">
		<!-- 背景图 -->
		<image class="bg-image" src="/static/navigation/bg.jpg" mode="aspectFill"></image>

		<!-- 景深效果背景图 -->
		<image class="depth-bg-image" src="/static/navigation/mc-bg.png"></image>

		<!-- 导航项 -->
		<!-- 游览古村镇 - 横向文字 -->
		<view class="nav-item" style="left: 25px; top: 120px;" @tap="navigateTo(navItems[0])">
			<image class="nav-bg" :src="navItems[0].bg" style="width: 150px; height: 90px;"></image>
			<image class="nav-icon" :src="navItems[0].icon" style=" left: 20px; top: 20px; width: 25px; height: 31px;">
			</image>
			<text class="nav-text horizontal-text" style="left: 60px; top: 20px;">游览古村镇</text>
		</view>

		<!-- 探索发现 - 横向文字 -->
		<view class="nav-item" style="left: 219px; top: 120px;" @tap="navigateTo(navItems[1])">
			<image class="nav-bg" :src="navItems[1].bg" style="width: 150px; height: 90px;"></image>
			<image class="nav-icon" :src="navItems[1].icon" style="left: 20px; top: 20px;"></image>
			<text class="nav-text horizontal-text" style="left: 50px; top: 20px;">探索发现</text>
		</view>

		<!-- 文创艺术 - 竖向文字 -->
		<view class="nav-item" style="left: 279px; top: 252px;" @tap="navigateTo(navItems[3])">
			<image class="nav-bg" :src="navItems[3].bg" style="width: 90px; height: 150px;"></image>
			<image class="nav-icon" :src="navItems[3].icon" style="left: 40px; top: 20px;"></image>
			<view class="vertical-text-container" style="left: 45px; top: 50px;">
				<text>文</text>
				<text>创</text>
				<text>艺</text>
				<text>术</text>
			</view>
		</view>
		<!-- 云上展馆 - 竖向文字 -->
		<view class="nav-item" style="left: 25px; top: 252px;" @tap="navigateTo(navItems[2])">
			<image class="nav-bg" :src="navItems[2].bg" style=" width: 90px; height: 150px;"></image>
			<image class="nav-icon" :src="navItems[2].icon" style="left: 20px; top: 20px;"></image>
			<view class="vertical-text-container" style="left: 25px; top: 50px;">
				<text>云</text>
				<text>上</text>
				<text>展</text>
				<text>馆</text>
			</view>
		</view>
		<!-- 特色物产 - 竖向文字 -->
		<view class="nav-item" style="left: 25px; top: 462px;" @tap="navigateTo(navItems[4])">
			<image class="nav-bg" :src="navItems[4].bg" style="width: 90px; height: 150px;"></image>
			<image class="nav-icon" :src="navItems[4].icon" style="left: 20px; top: 100px;"></image>
			<view class="vertical-text-container" style="left: 25px; top: 35px;">
				<text>特</text>
				<text>色</text>
				<text>物</text>
				<text>产</text>
			</view>
		</view>


		<!-- 公益教育 - 竖向文字 -->
		<view class="nav-item" style="left: 279px; top: 462px;" @tap="navigateTo(navItems[6])">
			<image class="nav-bg" :src="navItems[6].bg" style="width: 90px; height: 150px;"></image>
			<image class="nav-icon" :src="navItems[6].icon" style="left: 40px; top: 100px;"></image>
			<view class="vertical-text-container" style="left: 45px; top: 35px;">
				<text>公</text>
				<text>益</text>
				<text>教</text>
				<text>育</text>
			</view>
		</view>

		<!-- 地图 - 横向文字 -->
		<view class="nav-item map-item" style="left: 130px; top: 364px;" @tap="navigateTo(navItems[5])">
			<image :src="navItems[5].bg" style="width: 140px; height: 140px; border-radius: 50%; z-index: 1;">
			</image>
			<image class="nav-icon" :src="navItems[5].icon" style="left: 55px; top: 50px;"></image>
			<text class="nav-text horizontal-text" style="left: 55px; top: 75px;">地图</text>
		</view>


		<!-- 集章打卡 - 横向文字 -->
		<view class="nav-item" style="left: 25px; top: 654px;" @tap="navigateTo(navItems[7])">
			<image class="nav-bg" :src="navItems[7].bg" style="width: 150px; height: 90px;"></image>
			<image class="nav-icon" :src="navItems[7].icon" style="left: 20px; top: 45px;"></image>
			<text class="nav-text horizontal-text" style="left: 55px; top: 45px;">集章打卡</text>
		</view>

		<!-- 线下预约 - 横向文字 -->
		<view class="nav-item" style="left: 219px; top: 654px;" @tap="navigateTo(navItems[8])">
			<image class="nav-bg" :src="navItems[8].bg" style="width: 150px; height: 90px;"></image>
			<image class="nav-icon" :src="navItems[8].icon" style="left: 20px; top: 45px;"></image>
			<text class="nav-text horizontal-text" style="left: 55px; top: 45px;">线下预约</text>
		</view>

		<!-- 悬浮球和底部导航栏 -->
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
					url: ''
				},
				{
					title: '云上展馆',
					icon: '/static/icons/cloud-museum.png',
					bg: '/static/navigation/nav-bg3.png',
					url: ''
				},
				{
					title: '文创艺术',
					icon: '/static/icons/art.png',
					bg: '/static/navigation/nav-bg4.png',
					url: ''
				},
				{
					title: '特色物产',
					icon: '/static/icons/product.png',
					bg: '/static/navigation/nav-bg5.png',
					url: ''
				},
				{
					title: '地图',
					icon: '/static/icons/map.png',
					bg: '/static/navigation/nav-bg6.png',
					url: ''
				},
				{
					title: '公益教育',
					icon: '/static/icons/education.png',
					bg: '/static/navigation/nav-bg7.png',
					url: ''
				},
				{
					title: '集章打卡',
					icon: '/static/icons/stamp.png',
					bg: '/static/navigation/nav-bg8.png',
					url: ''
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
	overflow: hidden;
}

.bg-image {
	position: absolute;
	width: 390px;
	height: 801px;
	z-index: -2;
}

.depth-bg-image {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 95%;
	height: 90%;
	z-index: -1;
	opacity: 0.95;
	border-radius: 20rpx;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

/* 导航项基本样式 */
.nav-item {
	position: absolute;
	z-index: 1;
	transition: transform 0.2s ease;
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
	width: 25px;
	height: 25px;
	z-index: 10;
}

.nav-text {
	position: absolute;
	z-index: 3;
	color: #140b0b;
	font-size: 14px;
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
		font-size: 14px;
		line-height: 1.2;
	}
}
</style>
