<template>
    <el-card class="card" shadow="never">
        <!--评论模块-->
        <div class="container">
            <div class="comment" v-for="item,index in commentsInfo.info">
                <div class="info">
                    <img class="avatar" :src="getAvatar(item.Author.avatar) " width="36" height="36" />
                    <!-- <div class="right">
                        <div class="name">{{item.Author.name}}</div>
                        <div class="date">{{item.date}}</div>
                    </div> -->
                </div>
                <div class="content" v-html="item.content">
                </div>
                <div class="control">
                    <span class="like" :class="{active: item.isLike}" @click="likeClick(index)">
                        <i class="iconfont">
                            <el-icon>
                                <Pointer />
                            </el-icon>
                        </i>
                        <span class="like-num">{{item.LikeNum > 0 ? item.LikeNum + '人赞' : '赞'}}</span>
                    </span>
                    <el-popover placement="top-start" trigger="hover" :content="`回复`+item.Author.name">
                        <template #reference>
                            <span class="reply-text" @click="showCommentInput(item)">
                                <i class="iconfont icon-comment">
                                    <el-icon>
                                        <ChatSquare />
                                    </el-icon>
                                </i>
                                <span>回复</span>
                            </span>
                        </template>
                    </el-popover>
                </div>
                <div class="reply">
                    <div class="item" v-for="reply in item.Children">
                        <img class="avatar" :src="getAvatar(reply.Author.avatar) " width="30" height="30" />
                        <div style="display: inline-block;">
                            <div class="reply-content">
                                <span class="from-name">{{reply.Author.name}}</span><span>: </span>
                                <span class="to-name" v-if="reply.to_account">@"{{reply.to_account}}"</span>
                                <span v-html="reply.content"></span>

                            </div>
                            <div class="reply-bottom">
                                <span>{{reply.date}}</span>
                                <el-popover placement="top-start" trigger="hover" :content="`回复`+reply.FromName">
                                    <template #reference>
                                        <span class="reply-text" @click="showCommentInput(item, reply)">
                                            <i class="iconfont icon-comment">
                                                <el-icon>
                                                    <ChatSquare />
                                                </el-icon>
                                            </i>
                                            <span>回复</span>
                                        </span>
                                    </template>
                                </el-popover>
                            </div>
                        </div>
                    </div>
                    <transition name="fade">
                        <div class="input-wrapper" v-if="comments.showItemId === item.ID">
                            <el-card shadow="never">
                                <div class="editor" contenteditable="true" id="editor">
                                </div>
                            </el-card>
                            <el-popover :visible="emoShow" placement="top" :width="400" trigger="click">
                                <template #reference>
                                    <img src="@/assets/svg/laugh.svg" class="emoImg" @click="emoShow = !emoShow">
                                </template>
                                <el-card shadow="hover">
                                    <el-space wrap>
                                        <span v-for="(line, i) in emotionList.emotions" :key="'emojo'+i"
                                            @click.stop="addEmotion(line.name),emoShow = false"
                                            v-html="line.url"></span>
                                    </el-space>
                                </el-card>
                            </el-popover>

                            <div class="btn-control">
                                <span class="cancel" @click="cancel">取消</span>
                                <el-button class="btn" type="success" round @click="commitComment">确定
                                </el-button>
                            </div>
                        </div>
                    </transition>
                </div>
                <!-- // 子评论分页 -->
                <el-pagination v-model:currentPage="item.Page" :page-size="5" layout="prev, pager, next"
                    :total="item.Cnt"
                    @current-change="handleCurrentChange2(item.ID,item.Page,index)">
                </el-pagination>
            </div>
            <el-pagination v-model:currentPage="pagination.page" :page-size="pagination.limit"
                layout="prev, pager, next" :total="pagination.total" @current-change="handleCurrentChange1" />

            <div class="input-wrapper" v-if="comments.showItemId === ''">
                <el-card shadow="never">
                    <div class="editor" contenteditable="true" id="editor">
                    </div>
                </el-card>
                <el-popover :visible="emoShow" placement="top" :width="400" trigger="click">
                    <template #reference>
                        <img src="@/assets/svg/laugh.svg" class="emoImg" @click="emoShow = !emoShow">
                    </template>
                    <el-card shadow="hover">
                        <el-space wrap>
                            <span v-for="(line, i) in emotionList.emotions" :key="'emojo'+i"
                                @click.stop="addEmotion(line.name),emoShow = false" v-html="line.url"></span>
                        </el-space>
                    </el-card>
                </el-popover>
                <div class="btn-control">
                    <span class="cancel" @click="cancel">取消</span>
                    <el-button class="btn" type="success" round @click="commitComment">确定
                    </el-button>
                </div>
            </div>
        </div>
    </el-card>
</template>

<style scoped>

