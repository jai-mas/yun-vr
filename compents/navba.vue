<template>
	<view class="navbar-box">
		<u-navbar :bgColor="bgColor" 
		    :leftText="leftText"
		    :rightText="rightText"
			@rightClick="rightClick" 
			placeholder="true">	
		</u-navbar>
	</view>
</template>

<script>
export default {
	name: 'Navba',
	props: {
		title: {
			type: String,
		},
		bgColor: {
			type: String,
			default: '#f9f4f3'
		},
		leftText: {
			type: String,
			default: '#147a77',
			fontSize: 30
		},
		rightText: {
			type: String,
			default: '#1ebbb6',
			fontSize: 25
		}
	},
	methods: {
		rightClick() {
				this.$router.redirectTo('/pages/Products/productDetail');
		}
	}
}
</script>

<style lang="scss" scoped>
	.navbar-box{
		width: 100vw;
		padding-top: 20px;
	}
	
		.u-navbar .left {
			display: none;  /* 隐藏返回箭头 */
		}
</style>