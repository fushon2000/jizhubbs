import request from "@/utils/request";

export function getRecommendPosting(department, speciality, page = 1, limit = 4) {
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

export function getRecommendPages(department, speciality, limit = 4) {
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

export function getLatestPosting(department, speciality, page = 1, limit = 4) {
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