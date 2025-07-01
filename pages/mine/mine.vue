<template>
	<view class="mine-page" style="background-image: url('/static/mine/mine-bg.jpg');">
		<view class="mine-top">
			<view class="top-title">个人主页</view>
			<view class="mine-user">
				<!-- 短边适应 -->
				<image class="user-avatar" :src="avatar" mode="aspectFill"
				@click="changeAvatar"></image>
				<view class="user-name" @click="changeName">{{username}}</view>
			</view>
			<view class="mine-record">
				<view class="record-title">云游足迹</view>
				<view class="record-info">您已云游了{{recordsum}}个古镇</view>
			</view>
		</view>
		<view class="mine-list">
			<button class="mine-button" style="background-image: url('/static/mine/mine-bg.jpg');"
				@click="toClock()">
				去打卡
			</button>
			<button class="mine-button" style="background-image: url('/static/mine/mine-bg.jpg');"
				@click="toLike()">
				我的点赞
			</button>
			<button class="mine-button" style="background-image: url('/static/mine/mine-bg.jpg');"
				@click="toCC()">
				我的文创
			</button>
			<button class="mine-button" style="background-image: url('/static/mine/mine-bg.jpg');"
				@click="toPublish()">
				发布作品
			</button>
		</view>
		<p class="version">version</p>
		<TabBar current="mine" />
	</view>
</template>

<script>
import router from '@/common/router.js'
import FloatBall from '@/compents/FloatBall.vue'
import TabBar from '@/compents/TabBar.vue'
export default{
	name: 'Mine',
	components: {
		FloatBall,
		TabBar
	},
	data() {
		return {
			avatar: '/static/mine/Group 889.png',
			username: 'yunyou',
			recordsum: 4,
		};
	},
	methods:{
		changeAvatar(){
			uni.chooseImage({
				count:1, //限定选择一张图片
				crop:{
					// width: 180,
					// hight: 180,
					// resize:true,
				},
				success: (res) => {
					this.avatar=res.tempFilePaths[0];
				}
			})
		},
		changeName(){
			uni.showModal({//模态提示框
				title:'修改昵称',
				content: '请输入新昵称',//提示
				editable: true,
				success: (res)=>{
					if(res.confirm){//用户点击确认
						this.username=res.content;
					}
				}
			})
		},
		toClock(){//跳转至打卡
			uni.redirectTo({
				url: '/pages/CheckIn/CheckIn',
				fail: (res) => {
					console.log(res)
				}
			})
		},
		toLike(){//跳转到我的收藏
			uni.redirectTo({
				url: '/pages/collection/collection',
				fail: (res) => {
					console.log(res)
				}
			})
		},
		toCC(){//跳转至我的文创
			uni.redirectTo({
				url: '/pages/MyCreation/MyCreation',
				fail: (res) => {
					console.log(res)
				}
			})
		},
		toPublish(){//跳转至发布
			uni.redirectTo({
				url: '/pages/mine/publish/publish',
				fail: (res) => {
					console.log(res)
				}
			})
		}
	}
}
</script>

<style lang="scss">
	.mine-page{
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-size: 100% 100%;
	}
	.mine-top{
		width: 100%;
		height: 40vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		.top-title{
			width: 100%;
			margin-top: 10%;
			font-size: 40rpx;
			text-align: center;
			line-height: 50rpx;
			color: #ffffff;
			// background-color: #ffffff;
		}
		.mine-user{
			width: 100%;
			height: 40%;
			margin-top: 10%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			// background-color: #000000;
			.user-avatar{
				margin-left: 200rpx;
				width: 180rpx;
				height: 180rpx;
				border-radius: 50%;
				transform: translateX(-50%);
			}
			.user-name{
				margin-top: 3%;
				width: 50%;
				height: 60rpx;
				font-size: 40rpx;
				color: #000000;
				text-align: center;
				
			}
		}
		.mine-record{
			width: 90%;
			height: 20%;
			margin-top: 2%;
			border-radius: 20rpx;
			background-color: rgba(255, 255, 255, 0.7);
			line-height: 130rpx;
			text-align: center;
			color: #000000;
			display: flex;
			.record-title{
				width: 30%;
				font-size: 40rpx;
				font-weight: bold;
			}
			.record-info{
				width: 70%;
				font-size: 40rpx;
			}
		}
	}
	
	.mine-list{
		width: 70vw;
		height: 45vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		.mine-button{
			width: 70vw;
			height: 10vh;
			margin-top: 6%;
			line-height: 9vh;
			font-size: 40rpx;
			border-radius: 50rpx;
			border: 3rpx solid #ffffff;
			box-shadow: 5rpx 5rpx 5rpx 5rpx rgba(255, 255, 255, 0.2);
			background-size: 100%;
		}
	}
	
	.version{
		text-align: center;
		font-size: 30rpx;
		color: #727668;
	}
	
	// .mine-navigation{
	// 	width: 100%;
	// 	height: 15vh;
	// 	position: absolute;
	// 	bottom: 1vh;
	// 	display: flex;
	// 	justify-content: center;
	// 	.nav-image{
	// 		width: 30vw;
	// 		height: 30vw;
	// 	}
	// }
</style>