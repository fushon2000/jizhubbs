import request from "@/utils/request";

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
export function addPosting(formData) {
    return request({
        url: '/posting/addPosting',
        method: 'post',
        data: formData,
    })
}
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
