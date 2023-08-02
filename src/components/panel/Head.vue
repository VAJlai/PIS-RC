<template>
  <el-col>
    <el-menu
      :default-active="activeIndex"
      style="min-width: 1100px"
      mode="horizontal"
      :ellipsis="false"
      router
    >
      <div class="top_tabbar">
        <el-menu-item index="/">
          <img
            class="leftLOGO"
            src="@/assets/logos/Logo_login.png"
            style="top: -10px; position: relative"
          />
        </el-menu-item>
        <el-menu
          class="top_tabbar_right"
          background-color="#fff"
          active-text-color="#2878eb"
          text-color="#000"
          :default-active="activeIndex"
          mode="horizontal"
          router
          :ellipsis="false"
        >
          <el-menu-item index="/search">搜索</el-menu-item>
          <el-menu-item index="/discussion">讨论区</el-menu-item>
          <el-menu-item index="/help">帮助</el-menu-item>
        </el-menu>
      </div>

      <el-sub-menu
        open=""
        close=""
        index=""
        v-if="info.types != 'none'"
        class="sub-style"
      >
        <template #title>
          <span style="font-size: 16px">{{ info.name }}</span>
        </template>
        <el-menu-item index="/personalInfo">个人信息</el-menu-item>
        <el-menu-item index="">积分:{{ info.points }}</el-menu-item>
        <el-menu-item index="">{{ info.types }}</el-menu-item>
        <el-menu-item index="/background">后台管理</el-menu-item>
        <el-menu-item index=""><i @click="logout()">退出登录</i></el-menu-item>
      </el-sub-menu>
      <el-popover
        placement="bottom-end"
        :offset="40"
        :width="300"
        trigger="click"
        v-if="info.types == 'none'"
      >
        <template #reference>
          <el-avatar
            style="margin-left: 0.6rem"
            :size="38"
            :src="info.avatarUrl"
            class="rightAvatar"
          />
        </template>
        <template #default>
          <p>会员登录&emsp;&emsp;&emsp;&emsp;<a>重置密码</a></p>

          <br />
          <el-form
            class="login"
            :model="ruleForm"
            ref="ruleFormRef"
            :rules="rules"
          >
            <el-space direction="vertical">
              <el-form-item prop="userAccount">
                <el-input
                  prefix-icon="Avatar"
                  size="medium"
                  type="text"
                  placeholder="请输入账号"
                  v-model="ruleForm.userAccount"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  prefix-icon="Lock"
                  size="medium"
                  type="password"
                  class="login__input"
                  placeholder="密码"
                  v-model="ruleForm.password"
                />
              </el-form-item>
            </el-space>
            <el-divider>
              <el-button
                type="primary"
                link
                size="small"
                @click="submitForm(ruleFormRef)"
                >登录</el-button
              >
              /
              <el-button
                size="small"
                link
                type="primary"
                @click="goRegister"
                style="margin-left: -2px"
                >注册</el-button
              >
            </el-divider>
          </el-form>
        </template>
      </el-popover>
      <el-avatar
        :size="38"
        :src="info.avatarUrl"
        class="rightAvatar"
        v-if="info.types != 'none'"
      />
    </el-menu>
  </el-col>
</template>

<script lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { UserService, AvatarService } from "@/api/api";
import type { FormInstance, FormRules } from "element-plus";
import { Avatar, Lock } from "@element-plus/icons-vue";

