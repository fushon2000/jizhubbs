import request from "@/utils/request";

// 用户发布评论
export function submitComment(comment) {
    return request({
        url: '/posting/comment/submit',
        method: 'post',
        data: comment
    })
}

// 根据帖子ID获取该帖子的评论树形结构
export function getCommentListByPid(pid) {
    return request({
        url: '/posting/comment/getPostingCommentList',
        method: 'get',
        params: {pid}
    })
}

// 根据评论cid给评论点赞
export function likeComment(cid, uid) {
    return request({
        url: '/posting/comment/like',
        method: 'put',
        params: {cid, uid}
    })
}

// 根据帖子ID获取该帖子的评论树形结构  按时间排序Desc
export function getCommentListOrderByTime(pid) {
    return request({
        url: '/posting/comment/getLatestPostingCommentList',
        method: 'get',
        params: {pid}
    })
}