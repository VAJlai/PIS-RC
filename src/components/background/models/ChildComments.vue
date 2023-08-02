<template>
    <div>
        <el-card class="add">
            <el-page-header :content="commentId" @back="goBack" />
            <el-table :data="childList" row-style="height:120px;">
                <el-table-column fixed prop="Author.ID" label="评论者" width="120px" />
                <el-table-column label="内容" width="600px">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <div style="margin-left: 10px" v-html="scope.row.content"></div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="CreatedAt" width="160px" label="发布时间">
                </el-table-column>>
                <el-table-column fixed="right" width="60px">
                    <template #default="scope">
                        <el-popconfirm title="确定要删除这条评论么" @confirm="deleteRow(childList[scope.$index].ID)">
                            <template #reference>
                                <el-button link type="warning" size="small">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:currentPage="pagination.page" :page-size="pagination.limit"
                layout="prev, pager, next" :total="pagination.total" @current-change="handleCurrentChange" />
        </el-card>
    </div>
</template>

<style scoped>
.add {
    margin: 2vh;
}

::v-deep .abstract {
    min-width: 70vh;
}
</style>

<script lang='ts'>
import { useRoute } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router/index.js';
import { CommentService } from '@/api/api'
import { flatMap } from 'lodash';
export default {
    setup() {

        onMounted(() => {
            getInfo()
        })


        const pagination = reactive({
            total: 0,
            limit: 5,
            page: 1,
            loading: true
        })

        const getInfo = function () {
            CommentService.commentChild(route.query.commentId, pagination.page - 1).then((res) => {
                console.log(res)
                pagination.total = res.data.data.cnt
                childList.length = 0
                res.data.data.comments.forEach(element => {
                    childList.push(element)
                });
                pagination.loading = false
            })
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

        interface Child {
            ChildId: string
            Content: string
            Date: number
            FromId: string
        }

        const childList = reactive<Child[]>([])

        const route = useRoute()
        //query
        const commentId = ref("正在查看的评论id为" + route.query.commentId);

        const goBack = function () {
            router.push({ path: '/background/discussion/panel' })
        }

        const handleCurrentChange = function () {
            getInfo()
        }

        const deleteRow = function (child) {
            CommentService.commentChildDelete(route.query.commentId,child).then((res) => {
                if (res.status == 200) {
                    ElMessage.warning("删除" + child + "号评子论成功")
                }
                getInfo()
            }).catch(() => {
                ElMessage.warning("删除" + child + "号子评论失败，请联系管理员")
            })
            getInfo()
        }

        return {
            goBack,
            commentId,
            pagination,
            childList,
            parseTime,
            deleteRow,
            handleCurrentChange
        }
    }
}

</script>