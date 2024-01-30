/**
 * 获取多边形中心点
 */
export const getTheAreaCenter = (lnglatarr: any[]) => {
  let lng = 0.0;
  let lat = 0.0;
  for (let i = 0; i < lnglatarr.length; i++) {
    if (lnglatarr[i] === null) {
      continue;
    }
    lng = lng + parseFloat(lnglatarr[i]["lng"] || lnglatarr[i][0]);
    lat = lat + parseFloat(lnglatarr[i]["lat"] || lnglatarr[i][1]);
  }
  lng = lng / lnglatarr.length;
  lat = lat / lnglatarr.length;
  return [lng, lat];
};
/**
 * 设置地图当前位置
 * 无zoom值时 自适应缩放
 */
export const setPostion = (mapDom: AMap.Map, postion: any, overlay?: any, zoom?: number) => {
  if (!mapDom) return false;
  mapDom.setCenter(postion);
  if (zoom) mapDom.setZoom(zoom);
  else overlay ? mapDom.setFitView(overlay) : mapDom.setFitView();
};

/**
 * 经纬度 路径
 * @param lnglat
 */
export const getPath = (lnglat: any, origin: any) => {
  let data = null;
  if (typeof lnglat === "string") {
    data = JSON.parse(lnglat);
  } else {
    data = lnglat;
  }
  if (data && data[0] && data[0].length === 2) {
    return getLnglat(data);
  } else {
    console.warn("lnglat数据格式错误", origin);
    return false;
  }
};

/**
 * 经纬度 数据检查过滤
 * @param lnglat
 */
export const getLnglat = (lnglat: any) => {
  if (lnglat) return lnglat.filter((item: any) => item && item);
};

/**
 * 经纬度 获取点
 * @param lnglat
 */
export const getPosition = (lnglat: any, origin?: any) => {
  let data = null;
  if (typeof lnglat === "string") {
    try {
      data = JSON.parse(lnglat);
    } catch (e) {
      console.log(e);
    }
  } else {
    data = lnglat;
  }
  if (data && data.length === 2) {
    return getLnglat(data);
  } else {
    console.warn("lnglat数据格式错误", origin);
    return false;
  }
};

// 绘制自定义的Marker内容
export const getMarkerContent = (name: any, icon: AMap.Icon | string | undefined, rotation?: number, type?: string) => {
  return `
            <div class="marker-content ${type}">
                <img class="marker-icon" src="${icon}" alt="" style="${rotation ? `transform: rotate(${rotation}deg)` : ""}">
                <span class="marker-name">${name}</span>
            </div>
        `;
};
