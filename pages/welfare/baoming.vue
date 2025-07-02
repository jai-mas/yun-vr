<template>
	<view class="baoming-container">
		<!-- 背景图 -->
		<image class="bg-image" src="http://team-img.lizxx.com/team2/welfare/ditu.png" mode="aspectFill"></image>
		
		<!-- 标题区域 -->
		<view class="title-area">
			<!-- 返回按钮 -->
			<view class="back-btn" @click="goBack">
				<image class="back-icon" src="http://team-img.lizxx.com/team2/welfare/return.png" mode="aspectFit"></image>
			</view>
			
			<text class="main-title">三下乡 报名</text>
			<view class="subtitle-box">
				<text class="subtitle">你我公益，造福大家</text>
			</view>
		</view>
		
		<!-- 内容模块区域 -->
		<view class="content-wrapper">
			<view class="content-area">
				<view class="form-area">
					<view class="form-item">
						<text class="form-label">所在院校</text>
						<input class="form-input" type="text" placeholder="请输入所在院校" v-model="formData.school" />
					</view>
					<view class="form-item">
						<text class="form-label">学号</text>
						<input class="form-input" type="text" placeholder="请输入学号" v-model="formData.studentId" />
					</view>
					<view class="form-item">
						<text class="form-label">真实姓名</text>
						<input class="form-input" type="text" placeholder="请输入真实姓名" v-model="formData.name" />
					</view>
					<view class="form-item">
						<text class="form-label">身份证号</text>
						<input class="form-input" type="idcard" placeholder="请输入身份证号" v-model="formData.idCard" />
					</view>
					<view class="form-notice">
						<text class="notice-text">* 填写以上信息即表示同意《隐私政策》，报名成功后不可更改，请确保信息真实有效</text>
					</view>
				</view>
				
				<view class="submit-btn-area">
					<button class="submit-btn" @click="submitForm">报名</button>
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
				formData: {
					school: '',
					studentId: '',
					name: '',
					idCard: ''
				}
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
			},
			submitForm() {
				// 表单验证
				if (!this.formData.school || !this.formData.studentId || !this.formData.name || !this.formData.idCard) {
					uni.showToast({
						title: '请填写完整信息',
						icon: 'none'
					});
					return;
				}
				
				// 提交表单
				uni.showLoading({
					title: '提交中...'
				});
				
				// 模拟提交
				setTimeout(() => {
					uni.hideLoading();
					uni.showToast({
						title: '报名成功',
						icon: 'success',
						duration: 2000,
						success: () => {
							setTimeout(() => {
								this.goBack();
							}, 2000);
						}
					});
				}, 1500);
			}
		}
	}
</script>

<style lang="scss">
	.baoming-container {
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
				
				.form-area {
					display: flex;
					flex-direction: column;
					
					.form-item {
						display: flex;
						flex-direction: column;
						padding: 20rpx 0;
						border-bottom: 1rpx solid #EEEEEE;
						
						.form-label {
							font-size: 30rpx;
							color: #333333;
							margin-bottom: 10rpx;
						}
						
						.form-input {
							height: 60rpx;
							background-color: transparent;
							border: none;
							font-size: 28rpx;
							color: #999;
						}
					}
					
					.form-notice {
						margin-top: 20rpx;
						padding: 0 10rpx;
						
						.notice-text {
							font-size: 22rpx;
							color: #FF0000;
							line-height: 1.4;
						}
					}
				}
				
				.submit-btn-area {
					display: flex;
					justify-content: center;
					margin-top: 60rpx;
					margin-bottom: 20rpx;
					
					.submit-btn {
						width: 240rpx;
						height: 80rpx;
						background-color: #F0D9B5;
						color: #333333;
						font-size: 32rpx;
						border-radius: 40rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						border: none;
						box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
					}
				}
			}
		}
	}
</style>
