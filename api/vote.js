import http from "../common/request";

export function getVoteIndex() {
	return http({
		url: '/vtp/app/voteActivity/index',
	})
}

export function getWorkList() {
	return http({
		url: '/vtp/app/voteActivity/getWorkList',
	})
}
