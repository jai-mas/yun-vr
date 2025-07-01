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
		<scroll-view class="content-scroll" scroll-y="true" show-scrollbar="true">
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
						@load="imageLoad"
					></image>
				</view>
			</view>
		</scroll-view>
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
			detailData: {},
			imagesLoaded: 0,
			// 假数据映射表，根据id返回不同的内容
			fakeDataMap: {
				// 资讯信息 301-306
				301: {
					title: '长沙学院文化宣传团公安县文化交流纪实',
					content: '近日，长沙学院文化宣传团前往公安县开展了一系列文化交流活动。本次活动旨在促进城乡文化交流，展示高校学子风采，同时也让学生深入了解当地民俗文化。\n\n宣传团成员通过走访当地文化站、博物馆等场所，收集整理了大量关于公安县传统文化的资料。同时，他们还与当地文艺工作者进行了深入交流，学习了当地特色的民间艺术表演形式。在交流活动中，宣传团成员展示了大学校园文化，表演了精心准备的节目，受到了当地居民的热烈欢迎。\n\n据悉，此次文化交流活动是长沙学院"文化传承与创新"系列项目的重要组成部分，旨在推动高校文化与地方文化的融合发展，为乡村文化振兴贡献力量。',
					images: [
						'/static/welfare/zx301.jpg',
						
					]
				},
				302: {
					title: '长沙学院法学院开展法治文化进乡村系列讲座',
					content: '为提高农村居民法律意识，推进乡村法治建设，长沙学院法学院近期在多个乡村开展了"法治文化进乡村"系列讲座。\n\n据了解，此次系列讲座由法学院教师和高年级法学专业学生共同策划组织，内容涵盖农村土地承包、婚姻家庭、邻里纠纷等与农民生活密切相关的法律问题。讲座采用通俗易懂的语言和生动的案例，帮助村民理解法律知识，提高法律意识。\n\n此外，法学院还设立了法律咨询台，为村民提供免费法律咨询服务，帮助解答法律疑问。同时，还发放了法律知识手册，方便村民日后查阅。\n\n长沙学院法学院负责人表示，此次系列讲座是学院"法律服务社会"计划的重要组成部分，未来将继续深入基层，为推进乡村法治建设贡献力量。',
					images: [
						'/static/welfare/zx302.png',
						
					]
				},
				303: {
					title: '科技助农 | 长沙学院在宁乡县开展农业技术培训',
					content: '为助力乡村振兴，提升农民科技素养，长沙学院农学院和信息科学与工程学院联合在宁乡县开展了为期一周的农业技术培训。\n\n本次培训重点围绕现代农业技术应用、农作物病虫害防治、农产品电商平台搭建等方面展开。培训采用理论讲解与实践操作相结合的方式，帮助农民掌握实用技术。在农作物病虫害防治环节，专家现场示范了多种绿色防控技术，引导农民减少农药使用，生产绿色农产品。\n\n值得一提的是，此次培训还专门设置了"智慧农业"专题，介绍了物联网、大数据等现代信息技术在农业中的应用，并帮助农民掌握智能手机使用技巧，学习通过网络获取农业信息和销售农产品。\n\n宁乡县农业农村局相关负责人表示，此次培训内容实用、形式新颖，受到了广大农民的欢迎，对提升当地农业现代化水平具有积极意义。',
					images: [
						'/static/welfare/zx303.jpg',
						
					]
				},
				304: {
					title: '教育资源下沉 | 长沙学院师生走进汨罗市山区',
					content: '近日，长沙学院教育学院组织师生代表走进汨罗市山区，开展教育资源调研和支援活动，助力山区教育发展。\n\n调研组深入多所山区学校，实地了解当地教育资源配置、师资力量、教学条件等情况，并与当地教师进行了深入交流，了解他们在教学过程中面临的困难和挑战。\n\n在调研基础上，长沙学院教育学院与当地教育部门签署了合作协议，将通过定期派遣教师进行支教、组织线上教研活动、捐赠教学设备和图书等方式，持续支援山区教育发展。\n\n教育学院院长表示，此次活动是学院响应国家"教育资源均衡发展"政策的具体实践，未来将建立长效机制，持续关注山区教育发展，为推动教育公平贡献力量。',
					images: [
						'/static/welfare/zx304.jpg',
						
					]
				},
				305: {
					title: '健康服务进乡村 | 长沙学院医学院岳阳义诊纪实',
					content: '为提升农村居民健康素养，改善基层医疗服务条件，长沙学院医学院近日组织医疗专家团队前往岳阳县多个乡镇开展义诊活动。\n\n此次义诊活动由医学院多位专家教授带队，涵盖内科、外科、妇科、儿科等多个专业。活动中，医疗团队为村民提供了健康检查、疾病诊断、用药指导等服务，并针对农村常见病、多发病开展了健康知识讲座。\n\n除了面向村民的义诊服务，医疗团队还为当地乡村医生提供了业务培训，内容包括常见疾病诊疗规范、基本医疗设备使用、急救技能等，有效提升了基层医疗服务能力。\n\n据统计，此次义诊活动共服务村民500余人次，发放健康宣传资料1000余份，捐赠药品价值约1.5万元。岳阳县卫健局负责人表示，此类义诊活动对提升农村居民健康水平、促进医疗卫生事业发展具有重要意义。',
					images: [
						'/static/welfare/zx305.jpg',
						
					]
				},
				306: {
					title: '绿色家园共建设 | 长沙学院环保宣讲走进浏阳',
					content: '为提高农村环保意识，改善农村生态环境，长沙学院环境科学与工程学院近日组织师生前往浏阳市多个乡村开展环保宣讲活动。\n\n本次宣讲活动以"绿色家园共建设"为主题，内容涵盖垃圾分类、水源保护、秸秆综合利用等与农村环境密切相关的话题。宣讲团队采用图文并茂的PPT、生动有趣的小视频、互动问答等多种形式，使环保知识更加通俗易懂，受到了村民的欢迎。\n\n除了理论宣讲，团队还组织了实地考察和环保实践活动。在水源地保护区，团队成员与村民共同清理了河道垃圾；在农田区域，专家向农民介绍了秸秆还田技术，减少焚烧带来的污染。\n\n浏阳市环保局相关负责人表示，此次环保宣讲活动形式新颖、内容实用，对提高农村环保意识、改善农村人居环境具有积极作用。未来将与长沙学院建立长期合作机制，共同推进农村环境保护工作。',
					images: [
						'/static/welfare/zx306.jpg',
						
					]
				},
				
				// 活动信息 101-106 保持不变
				101: {
					title: '长沙学院三下乡——乡村振兴志愿服务活动',
					content: '为深入贯彻落实乡村振兴战略，长沙学院组织开展了"乡村振兴志愿服务活动"。本次活动以"助力乡村振兴，青春建功立业"为主题，组织学生深入农村一线，开展多样化的志愿服务。\n\n志愿者们分成多个小组，分别在产业发展、人才培养、文化建设、生态保护和组织振兴等方面开展工作。他们走访了当地农户，了解农村发展需求，提供政策咨询和技术指导，帮助农民解决实际困难。同时，还组织了乡村振兴政策宣讲会，提高了农民对国家政策的了解和认识。\n\n通过此次活动，不仅为乡村振兴贡献了青春力量，也让学生们在实践中增长了才干，提高了服务社会的能力。',
					images: [
						'/static/welfare/hd101.jpg',
						
					]
				},
				102: {
					title: '长沙学院三下乡——"童心圆梦"支教活动',
					content: '长沙学院教育学院和文学院联合组织的"童心圆梦"支教团队，前往湖南省偏远山区开展了为期三周的支教活动。\n\n支教团队由20名优秀学生组成，他们为山区孩子们带去了丰富多彩的课程，包括语文、数学、英语、音乐、美术、科学实验等。除了常规课程外，还开设了心理健康、安全教育、红色教育等特色课程，全方位关注孩子们的成长。\n\n支教团队还为当地学校捐赠了图书、文具、体育器材等学习用品，并与当地教师进行了教学经验交流，帮助提升教学质量。活动结束时，举办了一场别开生面的"六一"儿童节联欢会，给孩子们留下了美好的回忆。\n\n这次支教活动不仅丰富了山区孩子的暑期生活，拓宽了他们的视野，也让支教团队的成员在实践中锻炼了自己，体验了教师职业的责任与使命。',
					images: [
						'/static/welfare/hd102.jpg',
						
					]
				},
				103: {
					title: '长沙学院三下乡——农村电商帮扶计划',
					content: '为助力农村电商发展，推动农产品上行，长沙学院经济与管理学院组织开展了"农村电商帮扶计划"三下乡活动。\n\n志愿者团队深入湖南省多个农村地区，为当地农民提供电商知识培训，内容包括电商平台操作、产品拍摄技巧、网店运营管理、客户服务等方面。同时，还帮助农户建立了农产品网络销售渠道，设计了具有当地特色的农产品品牌和包装，提升了产品附加值。\n\n团队成员还利用自身专业优势，为当地特色农产品制作了宣传视频和图文介绍，在各大电商平台和社交媒体上进行推广，帮助农产品"走出去"。活动期间，成功帮助10余户农民在电商平台上开设了网店，销售额超过5万元。\n\n这一活动不仅拓宽了农产品销售渠道，增加了农民收入，也为乡村振兴注入了新的活力。',
					images: [
						'/static/welfare/hd103.jpg',
						
					]
				},
				104: {
					title: '长沙学院三下乡——"健康乡村"医疗服务行动',
					content: '长沙学院医学院组织的"健康乡村"医疗服务团队，前往湖南省多个偏远乡村开展了为期两周的医疗服务活动。\n\n服务团队由医学院教师和高年级医学生组成，他们携带医疗设备和药品，为村民进行健康检查，提供健康咨询，发放健康宣传资料，普及健康知识。团队还针对农村常见疾病，如高血压、糖尿病、颈肩腰腿痛等，开展了专题讲座和义诊活动。\n\n针对留守老人和儿童，团队特别开展了心理健康服务，通过交流谈心、团体游戏等方式，缓解他们的孤独感和焦虑情绪。此外，还为当地卫生室的医务人员提供了业务培训，提升了基层医疗服务能力。\n\n此次活动共服务村民800余人次，发放药品价值约2万元，受到了当地政府和村民的高度评价。',
					images: [
						'/static/welfare/hd104.jpg',
						
					]
				},
				105: {
					title: '长沙学院三下乡——乡村文化艺术节',
					content: '为丰富农村文化生活，传承和弘扬优秀传统文化，长沙学院艺术学院组织开展了"乡村文化艺术节"活动。\n\n活动期间，志愿者们在湖南省多个乡村举办了一系列文化艺术活动，包括文艺演出、传统手工艺展示与教学、民俗文化讲座、农民画展等。其中，由学生和村民共同参与的大型文艺晚会《乡村振兴颂》，以丰富多彩的节目形式展现了新时代乡村的发展变化和美好愿景，受到了广大村民的热烈欢迎。\n\n志愿者们还深入挖掘当地非物质文化遗产，如花鼓戏、湘绣、剪纸等，通过记录、整理和宣传，帮助这些传统文化得到更好的保护和传承。同时，还为村民开设了摄影、舞蹈、书法等文化艺术培训班，提高了村民的文化艺术素养。\n\n这次活动不仅丰富了乡村文化生活，增强了村民的文化自信，也为乡村文化振兴注入了新的活力。',
					images: [
						'/static/welfare/hd105.jpg',
					
					]
				},
				106: {
					title: '长沙学院三下乡——"绿色家园"环保行动',
					content: '长沙学院环境科学与工程学院组织的"绿色家园"环保志愿服务队，前往湖南省多个乡村开展了环保宣传和实践活动。\n\n志愿者们通过环保知识讲座、垃圾分类演示、环保手工制作等多种形式，向村民们普及环保知识，倡导绿色生活方式。同时，还组织了河道清理、植树等实践活动，改善了村庄环境。\n\n针对农村常见的环境问题，如秸秆焚烧、生活垃圾处理、水源污染等，志愿者们提出了切实可行的解决方案，并协助村委会制定了环境保护长效机制。此外，还帮助村民建立了"绿色家园"微信群，定期发布环保知识和信息，形成了良好的环保氛围。\n\n通过此次活动，不仅提高了村民的环保意识，改善了村庄环境，也为建设美丽乡村贡献了力量。',
					images: [
						'/static/welfare/hd106.jpg',
						
					]
				}
			}
		};
	},
	onLoad(options) {
		if (options.id) {
			this.id = options.id;
			// 根据id获取对应的假数据
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
			// 从假数据映射表中获取数据
			if (this.fakeDataMap[id]) {
				this.detailData = this.fakeDataMap[id];
			} else {
				// 如果没有对应id的数据，使用默认数据
				this.detailData = {
					title: '长沙学院三下乡活动',
					content: '这是一个默认的三下乡活动内容描述，当没有找到对应ID的活动时显示此内容。',
					images: ['/static/welfare/1db9a084-3788-47d0-9c69-86f80ad13e77.png']
				};
			}
			
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
		},
		imageLoad() {
			// 图片加载完成后触发，可用于处理图片加载状态
			this.imagesLoaded++;
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
	display: flex;
	flex-direction: column;
	
	.top-image-area {
		position: relative;
		width: 100%;
		height: 500rpx;
		flex-shrink: 0;
		
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
	
	/* 添加滚动视图样式 */
	.content-scroll {
		flex: 1;
		height: 0;
		position: relative;
		margin-bottom: 100rpx; /* 为底部TabBar留出空间 */
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