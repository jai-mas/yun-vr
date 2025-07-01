const navigateTo = (url, params={}) => {
	let query = ''
	if(Object.keys(params).length){
		query = '?' + Object.entries(params)
			.map(([key,val]) => `${key}=${encodeURIComponent(val)}`)
			.join('&')
	}
	
	// 检查页面栈深度，微信小程序最多同时打开10个页面
	const pages = getCurrentPages()
	// 当页面栈深度大于等于9时使用reLaunch代替navigateTo
	if (pages.length >= 9) {
		uni.reLaunch({
			url: url + query
		})
	} else {
		uni.navigateTo({
			url: url + query
		})
	}
}

//返回上一页
const navigateBack = (delta = 1) => {
	uni.navigateBack({delta})
}

// 重定向某个页面
const redirectTo = (url) => {
	uni.redirectTo({
		url
	})
}

// 切换Tab页
const switchTab = (url) => {
	uni.switchTab({
		url
	})
}

// 关闭所有页面，打开到应用内的某个页面
const reLaunch = (url) => {
	uni.reLaunch({
		url
	})
}

export default {
	navigateTo,
	navigateBack,
	redirectTo,
	switchTab,
	reLaunch
}