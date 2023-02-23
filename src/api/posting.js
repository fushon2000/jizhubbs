import request from "@/utils/request";

// 获取推荐的帖子 默认每次下翻新增8条数据
export function getRecommendPosting(department, speciality, page = 1, limit = 8) {
    return request({
        url: '/posting/getRecommendPosting',
        method: 'get',
        params: {
            department,
            speciality,
            page,
            limit
        }
    })
}

export function getRecommendPages(department, speciality, limit = 8) {
    return request({
        url: '/posting/getRecommendPages',
        method: 'get',
        params: {
            department,
            speciality,
            limit
        }
    })
}

// 获取最近发布的帖子 默认每次下翻新增8条数据
export function getLatestPosting(department, speciality, page = 1, limit = 8) {
    return request({
        url: '/posting/getLatestPosting',
        method: 'get',
        params: {
            department,
            speciality,
            page,
            limit
        }
    })
}
// 测试版
export function addPosting(formData) {
    return request({
        url: '/posting/addPosting',
        method: 'post',
        data: formData,
    })
}
// 正式版
export function publishPosting(PostingInfo) {
    return request({
        url: '/posting/publishPosting',
        method: 'post',
        data: PostingInfo,
    })
}
// 获取校园热点 默认获取前十的热点
export function getDepartmentsHotDots(limit=10) {
    return request({
        url: '/posting/getDepartmentsHotDots',
        method: 'get',
        params: {
            limit
        },
    })
}

export function testUpload(formData) {
    return request({
        url: '/posting/testUpload',
        method: 'post',
        data: formData,
    })
}
