<template>
  <div class="info-box" v-if="props.info">
    <div class="info-box-header d-flex justify-content-between">
      <div class="header-left">
        <div class="title" style="font-size: 20px; font-weight: bold">{{ props.info.name }}</div>
        <button @click="position">定位</button>
      </div>
      <div class="close" @click="emit('close')">关闭</div>
    </div>
    <div class="info-box-body d-grid grid-c-2">
      <div class="">MMSI：413858761</div>
      <div class="">类型：货船</div>
      <div class="">船长：50米</div>
      <div class="">船宽：11米</div>
      <div class="">吃水：12米</div>
      <div class="">航向：{{ props.info.rotation }}°</div>
      <div class="">航速：6.3节</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="shipDialog">
import { setPostion } from "@/components/AMap/base/util";
import { inject, ref, Ref } from "vue";
import { OverlayLayers } from "@/components/AMap/base/mapStore";

const props = defineProps<{
  info: any;
}>();

const mapDom: Ref<AMap.Map | undefined> = ref(inject("mapDom"));

const position = () => {
  if (!mapDom.value) return;
  setPostion(mapDom.value, props.info.lnglat, OverlayLayers.GetOverlayGroup(`ship${props.info.type}Marker`), 18);
};

const emit = defineEmits(["close"]);
</script>

<style scoped lang="scss">
.info-box {
  position: absolute;
  bottom: 0;
  z-index: 202;
  box-sizing: border-box;
  width: 100%;
  height: 180px;
  padding: 22px;
  background: white;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
}
</style>
