<template>
    <el-row>
        <el-col :span="12" :offset="6">
            <el-card class="infoCard">
                <el-card shadow="never">
                    <el-row>
                        <el-col :span="10" :offset="1">
                            <el-avatar :size="260" :src="info.avatarUrl" style="margin-top: 1vh;" @click="
                            dialogFormVisible = true" />
                            <el-dialog v-model="dialogFormVisible" title="更换头像" :width="500">
                                <div class="demo-type">
                                    <div v-for="item in 4">
                                        <el-avatar :src="getAvatar(item)"
                                            @click="changeAvatar(item); dialogFormVisible = false" />
                                    </div>
                                </div>
                                <el-divider border-style="dashed" />
                                <div class="demo-type">
                                    <div v-for="item in 4">
                                        <el-avatar :src="getAvatar(item + 4)"
                                            @click="changeAvatar(item + 4); dialogFormVisible = false" />
                                    </div>
                                </div>
                            </el-dialog>
                        </el-col>
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="8">
                                    <br>
                                    <div class="infoChange"><span>账号</span>
                                    </div>
                                    <div class=" infoChange"><span>用户名</span>
                                    </div>
                                    <div class="infoChange"><span>密码</span> </div>
                                    <div class="infoChange"><span>重复密码</span> </div>
                                </el-col>

                                <el-col :span="16">
                                    <br>
                                    <div class="infoChange">
                                        <el-input :placeholder="info.account" style="display: inline;" disabled />
                                    </div>
                                    <div class=" infoChange">
                                        <el-input v-model="info.name" placeholder="Please input"
                                            style="display: inline;" />
                                    </div>
                                    <div class="infoChange">
                                        <el-input v-model="info.pwd1" placeholder="Please input"
                                            style="display: inline;" type="password" />
                                    </div>
                                    <div class="infoChange">
                                        <el-input v-model="info.pwd2" placeholder="Please input"
                                            style="display: inline;" type="password" />
                                    </div>
                                </el-col>
                            </el-row>
                            <el-button plain type="success" style="width: 23vh;margin: 3px;" @click="updateInfo()">更新信息
                            </el-button>

                        </el-col>
                    </el-row>
                </el-card>
                <SearchHistory />
            </el-card>
        </el-col>
    </el-row>
</template>

<style scoped>
.demo-type {
    display: flex;
}

.demo-type>div {
    flex: 1;
    text-align: center;
}

.demo-type>div:not(:last-child) {
    border-right: 1px solid var(--el-border-color);
}

.infoCard {
    min-height: 70vh
}

.infoChange {
    height: 4vh;
    display: block;
}
</style>

<script lang='ts'>

import SearchHistory from "@/components/panel/models/searchHistory/Main.vue"
import { AvatarService, UserService } from "@/api/api"
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import { onMounted, reactive, ref } from 'vue'

export default {
    components: {
        SearchHistory,
    },
    setup() {
        const router = useRouter()
        const info = reactive({
            account: '',
            name: '',
            points: '',
            avatar: '',
            types: '',
            avatarUrl: '',
            pwd1: '',
            pwd2: ''
        })
        onMounted(() => {
            UserService.getUserInfo().then((res: any) => {
                info.name = res.data.data.name
                info.account = res.data.data.account
                info.points = res.data.data.points
                info.avatar = res.data.data.avatar
                info.types = res.data.data.types
                info.avatarUrl = AvatarService.getAvatarURL(Number(res.data.data.avatar))
            })
        })
        const dialogFormVisible = ref(false)

        const changeAvatar = function (index: string) {
            info.avatar = index
            info.avatarUrl = AvatarService.getAvatarURL(Number(index))
        }
        const getAvatar = function (index: number) {
            return AvatarService.getAvatarURL(index)
        }
        const updateInfo = function () {
            let param = {
                Password: "",
                Name: info.name,
                Avatar: info.avatar
            }
            if (info.pwd1.length != 0) {
                if (info.pwd1.length < 6) {
                    ElMessage({
                        message: '密码长度至少6位',
                        type: 'error',
                    })
                    return
                }
                if (info.pwd1 != info.pwd2) {
                    ElMessage({
                        message: '两次输入密码不一致',
                        type: 'error',
                    })
                    return
                }
                param.Password = info.pwd1
            }
            console.log(param)
            UserService.userInfoModify(param).then((res: any) => {
                    localStorage.clear();
                    router.push("/login"); //跳回登录地址
            })
        }



        return {
            info,
            changeAvatar,
            dialogFormVisible,
            getAvatar,
            updateInfo
        }
    }

}

</script>
