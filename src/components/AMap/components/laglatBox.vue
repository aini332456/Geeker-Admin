<template>
  <div class="amap-tools lnglat-box">
    {{ text }}
  </div>
</template>

<script setup lang="ts" name="MapLnglatBox">
import { onMounted, Ref, ref, inject } from "vue";

const mapDom: Ref<AMap.Map | undefined> = ref(inject("mapDom"));

const text: Ref<string> = ref("");

const init = () => {
  if (!mapDom.value) return;
  mapDom.value.on("mousemove", (e: any) => {
    text.value = e.lnglat.getLng() + ", " + e.lnglat.getLat();
  });

  mapDom.value.on("mousedown", (e: any) => {
    text.value = e.lnglat.getLng() + ", " + e.lnglat.getLat();
    console.log(text.value);
  });
};

onMounted(() => {
  init();
});
</script>

<style scoped lang="scss">
// 经纬度
.lnglat-box {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 201;
  min-width: 142px;
  padding: 4px;
  font-size: 11px;
  color: rgb(0 0 0 / 85%);
  background-color: white;
  border-color: rgb(0 0 0 / 15%);
  border-radius: 2px;
}
</style>
