import request from "@/utils/request";

// 获取推荐的帖子 默认每次下翻新增8条数据
export async function getRecommendPosting(department, speciality, page = 1, limit = 8) {
    return await request({
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
export async function getLatestPosting(department, speciality, page = 1, limit = 8) {
    return await request({
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
export async function getDepartmentsHotDots(limit = 10) {
    return await request({
        url: '/posting/getDepartmentsHotDots',
        method: 'get',
        params: {
            limit
        },
    })
}

// 点赞数+1
export function increaseStar(pid, uid, number,status) {
    return request({
        url: '/posting/increaseStar',
        method: 'put',
        params: {pid, uid, number,status}
    })
}

// 点赞数-1
export function decreaseStar(pid, uid, number,status) {
    return request({
        url: '/posting/decreaseStar',
        method: 'put',
        params: {pid, uid, number,status}
    })
}

// 根据pid获取帖子
export async function getPostingByPid(pid) {
    return await request({
        url: `/posting/getByPid/${pid}`,
        method: 'get',
    })
}

// 搜索帖子 参数：关键字，显示模式（默认、最近）
export async function getSearchedPostingList(content, pattern, page, limit=10) {
    return await request({
        url: '/posting/getSearched',
        method: 'get',
        params: {content,pattern, page, limit}
    })
}

// 获取该uid用户发布的热门帖子
export async function getPopularPostingListByUid(uid, page, limit = 6) {
    return await request({
        url: '/posting/homepage/popular',
        method: 'get',
        params: {uid, page, limit}
    })
}


// 根据uid 和condition 筛选帖子
export async function getPostingByUidWithCondition(uid,filterContent, page, limit=6) {
    return await request({
        url: `/posting/homepage/withCondition`,
        method: 'post',
        data: {uid,...filterContent,page,limit}
    })
}

// 根据uid获取该用户点过赞的帖子
export async function getStarListByUid(uid, page, limit=6) {
    return await request({
        url: `/posting/homepage/starList`,
        method: 'get',
        params: {uid,page,limit}
    })
}

// 根据uid获取该用户收藏过的帖子
export async function getLikeListByUid(uid, page, limit=6) {
    return await request({
        url: `/posting/homepage/likeList`,
        method: 'get',
        params: {uid,page,limit}
    })
}

// 收藏帖子
export async function savePosting(postingSave) {
    return await request({
        url: `/posting/save/savePosting`,
        method: 'post',
        data: postingSave
    })
}

// 取消收藏帖子
export async function cancelSavePosting(postingSave) {
    return await request({
        url: `/posting/save/cancelSavePosting`,
        method: 'delete',
        data: postingSave
    })
}

// 获取该uid下的所有收藏夹
export async function getPackageListByUid(uid) {
    return await request({
        url: `/posting/save/getPackageListByUid`,
        method: 'get',
        params: {uid}
    })
}

// 获取该uid下的所有收藏夹，并根据pid判断该帖子存在于哪些收藏夹中
export async function getPackageList(uid, pid) {
    return await request({
        url: `/posting/save/getPackageList`,
        method: 'get',
        params: {uid, pid}
    })
}

// 创建收藏夹
export async function createPostingPackage(postingPackage) {
    return await request({
        url: `/posting/save/createPostingPackage`,
        method: 'post',
        data: postingPackage
    })
}

// 编辑收藏夹
export async function editPostingPackage(postingPackage) {
    return await request({
        url: `/posting/save/editPostingPackage`,
        method: 'put',
        data: postingPackage
    })
}

// 根据packageId获取该收藏夹收藏的帖子
export async function getPostingSaveByPackageId(packageId) {
    return await request({
        url: `/posting/save/getPostingSaveByPackageId`,
        method: 'get',
        params: {packageId}
    })
}

// 根据id删除某个收藏夹中的某个收藏记录
export async function removePostingSave(id) {
    return await request({
        url: `/posting/save/removePostingSave`,
        method: 'delete',
        params: {id}
    })
}

// 根据packageId删除某个收藏夹
export async function removePostingPackage(packageId) {
    return await request({
        url: `/posting/save/removePostingPackage`,
        method: 'delete',
        params: {packageId}
    })
}





export function testUpload(formData) {
    return request({
        url: '/posting/testUpload',
        method: 'post',
        data: formData,
    })
}