.card {
  background: linear-gradient(to bottom, #2878EB 0%, #2878EB 48vh, white 48vh, white 100%);
  border: 0;
}
::v-deep .el-card__body {
  margin: 3% 14%;
  /*padding: 0px;*/
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,.15);
  -webkit-box-shadow: 0 2px 6px rgba(0,0,0,.15);
}
.editor {
    height: 200px;
    font-size: large;
    padding: 3px;
}

.emoImg {
    margin-top: 3px;
    border-radius: 20px 20px 20px 20px;
}

.emoImg:hover {
    box-shadow: 0px 0px 4px black;
}


.container {
    padding: 0 10px;
    box-sizing: border-box;
}

.container .comment {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid #EBEEF5;
}

.container .comment .info {
    display: flex;
    align-items: center;
}

.container .comment .info .avatar {
    border-radius: 50%;
    display: inline-block;
}

.container .comment .reply .avatar {
    margin: 5px;
    border-radius: 50%;
}

.container .comment .info .right {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}

.container .comment .info .right .name {
    font-size: 16px;
    color: #303133;
    margin-bottom: 5px;
    font-weight: 500;
}

.container .comment .info .right .date {
    font-size: 12px;
    color: #909399;
}

.container .comment .content {
    font-size: 16px;
    color: #303133;
    line-height: 20px;
    padding: 10px 0;
}

.container .comment .control {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #909399;
    cursor: pointer;
}

.container .comment .control .like {
    display: flex;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;
}

.container .comment .control .like.active,
.container .comment .control .like:hover {
    color: #409EFF;
}

.container .comment .control .like .iconfont {
    font-size: 14px;
    margin-right: 5px;
}

