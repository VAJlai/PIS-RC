<template>
  <!-- <UpCard /> -->
  <el-card
    shadow="never"
    style="padding-top: 5rem; width: 100vw"
    id="card-show"
  >
    <el-col :span="26" :offset="6">
      <el-form :model="ruleForm" ref="ruleFormRef" :inline="true">
        <el-form-item prop="statements">
          <el-input v-model="ruleForm.statements" class="input-reader-name">
            <el-select v-model="language" slot="prepend" placeholder="请选择">
              <el-option label="中文" value="1"></el-option>
              <el-option label="英文" value="2"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm(ruleFormRef)">
            <el-icon :size="26">
              <Search />
            </el-icon>
          </el-button>
        </el-form-item>

        <el-card shadow="never" class="sample">
          <i class="textStyle"
            >专业检索使用方法：<br />
            1）TH='生态' and KY='生态文明' and AU='陈' or AU='王'  可以检索到主题包括“生态”同时关键词包括“生态文明”，并且作者姓名中包含“陈”和“王”的所有文章；<br />
		2）TH='北京' and TH='奥运' and TI='环境保护' 可以检索到主题包括“北京”及“奥运”并且标题中包括“环境保护”的信息；<br />
		3）TH='经济发展' or TH='可持续发展' and TH='转变' and TH!='泡沫' 可检索主题“经济发展”或“可持续发展”有关“转变”的信息，并且可以去除与“泡沫”有关的部分内容。<br />
		可检索字段：<br />
			TH：主题&nbsp;
			TI：篇名&nbsp;
			KY：关键词&nbsp;
			AB：摘要&nbsp;
			AU：作者<br />
			AF：作者单位&nbsp;
			PR：出版社&nbsp;
			LY：来源&nbsp;
			DB：数据库<br />
		检索关系：<br />
		and/AND：与(同时满足)<br />
		or/OR：或者(多者满足其一即可)<br />
		=：包含(有就可以)<br />
		!=：不包含(不能存在)<br />
          </i>
        </el-card>
      </el-form>
    </el-col>
  </el-card>
  <SearchResult :searchInfo="info" @pageChange="pageChange"></SearchResult>
</template>

<style scoped>
#card-show {
  position: relative;
  left: -23%;
  padding-left: 15%;
  /* border-bottom: 1px solid #2878eb; */
  padding-bottom: 100px;
  background-image: linear-gradient(125deg, #02725f, #1d9e5e, #0b5eee, #f55b38);
  background-size: 400%;
  animation: bgmove 15s infinite;
}
@keyframes bgmove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
::v-deep .input-reader-name {
  min-width: 22vh;
}
.el-form .el-form-item /deep/ .el-input {
  font-size: 18px;
  color: blue;
  width: 36vw;
  height: 2.8rem;
  /* margin-bottom: 1.5rem; */
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}

.el-form .el-form-item /deep/ .el-button {
  width: 5rem;
  height: 2.7rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}
.sample {
  background-color: #ffffff00;
  color: rgb(255, 255, 255);
  font-size: 12px;
}

.textStyle {
  margin-top: 20px;
  font: normal 500 14px 宋体;
  line-height: 20px;
}
.pStyle {
  font: normal 500 14px 宋体;

  line-height: 20px;
}
</style>

<script lang='ts'>
import UpCard from "../main/UpCard.vue";
import { reactive, ref, watch } from "vue";
import SearchResult from "@/components/panel/models/search/SearchResult.vue";

import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { PaperService } from "@/api/api";

export default {
  components: {
    UpCard,
    SearchResult,
  },
  setup() {
    const ruleFormRef = ref<FormInstance>();
    const ruleForm = reactive({
      statements: "",
    });

    const rules = reactive<FormRules>({
      statements: [
        { required: true, message: "请输入检索信息", trigger: "blur" },
      ],
    });

    const pagination = reactive({
      total: 0,
      limit: 10,
      page: 1,
      loading: true,
    });

    const info = reactive({
      res: [],
      total: 0,
    });

    // 分页触发的更改函数
    const pageChange = function (newPage) {
      pagination.page = Number(newPage);
    };
    // 分页变动则重新查询
    watch(pagination, () => {
      getInfo();
    });

    const getInfo = function () {
      PaperService.paperSearchProfessional(
        ruleForm.statements,
        pagination.limit,
        pagination.page - 1
      ).then((res: any) => {
        if (res.data.code == 200) {
          console.log(res)
          // 利用msg传递查询结果总数
          info.res = res.data.data;
          info.total = Number(res.data.msg);
        }
      });
    };

    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          //验证成功，执行下面方法
          getInfo();
        } else {
          ElMessage.error("检索条件不能为空");
        }
      });
    };

    return {
      ruleForm,
      ruleFormRef,
      rules,
      submitForm,
      info,
      pagination,
      pageChange,
    };
  },
};
</script>