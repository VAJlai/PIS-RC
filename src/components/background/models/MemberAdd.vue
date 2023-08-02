<template>
    <el-table v-loading="pagination.loading" :data="userList" style="width: 100%" class="articleTable"
        :row-class-name="tableRowClassName">
        <el-table-column fixed prop="account" label="账号/邮箱" width="250" :row-style="{ height: '20px' }"
            :cell-style="{ padding: '0px' }" />
        <el-table-column prop="name" label="用户名" width="120" />
        <el-table-column prop="svatar" label="头像" width="90" />
        <el-table-column prop="types" label="类型" width="120" />
        <el-table-column prop="points" label="积分" width="60" />
        <el-table-column prop="banned" label="封禁状态" width="120" />
        <el-table-column fixed="right" label="Operations" width="240">
            <template #default="scope">
                <el-button link type="primary" size="small" @click.prevent="banUser(scope.$index)">
                    <span v-if="userList[scope.$index].banned" style="color: #67C23A;
    font-size: 18px">解封</span>

                    <span v-if="!userList[scope.$index].banned" style="color: #F56C6C;
    font-size: 18px">封禁</span>
                </el-button>

                <el-popconfirm title="确定要删除该用户么" @confirm="deleteUser(scope.$index)">
                    <template #reference>
                        <el-button link type="warning" size="small" style="font-size: 18px">
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
.articleTable {
    margin: 5vh;
    font-size: 18px
}
</style>

<script lang='ts'>
import { onMounted, ref, reactive } from "vue"
import { UserService } from "@/api/api"
export default {
    setup() {

        interface User {
            Account: string
            Name: string
            Avatar: number
            Types: string
            Points: number
            Banned: boolean
        }

        const userList = reactive<User[]>([])

        const pagination = reactive({
            total: 0,
            limit: 10,
            page: 1,
            loading: true
        })

        const tableRowClassName = ({
            row,
            rowIndex,
        }: {
            row: User
            rowIndex: number
        }) => {
            if (row.Banned === true) {
                return 'warning-row'
            }
            return ''
        }

        // 从后台请求数据
        const getInfo = function () {
            pagination.loading = true
            UserService.userBannedList(pagination.limit, pagination.page).then((res: any) => {
                userList.length = 0
                res.data.data.forEach(element => {
                    userList.push(element)
                });
            })
            pagination.loading = false
        }
        onMounted(() => {
            getInfo()
            UserService.userTotalBanned().then((res: any) => {
                pagination.total = Number(res.data.data)
            })
        })

        const handleCurrentChange = (val: number) => {
            pagination.page = val
            getInfo()
        }

        const banUser = function (index: number) {
            UserService.userBan(userList[index].account).then((res => {
                getInfo()
            }))
        }

        const deleteUser = function (index: number) {
            UserService.userDelete(userList[index].Account).then((res) => {
                getInfo()
            })
        }
        return {
            userList,
            pagination,
            handleCurrentChange,
            tableRowClassName,
            banUser,
            deleteUser,
        }
    }
}

</script>