import http from "../common/request";	

export function getHomeNotice() {
	return http({
		url: '/vtp/app/voteActivity/getHomeNotice',
	})
}

export function wxlogin(data){
	return http({
		url:'/wx/user/login',
		method:'POST',
		data
	})
}