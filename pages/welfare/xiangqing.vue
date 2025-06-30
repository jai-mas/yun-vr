<template>
	<view class="detail-container">
		<!-- 顶部图片区域 -->
		<view class="top-image-area">
			<image class="top-image" :src="'/static/welfare/xq01.png'" mode="aspectFill"></image>
			
			<!-- 返回按钮 -->
			<view class="back-btn" @click="goBack">
				<image class="back-icon" src="/static/welfare/return.png" mode="aspectFit"></image>
			</view>
			
			<!-- 收藏按钮 -->
			<view class="collect-btn" @click="toggleCollect">
				<text class="collect-icon" :class="{ 'collected': isCollected }">★</text>
			</view>
			
			<!-- 白色椭圆标题 -->
			<view class="oval-title-container">
				<view class="oval-title-bg">
					<text class="oval-title">{{ detailData.title || '长沙学院文化宣传团赴公安县宣传文化活动' }}</text>
				</view>
			</view>
		</view>
		
		<!-- 内容区域 -->
		<view class="content-area">
			<!-- 详情文本 -->
			<view class="detail-text">
				<text class="text-content">{{ detailData.content || '在长沙，有一群活跃着一份青春的服务女孩子，她们永远一致的集体意识，又有时间根据下属部的安排，各个击破难事，她们不仅在宿舍中互帮互助，还会在课余时间，沿着水边走步又或者在操场跑一圈慢跑水边在宿舍唱歌上课下课，今年，吉祥如意，主要是，遇见不一样的美。' }}</text>
			</view>
			
			<!-- 详情图片 -->
			<view class="detail-images">
				<image 
					v-for="(img, index) in detailData.images || ['/static/welfare/1db9a084-3788-47d0-9c69-86f80ad13e77.png']" 
					:key="index" 
					:src="img" 
					mode="widthFix" 
					class="detail-img"
				></image>
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
			id: null,
			isCollected: false,
			detailData: {
				title: '长沙学院文化宣传团赴公安县宣传文化活动',
				content: '在长沙，有一群活跃着一份青春的服务女孩子，她们永远一致的集体意识，又有时间根据下属部的安排，各个击破难事，她们不仅在宿舍中互帮互助，还会在课余时间，沿着水边走步又或者在操场跑一圈慢跑水边在宿舍唱歌上课下课，今年，吉祥如意，主要是，遇见不一样的美。',
				images: ['/static/welfare/1db9a084-3788-47d0-9c69-86f80ad13e77.png']
			}
		};
	},
	onLoad(options) {
		if (options.id) {
			this.id = options.id;
			this.getDetailData(this.id);
		}
	},
	methods: {
		goBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		toggleCollect() {
			this.isCollected = !this.isCollected;
			uni.showToast({
				title: this.isCollected ? '已收藏' : '已取消收藏',
				icon: 'none'
			});
		},
		getDetailData(id) {
			// 模拟接口调用，实际开发中替换为真实接口
			// 示例接口调用
			/*
			uni.request({
				url: `https://your-api-url/detail/${id}`,
				method: 'GET',
				success: (res) => {
					if (res.statusCode === 200 && res.data.code === 0) {
						this.detailData = res.data.data;
					}
				},
				fail: () => {
					uni.showToast({
						title: '获取详情失败',
						icon: 'none'
					});
				}
			});
			*/
		}
	}
};
</script>

<style lang="scss">
.detail-container {
	position: relative;
	width: 100%;
	min-height: 100vh;
	background-color: #FFFFFF;
	
	.top-image-area {
		position: relative;
		width: 100%;
		height: 500rpx;
		
		.top-image {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
		}
		
		.back-btn {
			position: absolute;
			top: 80rpx;
			left: 30rpx;
			width: 60rpx;
			height: 60rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 10;
			
			.back-icon {
				width: 60rpx;
				height: 60rpx;
			}
		}
		
		.collect-btn {
			position: absolute;
			top: 80rpx;
			right: 30rpx;
			width: 80rpx;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 10;
			background-color: rgba(0, 0, 0, 0.2);
			border-radius: 50%;
			
			.collect-icon {
				font-size: 50rpx;
				color: #FFFFFF;
				line-height: 1;
				
				&.collected {
					color: #F87B34;
				}
			}
		}
		
		.oval-title-container {
			position: absolute;
			bottom: -30rpx;
			left: 0;
			width: 100%;
			display: flex;
			justify-content: center;
			z-index: 10;
			
			.oval-title-bg {
				background-color: #FFFFFF;
				border-radius: 40rpx;
				padding: 20rpx 40rpx;
				min-width: 60%;
				max-width: 80%;
				box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
				display: flex;
				justify-content: center;
				align-items: center;
				
				.oval-title {
					font-size: 32rpx;
					font-weight: bold;
					color: #333333;
					text-align: center;
					line-height: 1.4;
				}
			}
		}
	}
	
	.content-area {
		position: relative;
		padding: 60rpx 40rpx 40rpx;
		
		.detail-text {
			margin-top: 30rpx;
			
			.text-content {
				font-size: 28rpx;
				color: #666666;
				line-height: 1.8;
			}
		}
		
		.detail-images {
			margin-top: 30rpx;
			
			.detail-img {
				width: 100%;
				margin-bottom: 20rpx;
				border-radius: 10rpx;
			}
		}
	}
}
</style>