import { getMarkerContent, getPath, setPostion } from "@/components/AMap/base/util";
import { OverlayLayers } from "@/components/AMap/base/mapStore";
import { getPosition } from "@/components/AMap/base/util";

// 标记点
export const markerRender = (
  mapDom: AMap.Map,
  params: AMap.MarkerOptions,
  list: any[],
  type: string = "",
  interactive: boolean,
  show: boolean,
  callback?: (data: any) => void
) => {
  if (!Array.isArray(list)) list = [list];
  const markers: any[] = [];
  list.forEach(item => {
    const offset = new AMap.Pixel(0, 0);
    const marker = new AMap.Marker({
      ...params,
      title: item.name || item.title,
      content: getMarkerContent(item.name || item.title, params.icon, item.rotation),
      position: getPosition(item.lnglat || item.position),
      offset
    });
    marker.setExtData({
      ...item,
      type: type
    });
    markers.push(marker);
  });

  markers.forEach((marker: any) => {
    mapDom.add(marker);
    if (interactive) {
      marker.on("click", (event: any) => {
        // 返回选中的id
        callback && callback(marker.getExtData());
        setPostion(mapDom, [event.lnglat.lng, event.lnglat.lat], marker, 18);
        // _self.showResourceDetail(event.target);
      });
    }
  });

  // 图层群组
  OverlayLayers.SetOverlayGroup(type, new AMap.OverlayGroup(markers));
  show ? OverlayLayers.GetOverlayGroup(type).show() : OverlayLayers.GetOverlayGroup(type).hide();
};

// 线
export const polylineRender = (
  mapDom: AMap.Map,
  params: AMap.PolylineOptions,
  list: any[] | any,
  type: string = "",
  pathName: string = "track",
  interactive: boolean,
  show: boolean,
  callback?: (id: number) => void
) => {
  const lines: any[] = [];
  if (!Array.isArray(list)) list = [list];
  list.forEach((item: any) => {
    if (!item[pathName]) return true;
    const line = new AMap.Polyline({
      path: getPath(item[pathName], item),
      ...params
    });
    line.setExtData({
      type: type,
      ...item
    });
    lines.push(line);
  });

  lines.forEach((line: any) => {
    mapDom.add(line);
    if (interactive) {
      line.on("click", (event: any) => {
        // 返回选中的id
        callback && callback(line.getExtData().id);
        setPostion(mapDom, [event.lnglat.lng, event.lnglat.lat], line);
        // _self.showResourceDetail(event.target);
      });
    }
  });

  // 图层群组
  OverlayLayers.SetOverlayGroup(type, new AMap.OverlayGroup(lines));
  show ? OverlayLayers.GetOverlayGroup(type).show() : OverlayLayers.GetOverlayGroup(type).hide();
};
