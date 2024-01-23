<template>
  <el-config-provider :locale="locale" :size="assemblySize" :button="buttonConfig">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { getBrowserLang } from "@/utils";
import { useTheme } from "@/utils/hooks/useTheme";
import { ElConfigProvider } from "element-plus";
import { useGlobalStore } from "@/stores/modules/global";
import en from "element-plus/es/locale/lang/en";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const globalStore = useGlobalStore();

// init theme
const { initTheme } = useTheme();
initTheme();

// element language
const locale = computed(() => {
  return getBrowserLang() == "zh" ? zhCn : en;
});

// element assemblySize
const assemblySize = computed(() => globalStore.assemblySize);

// element button config
const buttonConfig = reactive({ autoInsertSpace: false });
</script>
