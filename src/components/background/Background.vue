<template>

    <Head />
    <el-col :span="18" :offset="3">
        <el-card class="backCard">
            <el-row class="tac">
                <el-col :span="4" :offset="1">
                    <h3>后台管理页面</h3>
                    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                        router>
                        <!-- 文章管理 -->
                        <el-sub-menu index="1">
                            <template #title>
                                <el-icon>
                                    <Document />
                                </el-icon>
                                <span>文章管理</span>
                            </template>
                            <el-menu-item index="/background/article/add">添加文章</el-menu-item>
                            <el-menu-item index="/background/article/panel">文章面板</el-menu-item>
                        </el-sub-menu>
                        <!-- 会员管理 -->
                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon>
                                    <Avatar />
                                </el-icon>
                                <span>会员管理</span>
                            </template>
                            <el-menu-item index="/background/member/add">添加会员</el-menu-item>
                            <el-menu-item index="/background/member/panel">会员面板</el-menu-item>
                        </el-sub-menu>
                        <!-- 讨论管理 -->
                        <el-menu-item index="/background/discussion/panel">
                            <el-icon>
                                <Comment />
                            </el-icon>
                            <span>讨论管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="18">
                    <router-view></router-view>
                </el-col>
            </el-row>
        </el-card>
    </el-col>
</template>

<style scoped>
.backCard {
    margin-top: 4vh;
    min-height: 70vh
}

.tac {
    margin-top: 3vh;
}
</style>

<script lang='ts'>
import Head from "@/components/panel/Head.vue"
export default {
    components: {
        Head,
    },
    setup() {
        return {
        }
    }
}

</script>