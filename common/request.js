/*import { resolve } from "dns";*/
import operate from "./operate";

const http = (options) => {
	const beforeRequest = (config) => {
		const token = uni.getStorageSync('token');
		if(token) {
			config.header = {
				... config.header,
				Authorization: `Bearer ${token}`
			};
		}
		return config;
	};
	
	const mergedOptions = beforeRequest({
		url: operate.api() + options.url,
		method: options.method || 'GET',
		data: options.data,
		header: options.header || {}
	});
	
	return new Promise((resolve, reject) => {
		uni.request({
			...mergedOptions,
			success: (res) => {
				if(res.data.code !== 200) {
					handleError(res);
					reject(res)
				} else {
					resolve(res.data)
				}
			},
			fail: (err) => {
				handleNetworkError(error)
				reject(error)
			}
		})
	})
}

const handleError = (response) => {
	switch (response.data.code) {
		case 401:
			uni.login({
				provider: 'weixin',
				success: res => {
					wxLogin(res.code, uni.getAccountInfoSync().miniProgram.appId, '', '').then(res => {
						uni.setStorageSync('token', res.data.token);
						uni.setStorageSync('wxUser', res.data.wxUser);
						uni.setStorageSync('openId', res.data.openId);
						uni.hideLoading()
					})
				},
				fail: err => {
					console.log(err)
				}
			})
			break;
		case 500:
			uni.showToast({
				title: '服务器内部错误',icon:'none'
			})
			break;
		default:
			uni.showToast({
				title: `请求失败:${response.data.msg}`
			})
	}
}

const handleNetworkError = (errro) => {
	uni.showToast({
		title: '网络连接失败，请检查网络',
		icon: 'none'
	})
}
export default http



/*import { handleError } from '@vue/runtime-core';
import operate from './operate.js'
const http = {options} => {
	//请求拦截
	const beforeRequest = (config) =>{
		//添加Token
		const token = uni.getStorageSync('token');
		if(token){
			config.header = {
				...config.header,
				Authorization:`Bearer ${token}`
			};
		}
		return config;
	};
	
	//执行请求拦截
	const mergedOptions = beforeRequest{{
		url:operate.api()+option.url,
		method:options.method || 'GET',
		data:options.data,
		header:options.header || {}
	}};
	
	return new Promise(resolve,reject) => {
		uni.request{{
			...mergedOptions,
			success:(res) => {
				if(res.data.code!==200){//自定请求失败的情况
					//统一处理HTTP错误码
					handleError(res);
					reject(res);
				}else{
					rresolve(res.data)//成功
				}
			},
			//这里的接口请求，如果出现问题就输出接口请求无效
			fail: (err) => {
				//响应拦截器 - 网络错误处理
				handleNetworkError(error);
				reject(error);
			}
		}}
	}}
}

//3.错误处理函数
const handleError = (response) => {
	switch (response.data.code){
		case 401:
		uni.navigateTo({ url:'/pages/login/login' });
		break;
		case 500:
		uni.showToast({ title:'服务器内部错误',icon:'none' });
	}
};
const handleNetworkError = (error) => {
	uni.showToast({
		title:'网络连接失败，请检查网络',icon:'none'
	});
};

export default http*/