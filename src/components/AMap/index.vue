<template>
  <div class="page-map">
    <div class="page-container">
      <div id="amap-container" class="amap-container" />
      <div v-if="initialized" class="amap-tools-panel">
        <map-lnglat-box ref="lnglatBox" />
      </div>
      <ship-dialog :info="currentShip" @close="close"></ship-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup name="AMap">
import MapLnglatBox from "./components/laglatBox.vue";
import ShipDialog from "./components/shipDialog.vue";
import { Ref, ref, onMounted, nextTick } from "vue";
import MapLoader from "@/components/AMap/base/loadMap";
import { provide } from "vue";
import {
  defaultLngLat,
  defaultZoom,
  dockMarkerOptions,
  shipMarkerOptions,
  shipNavigationRoutePolyline,
  shipTrackPolylineOptions
} from "../AMap/base/mapConfig";
import { markerRender, polylineRender } from "@/components/AMap/base/renderer";
import dockList from "./assets/json/dockList.json";
import shipList from "./assets/json/shipList.json";

function groupBy<T = any>(array: any, key: string): Array<T> {
  return array.reduce((result: any, currentItem: any) => {
    const groupKey = currentItem[key];

    if (!result[groupKey]) {
      result[groupKey] = [];
    }

    result[groupKey].push(currentItem);

    return result;
  }, {});
}
// 地图对象
const amap: Ref<any | null> = ref(null);
// 地图实例
const mapDom: Ref<AMap.Map | null> = ref(null);
provide("mapDom", mapDom);

// 地图dom加载完成
const initialized: Ref<boolean> = ref(false);

// 当前点开查看详情
const currentShip: Ref<any | null> = ref(null);

const options: AMap.MapOptions = {
  resizeEnable: true, // 是否监控地图容器尺寸变化
  zoom: defaultZoom, // 初始化地图层级
  center: defaultLngLat, // 初始化地图中心点
  expandZoomRange: true,
  zooms: [3, 20]
};
// 地图 dom 初始化
const initAMap = async () => {
  try {
    amap.value = await MapLoader();
    mapDom.value = new amap.value.Map("amap-container", options);
    if (!mapDom.value) return;
    // mapDom.value.centerAndZoom(new amap.value.LngLat(...defaultLngLat), defaultZoom);
    // MapDomStore.SetMapDom(this.mapDom);

    initialized.value = true;
    nextTick(() => mapDataLoad());
  } catch (err) {
    console.error(err);
  }
};

const mapDataLoad = () => {
  if (!mapDom.value) return;
  markerRender(mapDom.value, dockMarkerOptions, dockList.data.list, "dockMarker", true, true, id => getDockMarkerInfo(id));
  const shipGroupList = groupBy(shipList.data.list, "type");

  Object.values(shipGroupList).forEach(item => {
    markerRender(mapDom.value!, shipMarkerOptions[item[0].type - 1], item, `ship${item[0].type}Marker`, true, true, id =>
      getDockMarkerInfo(id)
    );
  });

  polylineRender(
    mapDom.value!,
    shipTrackPolylineOptions,
    shipList.data.list.filter(item => item.track),
    `shipTrackPolyline`,
    "track",
    true,
    true
  );
  polylineRender(
    mapDom.value!,
    shipNavigationRoutePolyline,
    shipList.data.list.filter(item => item.navigationRoute),
    `shipNavigationRoutePolyline`,
    "navigationRoute",
    true,
    true
  );
};

const getDockMarkerInfo = (data: any) => {
  currentShip.value = data;
  console.log(data);
};

const close = () => {
  currentShip.value = null;
};

onMounted(() => {
  initAMap();
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
