<template>
	<div>
		<div class="container">
			<div class="screen">
				<div class="screen__content">
					<el-form class="login" :model="ruleForm" ref="ruleFormRef" :rules="rules">
						<div class="login__field">
							<i class="login__icon fas fa-user"></i>
							<el-form-item prop="userAccount">
								<el-input type="text" class="login__input" placeholder="请输入账号"
									v-model="ruleForm.userAccount" />
							</el-form-item>
						</div>
						<div class="login__field">
							<i class="login__icon fas fa-lock"></i>
							<el-form-item prop="password">
								<el-input type="password" class="login__input" placeholder="密码"
									v-model="ruleForm.password" />
							</el-form-item>
						</div>
						<div class="button login__submit" @click="submitForm(ruleFormRef)">
							<span class="button__text">登录</span>
							<i class="button__icon fas fa-chevron-right"></i>
						</div>
					</el-form>
					<div class="social-login">
						<el-button type="primary" text plain round bg @click="goRegister">没有账号？现在注册</el-button>
						<br>
						<h4>PaperIndexSystem</h4>
					</div>
				</div>
				<div class="screen__background">
					<span class="screen__background__shape screen__background__shape4"></span>
					<span class="screen__background__shape screen__background__shape3"></span>
					<span class="screen__background__shape screen__background__shape2"></span>
					<span class="screen__background__shape screen__background__shape1"></span>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Raleway:400,700');

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	font-family: Raleway, sans-serif;
}

.el-form-item :deep(.el-input__inner) {
	border: none !important;
	box-shadow: none !important;
	background: transparent !important;
}

.el-form-item :deep(.el-input__wrapper) {
	border: none !important;
	box-shadow: none !important;
	background: transparent !important;
}


.container {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
}

.screen {
	background: linear-gradient(90deg, #337ecc, #ecf5ff);
	position: relative;
	height: 600px;
	width: 360px;
	box-shadow: 0px 0px 24px #a0cfff;
}

.screen__content {
	z-index: 1;
	position: relative;
	height: 100%;
}

.screen__background {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 0;
	-webkit-clip-path: inset(0 0 0 0);
	clip-path: inset(0 0 0 0);
}

.screen__background__shape {
	transform: rotate(45deg);
	position: absolute;
}

.screen__background__shape1 {
	height: 520px;
	width: 520px;
	background: #FFF;
	top: -50px;
	right: 120px;
	border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
	height: 220px;
	width: 220px;
	background: #c6e2ff;
	top: -172px;
	right: 0;
	border-radius: 32px;
}

.screen__background__shape3 {
	height: 540px;
	width: 190px;
	background: linear-gradient(270deg, #337ecc, #79bbff);
	top: -24px;
	right: 0;
	border-radius: 32px;
}

.screen__background__shape4 {
	height: 400px;
	width: 200px;
	background: #409EFF;
	top: 420px;
	right: 50px;
	border-radius: 60px;
}

.login {
	width: 320px;
	padding: 30px;
	padding-top: 156px;
}

.login__field {
	padding: 20px 0px;
	position: relative;
}

.login__icon {
	position: absolute;
	top: 30px;
	color: #79bbff;
}

.login__input {
	border: none;
	border-bottom: 2px solid #D1D1D4;
	background: none;
	padding: 10px;
	padding-left: 24px;
	font-weight: 700;
	width: 75%;
	transition: .2s;
}

.login__input:active,
.login__input:focus,
.login__input:hover {
	outline: none;
	border-bottom-color: #79bbff;
}

.login__submit {
	background: #fff;
	font-size: 14px;
	margin-top: 30px;
	padding: 16px 20px;
	border-radius: 26px;
	border: 1px solid #D4D3E8;
	text-transform: uppercase;
	font-weight: 700;
	display: flex;
	align-items: center;
	width: 100%;
	color: #337ecc;
	box-shadow: 0px 2px 2px #337ecc;
	cursor: pointer;
	transition: .2s;
}

.login__submit:active,
.login__submit:focus,
.login__submit:hover {
	border-color: #337ecc;
	outline: none;
}

.button__icon {
	font-size: 24px;
	margin-left: auto;
	color: #337ecc;
}

.social-login {
	position: absolute;
	height: 140px;
	width: 160px;
	text-align: center;
	bottom: 0px;
	right: 0px;
	color: #fff;
}


.social-icons {
	display: flex;
	align-items: center;
	justify-content: center;
}

.social-login__icon {
	padding: 20px 10px;
	color: #fff;
	text-decoration: none;
	text-shadow: 0px 0px 8px #337ecc;
}

.social-login__icon:hover {
	transform: scale(1.5);
}
</style>

<script lang='ts'>
// 路由跳转
import { useRouter } from 'vue-router';
import { ref, reactive, onMounted } from 'vue';
import type { FormInstance, FormRules } from "element-plus";
import { UserService } from '../../api/api'
import { ElMessage } from 'element-plus'



export default {
	setup() {

		// FormRules类型
		const ruleFormRef = ref<FormInstance>()

		const ruleForm = reactive({
			userAccount: "",
			password: ""
		});

		const router = useRouter();
		const goRegister = function () {
			router.push({
				path: '/register'
			})
		}

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
				"account": ruleForm.userAccount,
				"password": ruleForm.password
			}

			UserService.login(loginParams).then((res: any) => {
				const code = Number(res.data.code)
				if (code == 30101) {
					ElMessage({
						message: '密码错误，请重新输入',
						type: 'error',
					})
				} else if (code == 30102) {
					ElMessage({
						message: '账号不存在，请检查账号输入是否正确',
						type: 'error',
					})
				} else if (code == 200) {
					localStorage.clear();
					localStorage.setItem("token", res.data.data.token);
					ElMessage({
						message: '登录成功',
						type: 'success',
					})	
					router.push({
						path: '/search/easy_search'
					})

				}


			}).catch((err) => {
				console.log(err)
			})
		};

		const submitForm = (formEl: FormInstance | undefined) => {
			if (!formEl) return;
			formEl.validate((valid, fields) => {
				if (valid) {
					//验证成功，执行下面方法
					callApi();
				} else {
					alert('error submit!' + fields)
				}
			});
		};

		return {
			goRegister,
			submitForm,
			ruleForm,
			ruleFormRef,
			rules
		}
	},
}
</script>