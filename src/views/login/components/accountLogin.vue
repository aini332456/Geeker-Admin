<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
    <el-form-item prop="username">
      <el-input size="large" v-model="loginForm.username" placeholder="手机号或邮箱" />
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="large" placeholder="密码" v-model="loginForm.password" show-password type="password" />
    </el-form-item>
    <el-form-item prop="signProtocol">
      <el-checkbox label="我已阅读并同意" name="type" v-model="loginForm.signProtocol" />
      <a href="#" class="protocol">《隐私协议》</a>、
      <a href="#" class="protocol">《用户协议》</a>
    </el-form-item>
    <el-form-item class="mt-50" size="large">
      <el-button class="login-btn" type="primary" @click="clickLoginBtn(loginFormRef)"> 登录 </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ElForm, ElInput, ElButton } from "element-plus";
import type { ElForm as El } from "element-plus";
import { reactive, ref, defineEmits } from "vue";

const emit = defineEmits(["login"]);

const loginForm = ref({
  username: "17600546866",
  password: "123456",
  signProtocol: false
});

const signProtocolRuleCallback = (rule: any, value: boolean, callback: any) => {
  if (value) {
    callback();
  } else {
    callback(new Error("请阅读并签署协议"));
  }
};
const usernameRuleCallback = (rule: any, value: string, callback: any) => {
  // 校验是否是手机号或者邮箱
  const reg = /^1[3456789]\d{9}$/;
  const reg2 = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  if (reg.test(value) || reg2.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的手机号或邮箱"));
  }
};
const loginRules = reactive({
  username: [
    { required: true, message: "请输入手机号或邮箱", trigger: "blur" },
    { validator: usernameRuleCallback, trigger: "blur" }
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  signProtocol: [{ trigger: "change", validator: signProtocolRuleCallback }]
});

type FormInstance = InstanceType<typeof El>;
const loginFormRef = ref<FormInstance>();
const clickLoginBtn = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async valid => {
    console.log("valid", valid);
    if (valid) {
      emit("login", {
        username: loginForm.value.username,
        password: loginForm.value.password
      });
    }
  });
};
</script>

<style scoped lang="scss">
.login-btn {
  width: 100%;
}
::v-deep .el-checkbox .el-checkbox__label {
  font-size: 12px;
  color: #999999;
}
.protocol {
  color: var(--el-color-primary);
  text-decoration: none;
}
.mt-50 {
  margin-top: 50px;
}
</style>
