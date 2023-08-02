<template>
    <el-table :data="paperList" style="width: 100%;" class="articleTable" :row-class-name="tableRowClassName">
        <el-table-column fixed prop="title" label="篇名" width="150" />
        <el-table-column prop="theme" label="主题" width="120" />
        <el-table-column prop="keyword" label="关键词" width="120" />
        <el-table-column prop="abstract" label="摘要" width="320" >
            <template #default="scope">
                {{ truncateString(scope.row.abstract,40)  }}
            </template>
        </el-table-column>
        <el-table-column prop="views" label="浏览量" width="180" />
        <el-table-column prop="author" label="作者" width="180">

            <!-- <template #default="scope">
                <div style="display: flex; align-items: center">
                    <template v-for="(item, i) in scope.row.Author">
                        <i v-if="i < 2">{{ item }} &ensp;</i>
                    </template>
                    <i v-if="scope.row.Author.length > 2">
                        <el-popover placement="top-start" title="所有作者" :width="200" trigger="hover"
                            :content="showAllAuthors(scope.$index)">
                            <template #reference>
                                ...
                            </template>
                        </el-popover>
                    </i>
                </div>
            </template> -->
        </el-table-column>
        <el-table-column prop="author_unit" label="作者单位" width="120" />
        <el-table-column prop="press" label="出版社" width="120" />
        <el-table-column prop="source" label="来源" width="120" />
        <el-table-column prop="database" label="所属数据库" width="120">
            <!-- <template #default="scope">
                {{ paperDatabaseParseChinese(scope.row.PaperDatabase) }}
            </template> -->
        </el-table-column>>
        <el-table-column prop="ID" label="论文储存编号" width="120" />
        <el-table-column prop="publish_time" label="发布日期" width="480">
            <!-- <template #default="scope">
                {{ parseTime(Number(paperList[scope.$index].PublishTime)) }}
            </template> -->
        </el-table-column>>
        <el-table-column fixed="right" label="操作" width="240">
            <template #default="scope">
                <el-button link type="primary" size="small" @click.prevent="editRow(paperList[scope.$index].ID)">
                    编辑
                </el-button>

                <el-popconfirm title="确定要删除这篇文章么" @confirm="deleteRow(paperList[scope.$index].ID)">
                    <template #reference>
                        <el-button link type="warning" size="small">
                            删除
                        </el-button>
                    </template>
                </el-popconfirm>

                <el-button type="danger" @click="banChange(paperList[scope.$index].ID,paperList[scope.$index].Ban)"
                    link>
                    <span v-if="!paperList[scope.$index].banned">封禁</span> <span v-else>解封</span>
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination v-model:currentPage="pagination.page" :page-size="pagination.limit" layout="prev, pager, next"
        :total="pagination.total" @current-change="handleCurrentChange" />
</template>


<style scoped>
.articleTable {
    margin: 5vh;
    font-size: 16px
}
</style>

<script lang='ts'>
import { onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { PaperService } from '@/api/api'
import { ElMessage } from 'element-plus';
import { flatMap } from 'lodash';
export default {
    setup() {
        const router = useRouter()

        interface Paper {
            Theme: string
            Title: string
            Keyword: [],
            Abstract: string
            Author: [],
            Authorunit: string
            Press: string
            Source: string
            PaperDatabase: string
            PublishTime: number
            PaperID: number
            Views: number
            Ban: boolean
        }

        const tableRowClassName = ({
            row,
            rowIndex,
        }: {
            row: Paper
            rowIndex: number
        }) => {
            if (row.Ban === true) {
                return 'warning-row'
            }
            return ''
        }

        const pagination = reactive({
            total: 0,
            limit: 10,
            page: 1,
            loading: true
        })

        const parseTime = function (time: number) {
            var d = new Date(time)
            var res = ""
            res += d.getFullYear() + "年"
            res += d.getMonth()+1 + "月"
            res += d.getDate() + "日\t"
            return res
        } 


        const banChange = function (id, ban) {
            PaperService.paperBanChange(id).then((res) => {
                if (res.status == 200 && ban) {
                    ElMessage.success("解封" + id + "号论文成功")
                } else {
                    ElMessage.warning("封禁" + id + "号论文成功")
                }
                getInfo()
            }).catch(() => {
                ElMessage.error("调整" + id + "号论文失败")
            })
        }

        const paperList = reactive<Paper[]>([])

        const handleCurrentChange = function () {
            getInfo()
        }

        const truncateString = function(str, maxLength) {
            if (str.length > maxLength) {
                return str.slice(0, maxLength - 3) + '...';
            }
            return str;
        }

        // 从后台请求数据
        const getInfo = function () {
            pagination.loading = true
            PaperService.paperList(pagination.limit, pagination.page).then((res: any) => {
                paperList.length = 0
                console.log(res.data.data)
                res.data.data.papers.forEach(element => {
                    paperList.push(element)
                });
                pagination.total = res.data.data.total
            })
            pagination.loading = false
        }

        onMounted(() => {
            getInfo()
        })

        const deleteRow = (id: number) => {
            PaperService.paperDelete(id).then((res) => {
                if (res.status == 200) {
                    ElMessage.warning("删除" + id + "号论文成功")
                }
                getInfo()
            }).catch(() => {
                ElMessage.warning("删除" + id + "号论文失败，请联系管理员")
            })
        }

        const editRow = function (index: number) {
            router.push({ path: '/background/article/edit', query: { articleId: index } })
        }

        const paperDatabaseParseChinese = function (database: string) {
            let databaseMap = new Map([
                ["data_database", "资料"],
                ["journal_database", "期刊"],
                ["book_database", "图书"],
                ["web_database", "网页"],
                ["case_database", "案例"],
                ["nanotechnology_database", "纳米技术"],
                ["biological_database", "生物技术"],
                ["ai_database", "人工智能"],
                ["ICT_database", "信息和通信技术"],
                ["Applicationaware_database", "应用认知科学"],
                ["other_database", "其他"],
                ["policy_database", "政策"],
                ["bookreview_database", "书评"],
            ]);
            return databaseMap.get(database)
        }

        const showAllAuthors = function (index: number) {
            let res = ""
            paperList[index].Author.forEach(element => {
                res += element + " "
            });
            return res
        }

        return {
            parseTime,
            paperList,
            deleteRow,
            editRow,
            paperDatabaseParseChinese,
            showAllAuthors,
            pagination,
            handleCurrentChange,
            tableRowClassName,
            banChange,
            truncateString
        }
    }
}

</script>