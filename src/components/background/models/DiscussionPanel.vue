<template>
    <el-table v-loading="pagination.loading" :data="commentList" style="width:100%" class="commentTable">
        <el-table-column fixed prop="Author.name" label="用户名" width="120px" />
        <el-table-column label="评论" width="620px">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <div style="margin-left: 10px" v-html="scope.row.content"></div>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="likes" label="点赞数" width="160px" />
        <el-table-column prop="date" label="发布时间" width="480">
            <!-- <template #default="scope">
                {{ parseTime(Number(commentList[scope.$index].date)*1000) }}
            </template> -->
        </el-table-column>
        <el-table-column fixed="right" width="160px">
            <template #default="scope">
                <el-button link type="primary" size="small" @click.prevent="childRow(scope.$index)">
                    查看子评论
                </el-button>

                <el-popconfirm title="确定要删除这条评论么" @confirm="deleteRow(commentList[scope.$index].ID)">
                    <template #reference>
                        <el-button link type="warning" size="small">
                            删除
                        </el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination v-model:currentPage="pagination.page" :page-size="pagination.limit" layout="prev, pager, next"
        :total="pagination.total" @current-change="handleCurrentChange" />
</template> 

<style scoped>
.commentTable {
    margin: 5vh;
    font-size: 16px
}
</style>

<script lang='ts'>
import { onMounted, ref, reactive, h } from 'vue'
import { useRouter } from 'vue-router';
import { CommentService } from '@/api/api'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
export default {
    setup() {
        const router = useRouter()
        interface Comment {
            CommentId: string
            Date: number
            OwnerId: string
            FromId: string
            FromName: string
            FromAvatar: string
            LikeNum: number
            Content: string
            Reply: [],
            ChildPage: number
            ChildTotal: number
        }

        const parseTime = function (time: number) {
            var d = new Date(time)
            var res = ""
            res += d.getFullYear() + "年"
            res += d.getMonth() + 1 + "月"
            res += d.getDate() + "日\t"
            var h = d.getHours() + ""
            var m = d.getMinutes() + ""
            if (h.length == 1) {
                h = "0" + h
            }
            if (m.length == 1) {
                m = "0" + m
            }
            res += h + ":" + m
            return res
        }


        const commentList = reactive<Comment[]>([])

        const pagination = reactive({
            total: 0,
            limit: 10,
            page: 1,
            loading: true
        })

        const childRow = function (row) {
            router.push({ path: '/background/discussion/child', query: { commentId: commentList[row].ID } })
        }

        const deleteRow = function (id) {
            CommentService.commentDelete(id).then((res) => {
                if (res.status == 200) {
                    ElMessage.warning("删除" + id + "号评论成功")
                }
                getInfo()
            }).catch(() => {
                ElMessage.warning("删除" + id + "号评论失败，请联系管理员")
            })
            getInfo()
        }

        const handleCurrentChange = function () {
            getInfo()
        }
        // 从后台请求数据
        const getInfo = function () {
            pagination.loading = true
            CommentService.commentList(pagination.limit, pagination.page).then((res: any) => {
                commentList.length = 0
                res.data.data.Comments.forEach(element => {
                    commentList.push(element)
                });
                pagination.total = res.data.data.Cnt
            })
            pagination.loading = false
        }

        onMounted(() => {
            getInfo()
        })

        return {
            commentList,
            pagination,
            childRow,
            deleteRow,
            handleCurrentChange,
            parseTime
        }
    }
}

</script>