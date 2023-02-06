import request from "@/utils/request";

export function getDepartments() {
    return request({
        url: '/dictionary/getAllDepartments',
        method: 'get',
    })
}

export function getSpecialityByDictCode(dictCode) {
    return request({
        url: '/dictionary/getSpecialityByDictCode',
        method: 'get',
        params: {
            dictCode
        }
    })
}