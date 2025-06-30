<template>
	<view class="navbar-box">
		<u-navbar :title="title" :bgColor="bgColor" 
			@leftClick="handlerLeft" 
			fixed="true" placeholder="true">
			<view slot="left">
				<image src="/static/common/nav-left-icon.png"></image>
			</view>		
		</u-navbar>
	</view>
</template>

<script>
export default {
	name: 'Navbar',
	props: {
		title: {
			type: String,
		},
		bgColor: {
			type: String,
			default: '#f9f4f3'
		}
	},
	methods: {
		handlerLeft() {
			if(getCurrentPages().length > 1) {
				this.$router.navigateBack();
			} else {
				this.$router.redirectTo('/pages/home/home');
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.navbar-box{
		width: 100vw;
		
		image {
			width: 36rpx;
			height: 36rpx;
		}
	}
</style>