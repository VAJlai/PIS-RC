import { request } from './axios'

/**
 * @description -封装User类型的接口方法
 */
export class UserService {
    /**
     * @description 用户登录
     * @param {Object} 账号 密码 
     * @return {HttpResponse} result
     */
    static async login(params) {
        return request('/api/user/validation', params, 'post')
    }

    /**
     * @description 获取用户信息
     * @return {HttpResponse} result
     */
    static async getUserInfo() {
        return request('/api/user/info', {}, 'get')
    }

    /**
     * @description 分页查询用户信息
     * @param limit 获取几条信息
     * @param page 从第几页开始
     * @returns 
     */
    static async userList(limit: number, page: number) {
        const uri = "/api/user/list?limit=" + limit + "&page=" + (page - 1)
        return request(uri, {}, 'get')
    }

    /**
     * @description 查询用户总数
     */
    static async userTotal() {
        return request("/api/user/total", {}, "get")
    }

    /**
     * @description 查询封禁用户总数
     */
    static async userTotalBanned() {
        return request("/api/user/total/ban", {}, "get")
    }

    /**
     * @description 封禁/解封账号
     * @param account 账号
     */
    static async userBan(account: string) {
        const uri = "/api/user/ban?account=" + account
        return request(uri, {}, "get")
    }

    /**
     * @description 删除用户
     * @param account 
     */
    static async userDelete(account: string) {
        const uri = "/api/user/delete?account=" + account
        return request(uri, {}, "delete")
    }

    /**
     * @description 获取封禁用户数量
     * @param limit - 每页多少数据
     * @param page - 第几页开始
     */
    static async userBannedList(limit: number, page: number) {
        const uri = "/api/user/list/ban?limit=" + limit + "&page=" + (page - 1)
        return request(uri, {}, 'get')
    }

    /**
     * @description 更新个人信息
     * @param params 更新参数
     */
    static async userInfoModify(params) {
        return request("/api/user/modification", params, "put")
    }

    static async userRegister(params) {
        return request("/api/user/register", params, "post")
    }

}


/**
 * @description -封装Paper类型的接口方法
 */
export class PaperService {
    /**
     * @description 分页查询论文信息
     * @param limit 获取几条信息
     * @param page 从第几页开始
     */
    static async paperList(limit: number, page: number) {
        const uri = "/api/paper/list?limit=" + limit + "&page=" + (page - 1)
        return request(uri, {}, "get")
    }
    /**
     * @description 根据ID查询论文信息
     * @param 论文ID
     */
    static async paperFindByID(id: number) {
        const uri = "/api/paper/find/id?id=" + id
        return request(uri, {}, "get")
    }
    /**
     * @description 拼接上传接口路径
     */
    static paperUploadURI = function () {
        return request("api/paper/upload", {}, "upload")
    }

    /**
     * @description 拼接更新接口路径
     */
    static paperUpdateURI = function () {
        return request("api/paper/update", {}, "update")
    }

    /**
     * @description 高级搜索
     * @param params 
     * @returns 
     */
    static async paperSearchAdvanced(params) {
        return request("/api/paper/advanced", params, "post")
    }

    /**
     * @description 专业搜索
     * @param statement 语句
     * @param limit - 分页
     * @param page - 分页
     * @returns 
     */
    static async paperSearchProfessional(statement: string, limit: number, page: number) {
        const uri = "/api/paper/professional?pro=" + statement + "&limit=" + limit + "&page=" + (page - 1)
        return request(uri, {}, "get")
    }

    /**
     * @description 基础搜索
     * @param params 
     */
    static async paperSearchBasic(params) {
        return request("/api/paper/basic", params, "post")
    }

    /**
     * @desciption 下载论文
     * @papram id - 论文id
     */
    static async paperDownload(id) {
        return request("api/paper/download?id=" + id, {}, "download")
    }

    /**
     * @description 封禁/解封论文
     * @papram id - 论文id
     */
    static async paperBanChange(id) {
        return request("api/paper/ban?id=" + id, {}, "get")
    }

    /**
     * @description 删除论文
     * @papram id - 论文id
     */
    static async paperDelete(id) {
        return request("api/paper/delete?id=" + id, {}, "get")
    }
}


/**
 * @description -封装Comment类型的接口方法
 */
export class CommentService {
    /**
     * @description 分页查询论文信息
     * @param limit 获取几条信息
     * @param page 从第几页开始
     */
    static async commentList(limit: number, page: number) {
        const uri = "/api/comment?limit=" + limit + "&page=" + (page - 1)
        return request(uri, {}, "get")
    }

    /**
     * @description 上传评论
     */
    static commentUpload = function (param) {
        return request("api/comment", param, "post")
    }

    /**
     * @description 点赞
     * @param comment_id 评论id
     * @param likeNum 点赞量
     */
    static async commentLike(comment_id: string, likeNum: number) {
        const uri = "/api/comment/like?comment_id=" + comment_id + "&like_num=" + likeNum
        return request(uri, {}, "get")
    }

    /**
     * @description 获取子评论
     * @param comment_id 评论id
     * @param page 子评论分页
     */
    static async commentChild(comment_id: string, page: number) {
        const uri = "/api/comment/children?comment_id=" + comment_id + "&page=" + page + "&limit=5"
        return request(uri, {}, "get")
    }

    /** 
     * @description 删除父评论 
     * @param id - 评论id
     */
    static async commentDelete(id: string) {
        const uri = "/api/comment/delete?id=" + id
        return request(uri, {}, "get")
    }

    /**
     * @description 删除子评论
     * @param comment_id - 父评论
     * @param child - 子评论
     */
    static async commentChildDelete(comment_id: string, child: string) {
        const uri = "/api/comment/delete_child?comment_id=" + comment_id + "&child=" + child
        return request(uri, {}, "get")
    }



}

/**
 * @description -封装头像
 */
export class AvatarService {
    /**
     * @description -内置头像信息
     */
    static getAvatarURL(index: number) {

        const avatarURL = './avatar/'
        const suffix = ".png"
        return avatarURL + index + suffix
    }
}