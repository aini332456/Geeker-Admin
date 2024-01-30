import { aMapKey, aMapPlugin } from "../base/mapConfig";

export default function MapLoader() {
  return new Promise((resolve, reject) => {
    if ((window as any).AMap) {
      resolve((window as any).AMap);
    } else {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://webapi.amap.com/maps?v=1.4.15&key=" + aMapKey + "&plugin=" + aMapPlugin + "&callback=initAMap";
      script.onerror = reject;
      document.head.appendChild(script);
    }
    (window as any).initAMap = () => {
      resolve((window as any).AMap);
    };
  });
}
