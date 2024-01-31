<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
    <el-form-item prop="username">
      <el-input size="large" v-model="loginForm.username" placeholder="手机号" />
    </el-form-item>
    <el-form-item prop="code">
      <div class="phone-code">
        <el-input class="phone-code-input" size="large" placeholder="验证码" v-model="loginForm.code"> </el-input>
        <div class="code-position">
          <span v-if="countDown < 1" @click="sendPhoneCode" class="code-btn">获取验证码</span>
          <span v-else class="count-down">{{ countDown }}秒重新获取</span>
        </div>
      </div>
    </el-form-item>
    <el-form-item prop="signProtocol">
      <el-checkbox label="我已阅读并同意" name="type" v-model="loginForm.signProtocol" />
      <a href="#" class="protocol">《隐私协议》</a>、
      <a href="#" class="protocol">《用户协议》</a>
    </el-form-item>
    <el-form-item class="mt-50" size="large">
      <el-button class="login-btn" size="large" type="primary" @click="clickLoginBtn(loginFormRef)"> 登录 </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ElForm, ElInput, ElButton } from "element-plus";
import type { ElForm as El } from "element-plus";
import { ref, Ref, reactive, defineEmits } from "vue";

const emit = defineEmits(["login"]);

const loginForm = ref({
  username: "17600546866",
  code: "1234",
  signProtocol: false
});

const countDown: Ref<number> = ref(0);
const sendPhoneCode = (): void => {
  countDown.value = 10;
  setCodeCountDown();
};
const setCodeCountDown = (): void => {
  const timer = setInterval(() => {
    countDown.value -= 1;
    if (countDown.value === 0) {
      clearInterval(timer);
    }
  }, 1000);
};

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
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的手机号或邮箱"));
  }
};
const loginRules = reactive({
  username: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { validator: usernameRuleCallback, trigger: "blur" }
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
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
        code: loginForm.value.code
      });
    }
  });
};
</script>

<style scoped lang="scss">
.login-btn {
  width: 100%;
}
::v-deep .phone-code {
  position: relative;
  width: 100%;
  &-input {
    width: 100%;
    .el-input__inner {
      padding-right: 80px;
    }
  }
  .code-position {
    position: absolute;
    top: 9px;
    right: 10px;
    width: 75px;
    color: var(--el-color-primary);
    text-align: center;
    .code-btn {
      cursor: pointer;
    }
    .count-down {
      color: #cccccc;
    }
  }
}
.mt-50 {
  margin-top: 50px;
}
::v-deep .el-checkbox .el-checkbox__label {
  font-size: 12px;
  color: #999999;
}
.protocol {
  color: var(--el-color-primary);
  text-decoration: none;
}
</style>
