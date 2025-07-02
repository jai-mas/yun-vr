<template>
	<view class="message-container">
		<!-- 背景图铺满整个界面 -->
		<image class="full-bg" src="http://team-img.lizxx.com/team2/leavemessage/背景.png" mode="aspectFill"></image>
		
		<!-- 标题图片 -->
		<view class="title-section" :style="{ paddingTop: statusBarHeight + 20 + 'px' }">
			<image class="title-image" src="http://team-img.lizxx.com/team2/leavemessage/image.png" mode="aspectFit"></image>
		</view>

		<!-- 轮播图区域 -->
		<view class="swiper-section">
			<swiper 
				class="banner-swiper" 
				:indicator-dots="true" 
				:autoplay="true" 
				:interval="4000" 
				:duration="800"
				:circular="true"
				indicator-color="rgba(255, 255, 255, 0.5)"
				indicator-active-color="#ffffff"
				@change="onSwiperChange"
			>
				<swiper-item v-for="(item, index) in bannerList" :key="index" @click="onBannerClick(item, index)">
					<view class="swiper-item">
						<image class="banner-image" :src="item.imageUrl" mode="aspectFill"></image>
						<view class="banner-overlay">
							<text class="banner-title">{{ item.title }}</text>
							<text class="banner-desc">{{ item.description }}</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 主要内容区域 -->
		<view class="main-content">
					<!-- 留言列表 -->
		<view class="message-list-container" :style="{ height: listHeight + 'px' }">
			<view v-for="(message, index) in messageList" :key="index" class="message-item" 
				:style="{
					position: 'absolute',
					left: messagePositions[index % messagePositions.length].left,
					top: messagePositions[index % messagePositions.length].top,
					transform: messagePositions[index % messagePositions.length].transform,
					width: '200rpx',
					height: '200rpx',
					zIndex: 3
				}">
				<!-- 便签背景 -->
				<image class="note-bg" :src="getNoteBgImage(index)" mode="aspectFit"></image>
				
				<!-- 留言内容 -->
				<view class="note-content">
					<text class="note-text">{{ message.content }}</text>
				</view>
			</view>
		</view>
		</view>
		
		<!-- 发送留言区域 - 固定在底部 -->
		<view class="send-area-fixed">
			<view class="input-container">
				<!-- 输入框 -->
				<view class="input-wrapper">
					<input 
						class="message-input" 
						type="text" 
						placeholder="写下你的留言..." 
						v-model="newMessage"
						maxlength="200"
						@confirm="sendMessage"
					/>
				</view>
				
				<!-- 发送按钮 -->
				<view class="send-btn" @click="sendMessage">
					<text class="send-btn-text">发送</text>
				</view>
			</view>
		</view>
		
		<!-- 底部导航栏 -->
		<TabBar current="message" @change="onTabChange" />
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
				statusBarHeight: 44, // 状态栏高度
				listHeight: 0, // 列表高度
				newMessage: '', // 新留言内容
				messageList: [], // 留言数据，改为空数组
				bannerList: [], // 轮播图数据
				messagePositions: [
					// 第一排
					{ left: '40rpx', top: '30rpx', transform: 'rotate(-5deg)' },
					{ left: '290rpx', top: '50rpx', transform: 'rotate(3deg)' },
					{ left: '540rpx', top: '20rpx', transform: 'rotate(-8deg)' },
					
					// 第二排
					{ left: '20rpx', top: '280rpx', transform: 'rotate(6deg)' },
					{ left: '310rpx', top: '260rpx', transform: 'rotate(-4deg)' },
					{ left: '560rpx', top: '290rpx', transform: 'rotate(7deg)' },
					
					// 第三排
					{ left: '60rpx', top: '530rpx', transform: 'rotate(-6deg)' },
					{ left: '270rpx', top: '550rpx', transform: 'rotate(4deg)' },
					{ left: '520rpx', top: '520rpx', transform: 'rotate(-3deg)' }
				]
			}
		},
		onLoad() {
			this.getSystemInfo();
			this.calculateListHeight();
			this.loadBannerData();
			this.loadMessageData();
			console.log('留言数据:', this.messageList);
			console.log('留言数量:', this.messageList.length);
			console.log('位置数据:', this.messagePositions);
		},
		methods: {
			// 获取系统信息
			getSystemInfo() {
				try {
					const systemInfo = uni.getSystemInfoSync();
					this.statusBarHeight = systemInfo.statusBarHeight || 44;
					this.$nextTick(() => {
						this.calculateListHeight();
					});
				} catch (e) {
					console.log('获取系统信息失败', e);
					this.statusBarHeight = 44;
				}
			},
			
			// 计算列表高度
			calculateListHeight() {
				try {
					const systemInfo = uni.getSystemInfoSync();
					const windowHeight = systemInfo.windowHeight;
					// 简化高度计算，给留言区域足够的空间
					this.listHeight = Math.max(windowHeight * 0.4, 400); // 至少400px高度
					console.log('计算的列表高度:', this.listHeight);
				} catch (e) {
					console.log('计算高度失败', e);
					this.listHeight = 400;
				}
			},
			
			// 发送留言
			sendMessage() {
				if (!this.newMessage || !this.newMessage.trim()) {
					uni.showToast({
						title: '请输入留言内容',
						icon: 'none'
					});
					return;
				}
				
				// 检查留言长度
				if (this.newMessage.trim().length > 30) {
					uni.showToast({
						title: '留言内容不能超过30个字符',
						icon: 'none'
					});
					return;
				}
				
				// 获取当前时间
				const now = new Date();
				const time = now.toLocaleString('zh-CN', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour: '2-digit',
					minute: '2-digit'
				});
				
				// 添加新留言到列表顶部
				const newMsg = {
					id: Date.now(), // 使用时间戳作为临时ID
					content: this.newMessage.trim(),
					time: time
				};
				
				// 如果已有9条留言，移除最后一条
				if (this.messageList.length >= 9) {
					this.messageList.pop();
				}
				
				this.messageList.unshift(newMsg);
				this.newMessage = '';
				
				uni.showToast({
					title: '留言发送成功',
					icon: 'success'
				});
			},
			
			// 加载轮播图数据
			async loadBannerData() {
				try {
					uni.showLoading({
						title: '加载中...'
					});
					
					const response = await uni.request({
						url: 'http://team2.lizxx.com/api/wall/carousel',
						method: 'GET',
						header: {
							'Content-Type': 'application/json'
						}
					});
					
					uni.hideLoading();
					
					if (response.data && response.data.code === 200 && response.data.data) {
						// 将接口返回的图片URL转换为轮播图数据格式
						this.bannerList = response.data.data.map((imageUrl, index) => ({
							imageUrl: imageUrl,
							title: `精彩瞬间 ${index + 1}`,
							description: '分享美好时光，留下珍贵回忆'
						}));
						
						console.log('轮播图数据加载成功:', this.bannerList);
					} else {
						throw new Error('数据格式错误');
					}
				} catch (error) {
					uni.hideLoading();
					console.error('获取轮播图数据失败:', error);
					
					// 使用默认数据作为备用
					this.bannerList = [
						{
							imageUrl: 'http://team-img.lizxx.com/team2/map/blueSky.png',
							title: '美丽风景1',
							description: '这里有最美丽的风景，欢迎大家来游览'
						},
						{
							imageUrl: 'http://team-img.lizxx.com/team2/map/blueSky.png',
							title: '美丽风景2',
							description: '体验不一样的自然风光，感受大自然的魅力'
						},
						{
							imageUrl: 'http://team-img.lizxx.com/team2/map/blueSky.png',
							title: '美丽风景3',
							description: '留下美好的回忆，分享快乐的时光'
						}
					];
					
					uni.showToast({
						title: '轮播图加载失败，使用默认数据',
						icon: 'none',
						duration: 2000
					});
				}
			},
			
			// 加载留言数据
			async loadMessageData() {
				try {
					const response = await uni.request({
						url: 'http://team2.lizxx.com/api/wall/message/list',
						method: 'GET',
						header: {
							'Content-Type': 'application/json'
						}
					});
					
					if (response.data && response.data.code === 200 && response.data.data) {
						// 过滤过长的消息，只保留长度适中的消息
						const filteredMessages = response.data.data.filter(item => {
							return item.msg && item.msg.length <= 30; // 过滤长度超过30字符的消息
						});
						
						// 只取前9条消息（对应9个位置）
						const limitedMessages = filteredMessages.slice(0, 9);
						
						// 转换为组件需要的数据格式
						this.messageList = limitedMessages.map(item => ({
							id: item.id,
							content: item.msg,
							time: new Date().toLocaleString('zh-CN', {
								year: 'numeric',
								month: '2-digit',
								day: '2-digit',
								hour: '2-digit',
								minute: '2-digit'
							})
						}));
						
						console.log('留言数据加载成功:', this.messageList);
					} else {
						throw new Error('留言数据格式错误');
					}
				} catch (error) {
					console.error('获取留言数据失败:', error);
					
					// 使用默认留言数据作为备用
					this.messageList = [
						{ content: '这里的风景真美！', time: '2024-01-15 10:30' },
						{ content: '很喜欢这个地方', time: '2024-01-15 09:45' },
						{ content: '和家人一起度过了美好时光', time: '2024-01-14 16:20' }
					];
					
					uni.showToast({
						title: '留言加载失败，使用默认数据',
						icon: 'none',
						duration: 2000
					});
				}
			},
			
			// 轮播图切换事件
			onSwiperChange(event) {
				console.log('轮播图切换到第', event.detail.current, '张');
			},
			
			// 轮播图点击事件
			onBannerClick(item, index) {
				console.log('点击了轮播图', index, item);
				// TODO: 根据轮播图数据进行页面跳转或其他操作
			},
			
			// 获取便签背景图片
			getNoteBgImage(index) {
				const bgImages = [
					'http://team-img.lizxx.com/team2/leavemessage/image 49649.png',
					'http://team-img.lizxx.com/team2/leavemessage/image 49651.png',
					'http://team-img.lizxx.com/team2/leavemessage/image 49652.png',
					'http://team-img.lizxx.com/team2/leavemessage/image 49653.png',
					'http://team-img.lizxx.com/team2/leavemessage/image 49654.png'
				];
				return bgImages[index % bgImages.length];
			},
			
			// 处理 TabBar 切换事件
			onTabChange(tabName) {
				console.log('Tab changed to:', tabName);
			}

		}
	}
