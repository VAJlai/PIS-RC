<template>
    <div>
        <el-card class="add">
            <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef" :model="ruleForm">

                <el-form-item label="主题" prop="theme" :rules="[
                    { required: true, message: '请输入主题', trigger: 'blur' },
                ]">
                    <el-input placeholder="EG：环保" v-model="ruleForm.theme" />
                </el-form-item>

                <el-form-item label="篇名" prop="title" :rules="[
                    { required: true, message: '请输入篇名', trigger: 'blur' },
                ]">
                    <el-input placeholder="EG：四川金阳地区水系沉积物磷元素地球化学特征及地质意义" v-model="ruleForm.title" />
                </el-form-item>

                <el-form-item label="关键词" prop="keyword" :rules="[
                    { required: true, message: '请输入关键词', trigger: 'blur' },
                ]">
                    <el-input placeholder="用符号 '|' 分隔" v-model="ruleForm.keyword" />
                </el-form-item>

                <el-form-item label="出版社" prop="press" :rules="[
                    { required: true, message: '请输入出版社', trigger: 'blur' },
                ]">
                    <el-input placeholder="出版社名称" v-model="ruleForm.press" />
                </el-form-item>

                <br>
                <el-form-item label="摘要" prop="abstract" :rules="[
                    { required: true, message: '请输入摘要', trigger: 'blur' },
                ]">
                    <el-input type="textarea" class="abstract" v-model="ruleForm.abstract" />
                </el-form-item>
                <br>

                <el-form-item label="作者" prop="author" :rules="[
                    { required: true, message: '请输入作者', trigger: 'blur' },
                ]">
                    <el-input placeholder="用符号 '|' 分隔" v-model="ruleForm.author" />
                </el-form-item>

                <el-form-item label="作者单位" prop="authorunit" :rules="[
                    { required: true, message: '请输入作者单位', trigger: 'blur' },
                ]">
                    <el-input placeholder="单位名称" v-model="ruleForm.authorunit" />
                </el-form-item>

                <el-form-item label="来源" prop="source" :rules="[
                    { required: true, message: '请输入来源', trigger: 'blur' },
                ]">
                    <el-input placeholder="来源" v-model="ruleForm.source" />
                </el-form-item>

                <br>

                <el-form-item label="数据库" prop="database" :rules="[
                    { required: true, message: '请选择数据库', trigger: 'blur' },
                ]">
                    <el-select placeholder="选择所属数据库" v-model="ruleForm.database">
                        <template v-for="item in databases">
                            <el-option :label="item.name" :value="item.baseLabel"></el-option>
                        </template>
                    </el-select>
                </el-form-item>

                <el-form-item label="出版日期" prop="publish_time" :rules="[
                    { required: true, message: '请选择出版时间', trigger: 'blur' },
                ]">
                    <el-date-picker v-model="ruleForm.publish_time" type="date" placeholder="选择发布日期" value-format="x" />
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
                <br>
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
import { onMounted, reactive, ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { genFileId } from 'element-plus'
import { PaperService } from '@/api/api';
import router from '../../../router';
export default {
    setup() {
        // FormRules类型
        const ruleFormRef = ref<FormInstance>()

        const ruleForm = reactive({
            theme: '1',
            title: '1',
            keyword: '1',
            abstract: '1',
            author: '1',
            authorunit: '1',
            press: '1',
            source: '1',
            database: '1',
            publish_time: '',
        })
        const uploadURI = reactive({
            value: ''
        })
        onMounted(() => {
            uploadURI.value = PaperService.paperUploadURI()
        })
        let isUploaded = false
        const handleChange = function () {
            isUploaded = true
        }

        const upload = ref<UploadInstance>()

        const handleExceed: UploadProps['onExceed'] = (files) => {
            upload.value!.clearFiles()
            const file = files[0] as UploadRawFile
            file.uid = genFileId()
            upload.value!.handleStart(file)
        }

        const databases = ref([
            { name: '资料数据库', baseLabel: 2 },
            { name: '案例数据库', baseLabel: 6 },
            { name: '政策数据库', baseLabel: 13 },
            { name: '书评数据库', baseLabel: 15 },
            { name: '期刊', baseLabel: 3 },
            { name: '图书', baseLabel: 4 },
            { name: '纳米技术', baseLabel: 7 },
            { name: '生物技术', baseLabel: 8 },
            { name: '人工智能', baseLabel: 9 },
            { name: '信息和通信技术', baseLabel: 10 },
            { name: '应用认知科学', baseLabel: 11 },
            { name: '其他', baseLabel: 12 },
        ])

        const callApi = function () {
            upload.value!.submit()
        }

        const submitForm = async (formEl: FormInstance | undefined) => {
            if (!formEl) return;
            await formEl.validate((valid, fields) => {
                if (valid && isUploaded) {
                    //验证成功，执行下面方法
                    callApi();
                } else {
                    ElMessage.error("请重新填写并上传源文件")
                }
            });
        };

        const uploadSuccess = function () {
            ElMessage.success("上传成功")
            router.push({ path: "/background/article/panel" })
        }
        // 上传文件时的请求头
        const headerObj = {
            Authorization: "Bearer " + localStorage.getItem("token"),
        }
        return {
            ruleForm,
            databases,
            ruleFormRef,
            submitForm,
            handleExceed,
            upload,
            uploadURI,
            headerObj,
            uploadSuccess,
            isUploaded,
            handleChange
        }
    }
}

</script>