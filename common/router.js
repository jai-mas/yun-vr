const navigateTo = (url, params={}) => {
	let query = ''
	if(Object.keys(params).length){
		query = '?' + Object.entries(params)
			.map(([key,val]) => `${key}=${encodeURIComponent(val)}`)
			.join('&')
	}
	
	uni.navigateTo({
		url: url + query
	})
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
export default {
	navigateTo,
	navigateBack,
	redirectTo,
	switchTab
}