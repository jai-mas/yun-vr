import http from "../common/request";

// 获取作品列表
export function getCreationList() {
    return http({
        url: '/vtp/app/ThreeCountryside/ActivityList',
    })
}

// 删除作品
export function deleteCreation(id) {
    return http({
        url: '/vtp/app/ThreeCountryside/DeleteActivity',
        method: 'POST',
        data: {
            id: id
        }
    })
} 