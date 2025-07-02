import http from "../common/request";

export function getScenicIndex() {
	return http({
		url: '/vtp/app/scenic/scenicIndex',
	})
}

export function getScenicDetail(scenicId) {
	return http({
		url: '/vtp/app/scenic/detail/' + scenicId,
	})
}