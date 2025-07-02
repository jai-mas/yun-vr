<template>
<view class="publish-box" style="background-image: url('http://team-img.lizxx.com/team2/mine/pub-back.jpg')">
	<view class="publish-top">
		<image class="publish-back" src="http://team-img.lizxx.com/team2/mine/back.png"
			@click="toMine()"></image>
		<view class="pub-title">用户发布</view>
	</view>
	<view class="publish-body">
		<view class="pub-card" v-for="(item, index) in cardItems" :key="index">
			<view class="card-title-box">
				<h2 class="card-title">{{item.title}}</h2>
			</view>
			<view class="card-body-box">
				<text class="card-body">{{item.body}}</text>
			</view>
			<view class="pub-button">
				<button class="publish-card-button" @click="publishCard(index)">发布</button>
				<button class="delete-card-button" @click="deleteCard(index)">删除</button>
			</view>
			
		</view>
		<image class="pub-add" src="http://team-img.lizxx.com/team2/mine/add.png" @click="isAdd=true; addIcon=false; showTabBar=false" v-if="addIcon"></image>
	</view>
	<uni-popup ref="popup" type="bottom" :mask-click="false" v-if="isAdd">
		<view class="add-container">
			<view class="add-header">
				<text>发布新内容</text>
			</view>
        
			<view class="add-body">
				<input v-model="newCard.title" placeholder="请输入标题" class="title-input"/>
				<textarea v-model="newCard.body" placeholder="请输入内容" maxlength="1000"
					class="content-input" ></textarea>
			</view>
			<view class="add-footer">
				<button class="cancel-btn" @click="cancelAdd()">取消</button>
				<button class="save-btn" @click="saveAdd()">保存</button>
				<button class="submit-btn" @click="submitAdd()">发布</button>
			</view>
		</view>
    </uni-popup>
	<view>
		<TabBar current="myCreation" v-if="showTabBar"/>
	</view>
</view>
</template>

<script>
import router from '@/common/router.js'
import FloatBall from '@/compents/FloatBall.vue'
import TabBar from '@/compents/TabBar.vue'
export default{
	name: 'Publish',
	components: {
		FloatBall,
		TabBar
	},
	data(){
		return{
			cardItems:[
				{id: 1, title: "\"字觉\"解压印章套装（岳麓书院特别版）", body:"深度结合岳麓书院文化底蕴的解压文创，精选书院历史中最具代表性的12枚篆刻印章为原型，包含：朱熹\"忠孝廉节\"四字教规、康熙\"学达性天\"御匾篆文、王文清《岳麓书院学规》节选印章等。每枚印章采用食品级硅胶材质精密铸造，通过1:1复刻技术还原原碑刻的笔触韵味，印章尺寸为5cm×5cm×3cm的立方体，符合人体工学设计。"},
				{id: 2, title: "\"漆韵\"手机壳", body:"大漆工艺浮雕纹样，0.3mm超薄设计，兼容磁吸充电，6色可选。"},
				{id: 3, title: "\"敦煌飞虹\"丝巾", body:"数码印花真丝方巾，提取莫高窟藻井色谱，90cm×90cm，渐变云纹设计。"},
				{id: 4, title: "\"青花记忆\"陶瓷杯", body:"白瓷杯身手绘传统青花纹样，搭配现代渐变釉色，10cm高度，诠释新中式美学。"}
			],
			isAdd: false,
			newCard: {title: '', body: ''},
			addIcon: true,
			showTabBar: true
		};
	},
	methods:{
		toMine(){//back
			uni.redirectTo({
				url:'/pages/mine/mine',
				fail: (res) => {
					console.log(res)
				}
			})
		},
		publishCard(index){
			uni.showModal({
				title:"是否确认发布作品",
				editable:false,
				success: (res) => {
					if(res.confirm){//确定发布
						this.cardItems.splice(index, 1),
						uni.showToast({
							title: '请前往我的文创界面查看',
							icon: 'none',
							duration: 1500
						});
					}
				}
			})
		},
		deleteCard(index){
			uni.showModal({
				title:"删除作品",
				content:"是否确认删除，删除后不可恢复",
				editable:false,
				success: (res) => {
					if(res.confirm){//确定删除
						this.cardItems.splice(index, 1)
						try {
							uni.setStorageSync('cardItems', this.cardItems);
						} catch (e) {
							console.error('保存数据失败:', e);
						}
						uni.showToast({
							title: '删除成功',
							icon: 'success',
							duration: 1500
						});
					}
				}
			})
		},
		addCard(){
			
		},
		resetForm(){
			this.newCard = {title: '', body: '' }
		},
		cancelAdd(){
			uni.showModal({
				title:"是否退出",
				content:"直接退出将不会保存数据",
				editable:false,
				success: (res) => {
					if(res.confirm){
						this.isAdd = false,
						this.addIcon = true,
						this.showTabBar = true,
						this.resetForm()
					}
				}
			})
		},
		saveAdd(){
			const itemslength = this.cardItems.length;
			this.cardItems.unshift({
			    ...this.newCard,
			    id: Date.now() // 添加唯一ID
		    });
			if(itemslength < this.cardItems.length){//成功
				uni.showToast({
					title: '保存成功',
					icon: 'success',
					duration: 1500
				});
				this.isAdd=false,
				this.addIcon=true,
				this.showTabBar = true,
				this.resetForm()
			}else{
				uni.showToast({
					title: '保存失败',
					icon: 'error',
					duration: 1500
				});
			}
			
		},
		submitAdd(){
			uni.showToast({
			    title: '发布成功',
			    icon: 'success'
			}),
			this.isAdd=false,
			this.addIcon=true,
			this.showTabBar = true,
			this.resetForm()
		}
	}
}
</script>

