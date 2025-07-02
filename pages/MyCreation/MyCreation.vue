<template>
	<view class="creation-container">
		<!-- 背景图 -->
		<image class="bg-image" src="http://team-img.lizxx.com/team2/navigation/bg.jpg" mode="aspectFill"></image>
		<image class="back-icon" src="http://team-img.lizxx.com/team2/map/arrow.png" @click="goBack" mode=""></image>

		<!-- 小背景图，创建景深效果 -->
		<image class="small-bg-image" src="http://team-img.lizxx.com/team2/navigation/mc-bg.png" mode="aspectFill"></image>

		<view class="content-wrapper">
			<!-- 页面标题 -->
			<view class="page-header">
				<text class="header-title">已发布作品</text>
			</view>

			<!-- 作品列表 -->
			<view class="creation-list">
				<view class="creation-item" v-for="(item, index) in creationList" :key="index">
					<view class="item-content">
						<text class="item-title">作品名称: {{ item.name }}</text>
						<view class="item-info">
							<text class="item-desc">{{ item.description }}</text>
							<text class="item-date">发布时间: {{ item.createTime }}</text>
						</view>
					</view>
					<view class="item-actions">
						<button class="action-btn hide-btn" @click="hideItem(item)">隐藏</button>
						<button class="action-btn delete-btn" @click="deleteItem(item.id)">删除</button>
					</view>
				</view>
				<view class="empty-tip" v-if="creationList.length === 0">
					<text>暂无作品</text>
				</view>
			</view>
		</view>

		<TabBar current="myCreation" />
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
			// 模拟数据
			mockData: [
				{
					id: 1001,
					name: '云端美术馆',
					description: '一个虚拟美术馆展示，包含多幅名画作品',
					createTime: '2023-05-15 14:30'
				},
				{
					id: 1002,
					name: '星空漫游',
					description: '沉浸式星空体验，可以在宇宙中自由漫游',
					createTime: '2023-06-22 09:45'
				},
				{
					id: 1003,
					name: '海底世界',
					description: '探索神秘的海底世界，与海洋生物互动',
					createTime: '2023-07-08 16:20'
				},
				{
					id: 1004,
					name: '古代文明',
					description: '重现古埃及文明，参观金字塔内部结构',
					createTime: '2023-08-30 11:15'
				},
				{
					id: 1005,
					name: '未来城市',
					description: '2050年的城市景观，展示未来科技与建筑',
					createTime: '2023-09-12 15:40'
				}
			],
			creationList: [],
			loading: false,
			useMockData: true // 控制是否使用模拟数据
		}
	},
	onLoad() {
		this.getCreationList()
	},
	methods: {
		goBack(){
			uni.navigateBack();
		},
		// 获取作品列表
		getCreationList() {
			this.loading = true

			// 使用模拟数据
			if (this.useMockData) {
				setTimeout(() => {
					this.creationList = this.mockData
					this.loading = false
				}, 500) // 模拟网络延迟
				return
			}

			// 正常接口调用
			getCreationList()
				.then(res => {
					if (res && res.data) {
						this.creationList = res.data
					} else {
						this.creationList = []
					}
				})
				.catch(err => {
					console.error('获取作品列表失败', err)
					uni.showToast({
						title: '获取数据失败',
						icon: 'none'
					})
				})
				.finally(() => {
					this.loading = false
				})
		},

		// 隐藏作品（暂不实现功能）
		hideItem(item) {
			uni.showToast({
				title: '隐藏功能暂未实现',
				icon: 'none'
			})
		},

		// 删除作品
		deleteItem(id) {
			uni.showModal({
				title: '提示',
				content: '确定要删除该作品吗？',
				success: (res) => {
					if (res.confirm) {
						if (this.useMockData) {
							// 使用模拟数据时，直接从本地删除
							const index = this.creationList.findIndex(item => item.id === id)
							if (index !== -1) {
								this.creationList.splice(index, 1)
								uni.showToast({
									title: '删除成功'
								})
							}
							return
						}

						// 正常接口调用
						deleteCreation(id)
							.then(res => {
								if (res && res.code === 200) {
									uni.showToast({
										title: '删除成功'
									})
									// 重新加载列表
									this.getCreationList()
								} else {
									uni.showToast({
										title: '删除失败',
										icon: 'none'
									})
								}
							})
							.catch(err => {
								console.error('删除失败', err)
								uni.showToast({
									title: '删除失败',
									icon: 'none'
								})
							})
					}
				}
			})
		}
	}
}
</script>

<style>
.creation-container {
	position: relative;
	min-height: 100vh;
	padding: 20rpx;
}
.back-icon {
      width: 32rpx;
      height: 32rpx;
      margin-right: 10rpx;
	  margin-top: 60rpx;
    }
.bg-image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -2;
}

.small-bg-image {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 95%;
	height: 80%;
	z-index: -1;
	opacity: 0.8;
	border-radius: 20rpx;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.content-wrapper {
	position: relative;
	z-index: 1;
}

.page-header {
	padding: 100rpx 0;
	text-align: center;
}

.header-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
}

.creation-list {
	padding: 20rpx;
}

.creation-item {
	background-color: rgba(255, 255, 255, 0.8);
	border-radius: 12rpx;
	padding: 24rpx;
	margin-bottom: 20rpx;
	display: flex;
	flex-direction: column;
	backdrop-filter: blur(5px);
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.item-content {
	margin-bottom: 16rpx;
}

.item-title {
	font-size: 30rpx;
	color: #333;
	font-weight: bold;
	margin-bottom: 10rpx;
}

.item-info {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.item-desc {
	font-size: 26rpx;
	color: #666;
}

.item-date {
	font-size: 24rpx;
	color: #999;
	margin-top: 6rpx;
}

.item-actions {
	display: flex;
	justify-content: flex-end;
	margin-top: 10rpx;
}

.action-btn {
	font-size: 24rpx;
	padding: 6rpx 20rpx;
	line-height: 1.5;
	border-radius: 30rpx;
}

.hide-btn {
	margin-left: 350rpx;
	background-color: #F0F0F0;
	color: #666;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.delete-btn {
	margin-left: 20rpx;
	background-color: #ff6666;
	color: #fff;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.empty-tip {
	text-align: center;
	padding: 60rpx 0;
	color: #999;
	font-size: 28rpx;
}
</style>
