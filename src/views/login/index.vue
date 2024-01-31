<template>
  <div class="login-container">
    <div class="login-container-left">
      <img src="https://zhihaoscm-dev.oss-cn-hangzhou.aliyuncs.com/login/login-bg.png" alt="" />
    </div>
    <div class="login-container-right">
      <div class="company-info">
        <img class="company-logo" src="https://zhihaoscm-dev.oss-cn-hangzhou.aliyuncs.com/login/vector.png" alt="" />
        <div class="flex ml-5">
          <div class="company-name">志豪链云</div>
          <div class="company-mission">科技赋能砂石产业</div>
        </div>
      </div>
      <div class="login">
        <div class="login-options">
          <div :class="{ active: active === 0 }" @click="loginMethodChange(0)">
            <div>账号登陆</div>
            <div class="mark"></div>
          </div>
          <div class="ml-30" :class="{ active: active === 1 }" @click="loginMethodChange(1)">
            <div>验证码登陆</div>
            <div class="mark"></div>
          </div>
        </div>
        <div class="login-form">
          <AccountLogin v-if="active === 0" @login="login" />
          <CodeLogin v-else @login="login" />
        </div>
      </div>
      <div class="footer">
        <div class="copyright">Copyright © 2023-{{ year }} 湖北志豪链云科技有限公司 版权所有</div>
        <div class="filings">
          <span>赣ICP备2023012239号-1</span>
          <img class="ml-20" src="@/assets/images/police-insignia.png" alt="" />
          <span class="ml-5">赣公网安备360108XXXXXXXX号</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="login">
import { ref, Ref } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";
import { useUserStore } from "@/stores/modules/user";
import { HOME_URL } from "@/config";
import CodeLogin from "./components/codeLogin.vue";
import AccountLogin from "./components/accountLogin.vue";

const userStore = useUserStore();
const router = useRouter();

const year: number = moment().year();
const active: Ref<number> = ref(0);
const loginMethodChange = (index: number) => {
  active.value = index;
};
interface LoginPrams {
  username: string;
  password?: string;
  code?: string;
}
const login = (params: LoginPrams) => {
  console.log("params", params);
  // 执行登陆接口
  // 获取用户权限
  // 清空 tabs、keepAlive 数据
  // 跳转到首页
  userStore.setToken("2121221221");
  router.push(HOME_URL);
};
</script>

<style scoped lang="scss">
.login-container {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 550px;
  overflow: hidden;
  background-color: #ffffff;
  &-left {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-right {
    position: relative;
    display: flex;
    width: 800px;
    height: 100%;
    .company-info {
      position: absolute;
      top: 50px;
      right: 50px;
      display: flex;
      align-items: center;
      .company-logo {
        width: 52px;
        height: 37px;
      }
      .company-name {
        font-family: "HarmonyOS Sans";
        font-size: 22px;
        font-style: normal;
        font-weight: 700;
        line-height: 20px;
        color: #000000;
      }
      .company-mission {
        font-family: "HarmonyOS Sans";
        font-size: 11px;
        font-style: normal;
        font-weight: 400;
        color: #8e8e8e;
      }
    }
    .login {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 300px;
      height: 400px;
      margin: auto;
      &-options {
        display: flex;
        width: 100%;
        font-family: "HarmonyOS Sans";
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 10.484px;
        color: #666666;
        cursor: pointer;
        user-select: none;
        .active {
          position: relative;
          font-family: "HarmonyOS Sans";
          font-size: 18px;
          font-style: normal;
          font-weight: 700;
          line-height: 10.484px;
          color: #000000;
          .mark {
            position: absolute;
            left: -5px;
            flex-shrink: 0;
            width: 67px;
            height: 10px;
            background: linear-gradient(90deg, rgb(23 119 255 / 50%) 0%, rgb(0 170 231 / 0%) 100%);
          }
        }
      }
      &-form {
        width: 100%;
        margin-top: 66px;
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 40px;
    width: 100%;
    font-family: "HarmonyOS Sans";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: rgb(98 109 131 / 60%);
    text-align: center;
    .copyright {
      margin-bottom: 10px;
    }
    .filings {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