export default {
  components: {
    Avatar,
    Lock,
  },
  setup() {
    const router = useRouter();
    // 刷新页面后 根据路由调整选定导航栏
    const activeIndex = ref("/" + router.currentRoute.value.path.split("/")[1]);

    // FormRules类型
    const ruleFormRef = ref<FormInstance>();

    const ruleForm = reactive({
      userAccount: "root@root.com",
      password: "123456",
    });

    // 校验规则
    const rules = reactive<FormRules>({
      userAccount: [
        { required: true, message: "请输入邮箱", trigger: "blur" },
        {
          type: "email",
          message: "请输入正确的邮箱地址",
          trigger: ["blur", "change"],
        },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 12, message: "长度应为 6 到 12", trigger: "blur" },
      ],
    });

    // 表单验证通过执行
    const callApi = () => {
      const loginParams = {
        account: ruleForm.userAccount,
        password: ruleForm.password,
      };

      UserService.login(loginParams)
        .then((res: any) => {
          const code = Number(res.data.code);
          console.log(res.data.msg);
          if (code == 30101) {
            ElMessage({
              message: "密码错误，请重新输入",
              type: "error",
            });
          } else if (code == 30102) {
            ElMessage({
              message: "账号不存在，请检查账号输入是否正确",
              type: "error",
            });
          } else if (code == 200) {
            localStorage.clear();
            localStorage.setItem("token", res.data.data.token);
            getHeadInfo();
            ElMessage({
              message: "登录成功",
              type: "success",
            });
            router.go(0);
          } else if (res.data.msg == "等待管理员审核") {
            ElMessage({
              message: "等待管理员审核",
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid, fields) => {
        if (valid) {
          //验证成功，执行下面方法
          callApi();
        } else {
          alert("error submit!" + fields);
        }
      });
    };

    const info = reactive({
      name: "",
      points: "",
      avatar: "",
      types: "",
      avatarUrl: "",
    });

    const getHeadInfo = function () {
      UserService.getUserInfo()
        .then((res: any) => {
          info.name = res.data.data.name;
          info.points = res.data.data.points;
          info.avatar = res.data.data.avatar;
          info.types = res.data.data.types;
          /**
           * 一代头像 之后可能会改
           */

          info.avatarUrl = AvatarService.getAvatarURL(
            Number(res.data.data.avatar)
          );
        })
        .catch(() => {
          info.types = "none";
          info.avatarUrl = AvatarService.getAvatarURL(0);
          console.log(info.avatar);
        });
    };

    onMounted(() => {
      getHeadInfo();
    });

    const goRegister = function () {
      router.push({ path: "/register" });
    };

    const logout = function () {
      localStorage.clear();
      router.go(0); //跳回登录地址
    };
    const loginVisable = ref(false);
    return {
      activeIndex,
      info,
      logout,
      loginVisable,
      submitForm,
      ruleForm,
      ruleFormRef,
      rules,
      goRegister,
    };
  },
};
</script>

<style scoped>
ul {
  background-color: #ffffff;
  padding: 0 14%;
  width: 100%;
  height: 11vh;
}
.top_tabbar {
  width: 100%;
  height: 11vh;
  display: flex;
  /* justify-content: space-between; */
  border: none;
  align-items: center;
}
.el-menu--horizontal {
  display: flex;
  flex-wrap: nowrap;
  border-right: none;
  align-items: center;
}

.top_tabbar li {
  height: 11vh;
  /* width: 136px; */
}

.leftLOGO {
  height: 80%;
  width: 8rem;
}

.top_tabbar_right {
  margin-left: 0rem;
  width: 10%;
  display: flex;
  justify-content: center;
  height: 16vh;
  margin-top: -12px;
  /* border-bottom: 1px solid #0676bd; */
}

.top_tabbar_right .el-menu-item {
  font-size: 1rem;
  line-height: 100%;
  height: 100%;
  border-bottom: 1px solid #ffffff;
}

.el-menu--horizontal .el-menu-item[data-v-3706ebbb]:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item[data-v-3706ebbb]:not(.is-disabled):hover {
  /* color: #2878eb !important; */
}
.el-menu--horizontal .el-menu-item[data-v-3706ebbb]:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item[data-v-3706ebbb]:not(.is-disabled):focus {
  background-color: #ffffff !important;
}

.rightAvatar {
  margin: 0;
  align-items: center;
  z-index: 999;
  margin-top: -10px;
}

.el-menu-item {
  margin: 0;
  padding: 0;
}

.sub-style {
  margin-left: 10px;
  margin-right: 10px;
  height: 97%;
  margin-top: -10px;
}

.el-menu-item,
::v-deep .el-sub-menu .el-sub-menu__title {
  color: rgb(0, 0, 0);
  /* background-color: #2878eb; */
}
.el-menu-item,
::v-deep .el-sub-menu .el-sub-menu__title:hover {
  color: rgb(92, 92, 92);
  background-color: #f7f7f7;
}
</style>
