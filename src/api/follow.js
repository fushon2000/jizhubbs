/* 关注api */
import request from "@/utils/request";

// 关注某人
export function follow(userId, fanId, groupId = null) {
    return request({
        url: 'user/fan/follow',
        method: 'post',
        params: {
            userId,
            fanId,
            groupId
        }
    })
}

// 取消关注某人
export function cancelFollow(id) {
    return request({
        url: '/user/fan/follow',
        method: 'delete',
        params: {
            id
        }
    })
}

// 获取关注分组
export function getFollowGroup(userId) {
    return request({
        url: `/user/fan/getFollowGroup/${userId}`,
        method: 'get',
    })
}

// 创建分组
export function createGroup(name, userId) {
    return request({
        url: '/user/fan/createGroup',
        method: 'post',
        params: {name, userId}
    })
}

// 获取全部关注
export function getAllFollowList(uid) {
    return request({
        url: `/user/fan/getAllFollowList/${uid}`,
        method: 'get',
    })
}

// 获取默认分组下的关注
export function getDefaultFollowListByGroupId(userId) {
    return request({
        url: `/user/fan/getDefaultFollowListByGroupId/${userId}`,
        method: 'get',
    })
}

// 获取某个分组下的关注
export function getFollowListByGroupId(groupId) {
    return request({
        url: `/user/fan/getFollowListByGroupId/${groupId}`,
        method: 'get',
    })
}

// 更改已关注用户所处的分组
export function changeGroup(userId, groupId) {
    return request({
        url: `/user/fan/changeGroup/`,
        method: 'put',
        params: {
            userId,
            groupId
        }
    })
}