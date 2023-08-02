<template>
  <!-- <UpCard /> -->
  <el-card
      shadow="never"
      style="
      padding-top: 5rem;
      width: 100vw;
    "
      id="card-show"
  >
    <el-button
        @click="submitForm(ruleFormRef)"
        id="button-style"
    >
      <el-icon :size="26">
        <Search/>
      </el-icon>
    </el-button>
    <el-col :span="28" :offset="5" style="margin-top: 0rem;">
      <el-form
          :model="ruleForm"
          ref="ruleFormRef"
          :inline="true"
          id="form-show"
          style="width: 80%"
      >
        <!-- 数据库选择 -->
        <el-form-item
            prop="database"
            :rules="[
            { required: true, message: '请选择数据库', trigger: 'blur' },
          ]"
        >
          <el-radio-group v-model="ruleForm.database" style="width: 100%;flex-wrap: nowrap;">
            <template v-for="item in databaseInfo.databaseFirst">
              <el-radio :label="item.baseLabel" style="margin-right: 16px;">{{ item.name }}</el-radio>
            </template>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item v-if="ruleForm.database >= 2 && ruleForm.database < 6">
          <el-radio-group v-model="ruleForm.database">
            <template v-for="item in databaseInfo.databaseData">
              <el-radio :label="item.baseLabel">{{ item.name }}</el-radio>
            </template>
          </el-radio-group>
        </el-form-item> -->

        <el-form-item v-if="ruleForm.database >= 6 && ruleForm.database < 13" style="width: 100%;flex-wrap: nowrap;">
          <el-radio-group v-model="ruleForm.database">
            <template v-for="item in databaseInfo.databaseCase">
              <el-radio :label="item.baseLabel" style="margin-right: 16px;">{{ item.name }}</el-radio>
            </template>
          </el-radio-group>
        </el-form-item>

        <!-- 语句组合 -->
        <template v-for="(item, index) in ruleForm.searchStatements">
          <div class="statementBox">
            <!-- <el-form-item
                class="myItem"
                :prop="'searchStatements.' + index + '.associated'"
                :rules="[{ required: true, message: '必填', trigger: 'change' }]"
            >
              <el-select
                  v-model="item.associated"
                  class="mySelect1"
                  placeholder="关联"
              >
                <template v-for="item in statementsInfo.associated">
                  <el-option :label="item" :value="item"/>
                </template>
              </el-select>
            </el-form-item> -->

            <el-form-item
                class="myItem"
                :prop="'searchStatements.' + index + '.searchField'"
                :rules="[{ required: true, message: '必填', trigger: 'change' }]"
            >
              <el-select
                  v-model="item.searchField"
                  class="mySelect2"
                  placeholder="域"
              >
                <template v-for="item in statementsInfo.searchField">
                  <el-option :label="item.name" :value="item.value"/>
                </template>
              </el-select>
            </el-form-item>

            <el-form-item
                class="myItem"
                :prop="'searchStatements.' + index + '.statement'"
                :rules="[{ required: true, message: '必填', trigger: 'blur' }]"
            >
              <el-input
                  v-model="item.statement"
                  class="input-reader-name"
              ></el-input>
            </el-form-item>

            <el-button
                circle
                color="#a0cfff"
                style="width:26px;height:26px;margin-top: -15px"
                @click="addStatement()"
            >
              <el-icon>
                <Plus/>
              </el-icon>
            </el-button>

            <el-button
                circle
                color="#a0cfff"
                v-if="item.key !== 1"
                style="width:26px;height:26px;margin-top: -15px"
                @click="removeStatement(item)"
            >
              <el-icon>
                <Minus/>
              </el-icon>
            </el-button>
          </div>
        </template>

      </el-form>
    </el-col>
    <img tabindex="1" onfocus="1" id="tab-show" @click="clickTab" src="../../../../assets/BasicSearch/show-icon.png">
<!--    <img id="tab-show" src="/src/assets/BasicSearch/show_icon.png">-->
<!--    <div id="tab-show" @click="clickTab">可可可</div>-->
  </el-card>
  <SearchResult :searchInfo="info" @pageChange="pageChange"></SearchResult>
</template>

<style scoped>
#card-show {
  position: relative;
  left: -23%;
  width: 100vw;
  padding-left: 15%;
  /* border-bottom: 1px solid #2878eb; */
  padding-bottom: 140px;
  background-image: linear-gradient(125deg, #02725f, #1d9e5e, #0b5eee, #f55b38);
  background-size: 400%;
  animation: bgmove 15s infinite;
}

@keyframes bgmove {
  0%{
    background-position: 0% 50%;
  }
  50%{
    background-position: 100% 50%;
  }
  100%{
    background-position: 0% 50%;
  }
}

#form-show {
  height: auto;
  transition: 0.4s;
  padding-bottom: 20px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

#form-none {
  box-sizing: border-box;
  height: 29.5vh;
  transition: 0.4s;
  overflow: hidden;
  padding-bottom: 20px;
  margin-bottom: 10px;
  /* border-bottom: 2px solid #4683eb; */
  flex-wrap: nowrap;
}

