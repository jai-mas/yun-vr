<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";

	/*每个页面公共css */
	.flex-box {
		display: flex;
	}

	.flex-box-center-y {
		display: flex;
		align-items: center;
	}

	.flex-box-center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.flex-box-space-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	/* 超出一行隐藏 */
	.text-one-hidden {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
	}

	/* 超出两行隐藏 */
	.text-two-hidden {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	// /* #ifdef H5 */
	    uni-page-head { 
	        display: none; 
	    } 
	// /* #endif */
</style>