.container .comment .control .comment-reply {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.container .comment .control .comment-reply:hover {
    color: #333;
}

.container .comment .control .comment-reply .iconfont {
    font-size: 16px;
    margin-right: 5px;
}

.container .comment .reply {
    margin: 10px 0;
    border-left: 2px solid #DCDFE6;
}

.container .comment .reply .item {
    margin: 0 10px;
    padding: 10px 0;
    border-bottom: 1px dashed #EBEEF5;
}

.container .comment .reply .item .reply-content {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #303133;
}

.container .comment .reply .item .reply-content .from-name {
    color: #409EFF;
}

.container .comment .reply .item .reply-content .to-name {
    color: #409EFF;
    margin-left: 5px;
    margin-right: 5px;
}

.container .comment .reply .item .reply-bottom {
    display: flex;
    align-items: center;
    margin-top: 6px;
    font-size: 12px;
    color: #909399;
}

.container .comment .reply .item .reply-bottom .reply-text {
    display: flex;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
}

.container .comment .reply .item .reply-bottom .reply-text:hover {
    color: #333;
}

.container .comment .reply .item .reply-bottom .reply-text .icon-comment {
    margin-right: 5px;
}

.container .comment .reply .write-reply {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #909399;
    padding: 10px;
    cursor: pointer;
}

.container .comment .reply .write-reply:hover {
    color: #303133;
}

.container .comment .reply .write-reply .el-icon-edit {
    margin-right: 5px;
}

.container .comment .reply .fade-enter-active,
.container .comment .reply fade-leave-active {
    transition: opacity 0.5s;
}

.container .comment .reply .fade-enter,
.container .comment .reply .fade-leave-to {
    opacity: 0;
}

.input-wrapper {
    padding: 10px;
  /*background: white;*/
}

.input-wrapper ::v-deep .el-card__body {
  margin: 0;
  /*padding: ;*/
}
.container .comment .reply .input-wrapper .gray-bg-input,
.container .comment .reply .input-wrapper .el-input__inner {
    /*background-color: #67C23A;*/
}

.input-wrapper .btn-control {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 10px;
}

.input-wrapper .btn-control .cancel {
    font-size: 16px;
    color: #606266;
    margin-right: 20px;
    cursor: pointer;
}

.container .comment .reply .input-wrapper .btn-control .cancel:hover {
    color: #333;
}

.container .comment .reply .input-wrapper .btn-control .confirm {
    font-size: 16px;
}
</style>

<script lang='ts'>
import { reactive, onMounted, ref } from 'vue'
import { AvatarService, CommentService, UserService } from '@/api/api'
import emotions from './emotionList'
import { ElMessage } from 'element-plus'
export default {

    setup() {
        let isLogined = false
        onMounted(() => {
            getEmotions()
            getInfo()
            UserService.getUserInfo().then((res: any) => {
                user.info.account = res.data.data.Account
                user.info.name = res.data.data.Name
                user.info.avatar = res.data.data.Avatar as string
                if (user.info.account !== ""){
                    isLogined = true
                }
            })
        })
        const commentsInfo = reactive({
            info:[]
        })
        const comments = reactive({
            inputComment: '',
            showItemId: '',
            commentTo: '',
            commentId: '',
            to_account:'',
        })
        const user = reactive({
            info: {
                name: "",
                avatar: "",
                account: "",
            }
        })
        const pagination = reactive({
            total: 0,
            limit: 10,
            page: 1,
            loading: true
        })
        const emotionList = reactive({
            emotions: [{}]
        })
        const emoShow = ref(false)

        const getEmotions = function () {
            const list = emotions.emotionList
            var emotionArr: Object[] = []
            list.map((item, index) => {
                emotionArr.push({
                    name: `#${item};`,
                    url: `<img title="${item}" src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif">`,
                })
            })
            emotionList.emotions = emotionArr
        }
        const handleCurrentChange1 = function (val: number) {
            pagination.page = val
            getInfo()
        }
        const handleCurrentChange2 = function (id: number, val: number, index) {
            CommentService.commentChild(id, val-1).then((res) => {
                commentsInfo.info[index].Children = res.data.data
            })
        }
        // 点赞
        const likeClick = function (index) {
            if (!('isLike' in comments.info.data[index])) {
                comments.info.data[index].isLike = true
                comments.info.data[index].LikeNum++
                CommentService.commentLike(comments.info.data[index].CommentId, 1).then()
            } else {
                if (comments.info.data[index].isLike) {
                    comments.info.data[index].LikeNum--
                    CommentService.commentLike(comments.info.data[index].CommentId, -1).then()
                } else {
                    comments.info.data[index].LikeNum++
                    CommentService.commentLike(comments.info.data[index].CommentId, 1).then()
                }
                comments.info.data[index].isLike = !comments.info.data[index].isLike
            }
        }

        const getAvatar = function (num) {
            return AvatarService.getAvatarURL(Number(num))
        }

        // 清空评论列表
        const cancel = function () {
            document.getElementById("editor")!.innerText = ""
            comments.showItemId = ''
            comments.inputComment = ''
            comments.commentTo = ''
            comments.to_account = ''
        }

        //提交评论
        const commitComment = function () {
            if (!isLogined){
                ElMessage.error("请登录")
                return 
            }
            var temp = document.getElementById("editor")!.innerHTML
            comments.inputComment = temp
            const r = /@[a-zA-Z0-9]*\s/
            if (r.test(comments.inputComment)) {
                comments.inputComment = comments.inputComment.replace(r, "")
            }
            if (comments.showItemId == ""){
                comments.showItemId = "0"
            }
            let param = {
                content: comments.inputComment,
                to_name: comments.commentTo,
                from_id: user.info.account,
                from_avatar: user.info.avatar as string,
                from_name: user.info.name,
                to_account:comments.to_account,
                comment_id: comments.showItemId
            }
            CommentService.commentUpload(param).then((res) => {
                ElMessage.success("评论成功")
                cancel()
                getInfo()
            })
        }

        // 回复显示
        const showCommentInput = function (item, reply) {
            comments.showItemId = item.ID
            if (reply) {
                comments.commentTo = reply.Author.name
                comments.to_account = reply.Author.account
            } else {
                comments.commentTo = item.Author.name
            }
        }

        // 从后台请求数据
        const getInfo = function () {
            pagination.loading = true
            CommentService.commentList(pagination.limit, pagination.page).then((res: any) => {
                commentsInfo.info = res.data.data.Comments
                pagination.total = res.data.data.Cnt
            }).catch(()=>{})
            pagination.loading = false
        }
        const processEmotion = function (str) {
            return str.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, (words) => {
                let word = words.replace(/\#|\;/gi, '')
                let index = emotions.emotionList.indexOf(word)
                if (index !== -1) {
                    return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`
                } else {
                    return words
                }
            })
        }
        function pasteHtmlAtCaret(html) {
            var sel, range;
            if (window.getSelection) {
                // IE9 and non-IE
                sel = window.getSelection();
                if (sel.anchorNode != document.getElementById("editor")) {
                    return
                }
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();

                    // Range.createContextualFragment() would be useful here but is
                    // only relatively recently standardized and is not supported in
                    // some browsers (IE9, for one)
                    var el = document.createElement("div");
                    el.innerHTML = html;
                    var frag = document.createDocumentFragment(), node, lastNode;
                    while ((node = el.firstChild)) {
                        lastNode = frag.appendChild(node);
                    }
                    range.insertNode(frag);

                    // Preserve the selection
                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            }
        }
        // 使用表情
        const addEmotion = function (val) {
            pasteHtmlAtCaret(processEmotion(val))
        }

        return {
            comments,
            likeClick,
            cancel,
            commitComment,
            showCommentInput,
            getAvatar,
            pagination,
            getInfo,
            handleCurrentChange1,
            handleCurrentChange2,
            addEmotion,
            emoShow,
            emotionList,
            commentsInfo
        }
    }
}
</script>