<style lang="scss">
.publish-box{
	width: 100vw;
	height: 100vh;
	background-size: 100% 100%;
	display: flex;
	flex-direction: column;
}
.publish-top{
	width: 100%;
	height: 12%;
	background-color: rgba(255, 255, 255, 0.7);
	border-bottom: 2rpx solid #ffffff;
	box-shadow: 0 5rpx 5rpx 0 rgba(0, 0, 0, 0.2);
	display: flex;
	.publish-back{
		width: 7vw;
		height: 7vw;
		margin-left: 5vw;
		margin-top: 6vh;
	}
	.pub-title{
		width: 50%;
		margin-left: 13vw;
		font-size: 40rpx;
		line-height: 15vh;
		color: #000;
		text-align: center;
	}
}
.publish-body{
	width: 100vw;
	height: 78.5vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-y: auto;
	.pub-card{
		width: 80vw;
		min-height: 18vh;
		margin-top: 3vh;
		border-radius: 30rpx;
		border: 2rpx solid #ffffff;
		box-shadow: 0 5rpx 5rpx 5rpx rgba(0, 0, 0, 0.2);
		color: #000;
		background-color: rgba(255, 255, 255, 0.5);
		position: relative;
		.card-title-box{
			height: 3vh;
			margin-top: 1vh;
			width: 70vw;
			margin-left: 5vw;
			overflow: clip;
			.card-title{
				font-size: 35rpx;
			}
		}
		.card-body-box{
			min-height: 7vh;
			max-height: 7vh;
			width: 70vw;
			margin-left: 5vw;
			margin-top: 1vh;
			overflow-y: hidden;
			.card-body{
				font-size: 30rpx;
				color: #5a5a5a;
			}
		}
		.pub-button{
			width: 50vw;
			height: 4vh;
			margin-left: 35%;
			display: flex;
			justify-content: center;
			position: absolute;
			bottom: 1vh;
			.publish-card-button,
			.delete-card-button{
				width: 20vw;
				height: 100%;
				border-radius: 2vh;
				font-size: 30rpx;
				line-height: 4vh;
				box-shadow: 3rpx 3rpx 5rpx 5rpx rgba(200, 200, 200, 0.3);
			}
			.publish-card-button{
				border: 1rpx solid #607460;
				background-color: #a9cdaa;
			}
			.delete-card-button{
				border: 1rpx solid #607460;
			}
		}
	}
	.pub-add{
		width: 12vw;
		height: 12vw;
		position: absolute;
		bottom: 10vh;
		left: 44vw;
	}
}
.add-container{
	width: 100vw;
	height: 70vh;
	border-radius: 5vw 5vw 0 0;
	background-color: #ffffff;
	.add-header{
		font-size: 35rpx;
		width: 100vw;
		height: 3vh;
		text-align: center;
	}
	.add-body{
		width: 90vw;
		height: 55vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.title-input{
			margin-left: 5vw;
			font-size: 40rpx;
			height: 5vh;
			width: 100%;
		}
		.content-input{
			font-size: 35rpx;
			height: 45vh;
			width: 100%;
			margin-top: 2vh;
			margin-left: 5vw;
		}
	}
	.add-footer{
		width: 90vw;
		height: 8vh;
		display: flex;
		.cancel-btn,
		.save-btn,
		.submit-btn{
			width: 20vw;
			height: 5vh;
			border-radius: 1vh;
			line-height: 5vh;
		}
		.cancel-btn{
			margin-left: 5vw;
		}
		.save-btn{
			margin-left: 25vw;
			background-color: #a9cdaa;
		}
		.submit-btn{
			margin-left: 5vw;
			background-color: #607460;
		}
	}
}
</style>