#tab-show {
  display: none;
  width: 26px;
  height: 26px;
  background: #e8eef5;
  transition: 0.4s;
  position: relative;
  top: -19px;
  border-radius: 100%;
  padding: 6px;
  margin-left: 50%;
}


#button-style::v-deep {
  width: 5rem;
  height: 2rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  right: -77%;
  top: 5.8rem;
  position: relative;
}

::v-deep .input-reader-name {
  width: 60vh;
}

::v-deep .myItem {
  margin-right: 1vh;
}

::v-deep .mySelect1 {
  width: 20vh;
}

::v-deep .mySelect2 {
  width: 20vh;
}

::v-deep .statementBox {
  margin-top: 2vh;
}

::v-deep .el-radio__label {
  color: #eee;
  font-size: 13px;
}

::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: #ffffff !important;
}

::v-deep .el-radio__input.is-checked .el-radio__inner {
  background: #fa9e13 !important;
  border-color: #fa9e13 !important;
}
</style>

<script lang='ts'>
import UpCard from "../main/UpCard.vue";
import {reactive, ref, watch} from "vue";
import type {FormInstance} from "element-plus";
import SearchResult from "./SearchResult.vue";
import {ElMessage} from "element-plus";
import {PaperService} from "@/api/api";

export default {
  components: {
    UpCard,
    SearchResult,
  },
  setup() {
    // FormRules类型
    const ruleFormRef = ref<FormInstance>();
    // 表单信息
    const ruleForm = reactive<{
      database: "";
      searchStatements: StatementItem[];
      time: "";
    }>({
      database: "",
      searchStatements: [
        {key: 1, searchField: "", associated: "AND", statement: ""},
      ],
      time: "",
    });

    const pagination = reactive({
      total: 0,
      limit: 10,
      page: 1,
      loading: true,
    });

    interface StatementItem {
      key: number;
      searchField: string;
      associated: string;
      statement: string;
    }

    // 下面的变量为构造表单使用
    // 与表单提交信息无关
    const databaseInfo = reactive({
      databaseFirst: [
        {name: "总数据库", baseLabel: 1},
        {name: "资料数据库", baseLabel: 2},
        {name: "期刊数据库", baseLabel: 3},
        {name: "书籍数据库", baseLabel: 4},
        {name: "案例数据库", baseLabel: 6},
        {name: "政策数据库", baseLabel: 13},
        {name: "书评数据库", baseLabel: 14},
      ],
      databaseCase: [
        {name: "纳米技术", baseLabel: 7},
        {name: "生物技术", baseLabel: 8},
        {name: "人工智能", baseLabel: 9},
        {name: "信息和通信技术", baseLabel: 10},
        {name: "应用认知科学", baseLabel: 11},
        {name: "其他", baseLabel: 12},
      ],
    });

    const statementsInfo = {
      associated: ["AND", "OR", "NOT"],
      searchField: [
        {name: "主题", value: "theme"},
        {name: "篇名", value: "title"},
        {name: "关键字", value: "keyword"},
        {name: "摘要", value: "abstract"},
        {name: "作者", value: "author"},
        {name: "作者单位", value: "author_unit"},
        {name: "出版社", value: "press"},
        {name: "来源", value: "paper_source"},
      ],
    };

    // 分页触发的更改函数
    const pageChange = function (newPage) {
      pagination.page = Number(newPage);
      getInfo();
    };
    // 分页变动则重新查询
    watch(pagination, () => {
      getInfo();
    });

    const info = reactive({
      res: [],
      total: 0,
    });

    const addStatement = function () {
      ruleForm.searchStatements.push({
        key: Date.now(),
        searchField: "",
        associated: "",
        statement: "",
      });

      //控制收缩按钮显现
      if (ruleForm.searchStatements.length > 1) {
        document.getElementById('tab-show').style.setProperty('display', 'block');
      }
    };

    const removeStatement = function (item: StatementItem) {
      const index = ruleForm.searchStatements.indexOf(item);
      if (index !== -1) {
        ruleForm.searchStatements.splice(index, 1);
      }

      //控制收缩按钮显现
      if (ruleForm.searchStatements.length <= 1) {
        document.getElementById('tab-show').style.setProperty('display', 'none');
      }
    };

    // 表单验证通过执行
    const getInfo = function () {
      const param = {
        statements: ruleForm,
        limit: pagination.limit,
        page: pagination.page - 1,
      };
      PaperService.paperSearchBasic(param).then((res: any) => {
        if (res.data.code == 200) {
          // 利用msg传递查询结果总数
          info.res = res.data.data;
          info.total = Number(res.data.msg);
          console.log(res);
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
          ElMessage.error("表单验证失败");
        }
      });
    };

    return {
      ruleForm,
      databaseInfo,
      statementsInfo,
      submitForm,
      addStatement,
      removeStatement,
      ruleFormRef,
      info,
      pagination,
      pageChange,
    };
  },
  methods: {
    clickTab() {
      if (document.getElementById('form-show')) {
        document.getElementById('form-show').id = 'form-none';
        document.getElementById('tab-show').style.setProperty('transform', 'rotate(180deg)');
      } else {
        document.getElementById('form-none').id = 'form-show';
        document.getElementById('tab-show').style.setProperty('transform', 'rotate(0deg)');
      }
    }
  }
};
</script>