</script>

<style>
	page {
		width: 100vw;
		height: 100vh;
		margin: 0;
		padding: 0;
		background-color: #f5f5f5;
	}
	
	.message-container {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-color: #f5f5f5;
	}
	
	/* 全屏背景 */
	.full-bg {
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: 1;
	}
	
	/* 标题区域 */
	.title-section {
		position: relative;
		z-index: 2;
		text-align: center;
		padding-bottom: 30rpx;
		margin-top: -130rpx;
	}
	
	.title-image {
		height: 220rpx;
		max-width: 600rpx;
	}
	
	/* 轮播图区域 */
	.swiper-section {
		position: relative;
		z-index: 2;
		margin: 0 30rpx;
		margin-bottom: 10rpx; /* 减少下边距，让留言内容上移 */
		margin-top: -60rpx;
	}
	
	.banner-swiper {
		height: 400rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}
	
	.swiper-item {
		position: relative;
		width: 100%;
		height: 100%;
	}
	
	.banner-image {
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
	
	.banner-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
		padding: 40rpx 30rpx 30rpx 30rpx;
		border-radius: 0 0 20rpx 20rpx;
	}
	
	.banner-title {
		display: block;
		font-size: 32rpx;
		font-weight: bold;
		color: #ffffff;
		margin-bottom: 10rpx;
		text-shadow: 1rpx 1rpx 2rpx rgba(0, 0, 0, 0.5);
	}
	
	.banner-desc {
		display: block;
		font-size: 26rpx;
		color: #ffffff;
		opacity: 0.9;
		line-height: 1.4;
		text-shadow: 1rpx 1rpx 2rpx rgba(0, 0, 0, 0.5);
	}
	
	/* 主要内容区域 */
	.main-content {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		z-index: 2;
	}
	
	/* 留言列表 */
	.message-list-container {
		position: relative;
		z-index: 2;
		padding: 30rpx;
		box-sizing: border-box;
		overflow: visible;
		min-height: 1200rpx;
	}
	
	.message-item {
		position: absolute;
		width: 200rpx;
		height: 200rpx;
		z-index: 3;
	}
	
	.note-bg {
		position: absolute;
		width: 130%;
		height: 130%;
		top: -10%;
		left: -10%;
		z-index: 1;
	}
	
	.note-content {
		position: relative;
		z-index: 2;
		padding: 40rpx 30rpx;
		height: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	
	.note-text {
		font-size: 28rpx;
		color: #333;
		line-height: 1.4;
		word-break: break-all;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		font-weight: 500;
	}
	

	
	/* 发送留言区域 - 固定在底部 */
	.send-area-fixed {
		position: fixed;
		bottom: 160rpx; /* 留言发送区域向上移动 */
		left: 0;
		right: 0;
		z-index: 10;
		background: transparent;
		padding: 30rpx;
	}
	
	.input-container {
		display: flex;
		align-items: center;
		gap: 20rpx;
	}
	
	.input-wrapper {
		flex: 1;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 50rpx;
		padding: 0 30rpx;
		backdrop-filter: blur(10rpx);
	}
	
	.message-input {
		width: 100%;
		height: 80rpx;
		font-size: 28rpx;
		color: #333;
		background: transparent;
		border: none;
	}
	
	.send-btn {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		border-radius: 50rpx;
		padding: 0 40rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.send-btn-text {
		font-size: 28rpx;
		color: #ffffff;
		font-weight: bold;
	}
</style> 