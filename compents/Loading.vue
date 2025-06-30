<template>
	<view class="loading-container">
		<view>
			<image src="/static/loading.gif"></image>
			<view class="loading-text">内容努力加载中...</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'Loading'
}
</script>

<style lang="scss" scoped>
	.loading-container{
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		image {
			width: 320rpx;
			height: 320rpx;
		}
		
		.loading-text {
			color: #333333;
			font-size: 24rpx;
			text-align: center;
		}
	}
</style>