import dock from "../assets/icons/dock.svg";
import ship1 from "../assets/icons/ship-1.svg";
import ship2 from "../assets/icons/ship-2.svg";
import ship3 from "../assets/icons/ship-3.svg";
// js api版本号
export const version = "4.0";

// 天地图应用key
export const tMapKey = "a9f1611c2f149ca15a27539ff5c7f101";

// 高德地图应用key
export const aMapKey = "9cd291ce0031ebcf3e3a8bf6619a342a";
// 高德地图底图样式
export const aMapStyle = "amap://styles/1b19018a0973cb42184f0cb58fd74c3b";

// 默认地图层级
export const defaultZoom: number = 14;

// 默认地图中心经纬度
export const defaultLngLat: [number, number] = [115.89864, 28.76006];

// 高德地图加载插件
export const aMapPlugin = "" + "AMap.ToolBar," + "AMap.Scale," + "AMap.MapType," + "AMap.Geolocation,";

export const dockMarkerOptions: any = {
  icon: dock
};
export const shipMarkerOptions: any = [
  {
    icon: ship1
  },
  {
    icon: ship2
  },
  {
    icon: ship3
  }
];

export const shipTrackPolylineOptions: any = {
  cursor: "pointer",
  borderWeight: 2, // 线条宽度，默认为 1
  strokeColor: "#005BB5", // 线条颜色
  strokeStyle: "solid", // 线条样式
  lineJoin: "round", // 折线拐点连接处样式
  zIndex: 27
};

export const shipNavigationRoutePolyline: any = {
  cursor: "pointer",
  borderWeight: 2, // 线条宽度，默认为 1
  strokeColor: "#2e85dc", // 线条颜色
  strokeStyle: "dashed", // 线条样式
  strokeDasharray: [10, 10], // 虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效
  lineJoin: "round", // 折线拐点连接处样式
  zIndex: 27
};
