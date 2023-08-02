<template>

    <div>
        <el-card class="add">
            <el-page-header :content="articleId" @back="goBack" />
            <el-divider content-position="left"><span style="color: #f89898">文章id不可修改</span></el-divider>
            <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef" :model="ruleForm.value">
                <el-form-item label="主题" prop="theme" :rules="[
                    { required: true, message: '请输入主题', trigger: 'blur' },
                ]">
                    <el-input placeholder="EG：环保" v-model="ruleForm.value.theme" />
                </el-form-item>

                <el-form-item label="篇名" prop="title" :rules="[
                    { required: true, message: '请输入篇名', trigger: 'blur' },
                ]">
                    <el-input placeholder="EG：四川金阳地区水系沉积物磷元素地球化学特征及地质意义" v-model="ruleForm.value.title" />
                </el-form-item>

                <el-form-item label="关键词" prop="keyword" :rules="[
                    { required: true, message: '请输入关键词', trigger: 'blur' },
                ]">
                    <el-input placeholder="用符号 ',' 分隔" v-model="ruleForm.value.keyword" />
                </el-form-item>

                <el-form-item label="出版社" prop="press" :rules="[
                    { required: true, message: '请输入出版社', trigger: 'blur' },
                ]">
                    <el-input placeholder="出版社名称" v-model="ruleForm.value.press" />
                </el-form-item>

                <br>
                <el-form-item label="摘要" prop="abstract" :rules="[
                    { required: true, message: '请输入摘要', trigger: 'blur' },
                ]">
                    <el-input type="textarea" class="abstract" v-model="ruleForm.value.abstract" />
                </el-form-item>
                <br>

                <el-form-item label="作者" prop="author" :rules="[
                    { required: true, message: '请输入作者', trigger: 'blur' },
                ]">
                    <el-input placeholder="用符号 '|' 分隔" v-model="ruleForm.value.author" />
                </el-form-item>

                <el-form-item label="作者单位" prop="author_unit">
                    <el-input placeholder="单位名称" v-model="ruleForm.value.author_unit" />
                </el-form-item>

                <el-form-item label="来源" prop="source" :rules="[
                    { required: true, message: '请输入来源', trigger: 'blur' },
                ]">
                    <el-input placeholder="来源" v-model="ruleForm.value.source" />
                </el-form-item>

                <br>

                <el-form-item label="数据库" prop="database" :rules="[
                    { required: true, message: '请选择数据库', trigger: 'blur' },
                ]">
                    <el-select placeholder="选择所属数据库" v-model="ruleForm.value.database">
                        <template v-for="item in databases">
                            <el-option :label="item.name" :value="item.baseLabel"></el-option>
                        </template>
                    </el-select>
                </el-form-item>

                <el-form-item label="出版日期" prop="publish_time" :rules="[
                    { required: true, message: '请选择出版时间', trigger: 'blur' },
                ]">
                    <el-date-picker v-model="ruleForm.value.publish_time" type="date" placeholder="选择发布日期" />
                </el-form-item>
                <br>

                <el-form-item>
                    <el-upload ref="upload" class="upload-demo" drag :action="uploadURI.value" multiple
                        :auto-upload="false" limit="1" :on-exceed="handleExceed" :data="ruleForm" :headers="headerObj"
                        :on-success="uploadSuccess" :on-change="handleChange">
                        <el-icon class="el-icon--upload" style="min-width: 90vh;">
                            <upload-filled />
                        </el-icon>
                        <div class="el-upload__text">
                            Drop file here or <em>click to upload</em>
                        </div>
                        <template #tip>
                            <div class="el-upload__tip">
                                文件大小不要超过20mb，支持的格式有txt、pdf
                            </div>
                        </template>
                    </el-upload>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">上传</el-button>
                </el-form-item>
            </el-form>
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
import { UploadFilled } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from 'element-plus'
import router from '@/router/index.js';
import { PaperService } from '@/api/api'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

export default {
    setup() {
        // FormRules类型
        const ruleFormRef = ref<FormInstance>()

        const ruleForm = reactive({
            value: ''
        })

        const databases = ref([
            { name: '资料数据库', baseLabel: 'data_database' },
            { name: '案例数据库', baseLabel: ' case_database' },
            { name: '政策数据库', baseLabel: 'policy_database' },
            { name: '书评数据库', baseLabel: 'bookreview_database' },
            { name: '期刊', baseLabel: 'journal_database' },
            { name: '图书', baseLabel: ' book_database' },
            { name: '网页', baseLabel: 'web_database' },
            { name: '纳米技术', baseLabel: ' nanotechnology_database' },
            { name: '生物技术', baseLabel: 'biological_database' },
            { name: '人工智能', baseLabel: ' ai_database' },
            { name: '信息和通信技术', baseLabel: 'ICT_database' },
            { name: '应用认知科学', baseLabel: ' Applicationaware_database' },
            { name: '其他', baseLabel: 'other_database' },
        ])
        const uploadURI = reactive({
            value: ''
        })

        onMounted(() => {
            PaperService.paperFindByID(Number(route.query.articleId)).then((res: any) => {
                ruleForm.value = res.data.data
            })

            uploadURI.value = PaperService.paperUpdateURI()
        })


        const uploadSuccess = function () {
            ElMessage.success("上传成功")
            router.push({ path: "/background/article/panel" })
        }
        const upload = ref<UploadInstance>()

        
        let isUploaded = false
        const handleChange = function () {
            isUploaded = true
        }

        const handleExceed: UploadProps['onExceed'] = (files) => {
            upload.value!.clearFiles()
            const file = files[0] as UploadRawFile
            file.uid = genFileId()
            upload.value!.handleStart(file)
        }

        const callApi = function () {
            upload.value!.submit()
        }

        // 上传文件时的请求头
        const headerObj = {
            Authorization: "Bearer " + localStorage.getItem("token"),
        }

        const submitForm = async (formEl: FormInstance | undefined) => {
            if (!formEl) return;
            await formEl.validate((valid, fields) => {
                if (valid) {
                    //验证成功，执行下面方法
                    callApi();
                } else {
                    ElMessage.error("请按要求重新填写")
                }
            });
        };

        const route = useRoute()
        //query
        const articleId = ref("正在编辑的文章id为" + route.query.articleId);

        const goBack = function () {
            router.push({ path: '/background/article/panel' })
        }




        return {
            ruleForm,
            databases,
            ruleFormRef,
            submitForm,
            goBack,
            articleId,
            headerObj,
            uploadSuccess,
            handleExceed,
            handleChange,
            isUploaded,
            uploadURI
        }
    }
}

</script>