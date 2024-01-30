/**
 * 全部园区
 */
export class MapDomStore {
  private static mapDom: AMap.Map | null = null;

  static GetMapDom() {
    return this.mapDom;
  }

  static SetMapDom(data: AMap.Map) {
    this.mapDom = data;
  }
}

/**
 * 地图叠加层数据
 * 存放地图叠加层群组 AMap.OverlayGroup
 */
export class OverlayLayers {
  private static overlayGroup: any[] = [];

  // 获取图层数据
  static GetOverlayGroup(type: string) {
    // @ts-expect-error i don't know
    return this.overlayGroup[type];
  }

  // 写入图层数据
  static SetOverlayGroup(type: string, overlay: AMap.OverlayGroup) {
    this.RemoveOverlayGroup(type);
    // @ts-expect-error i don't know
    this.overlayGroup[type] = overlay;
  }

  // 查找图层中单个数据 按资源id
  static FindOverlay(type: string, id: number) {
    if (!OverlayLayers.GetOverlayGroup(type)) return false;
    const res = OverlayLayers.GetOverlayGroup(type)
      .getOverlays()
      .filter((item: AMap.Polygon) => item && item.getExtData().id === id);
    if (res && res.length) {
      return res[0];
    }
  }

  // 删除图层数据
  static RemoveOverlayGroup(type: string) {
    if (OverlayLayers.GetOverlayGroup(type)) {
      OverlayLayers.GetOverlayGroup(type)
        .getOverlays()
        .forEach((item: any) => {
          item.setMap(null);
        });
      OverlayLayers.GetOverlayGroup(type).clearOverlays();
    }
  }

  // 删除单个图层
  static RemoveOverlay(type: string, id: number) {
    const group = OverlayLayers.GetOverlayGroup(type);
    if (group) {
      group.getOverlays().forEach((item: any) => {
        if (item.getExtData().id === id) {
          group.removeOverlay(OverlayLayers.FindOverlay(type, id));
          item.setMap(null);
        }
      });
    }
  }

  // 追加单个图层数据
  static AppendOverlay(type: string, overlay: any, extData?: Object) {
    extData && overlay && overlay.setExtData(extData);
    // @ts-expect-error i don't know
    this.overlayGroup && this.overlayGroup[type] && this.overlayGroup[type].addOverlay(overlay);
  }
}

/**
 * 全部园区
 */
export class Parks {
  private static parks: any[] = [];

  static GetParks() {
    return this.parks;
  }

  static SetParks(data: any[]) {
    this.parks = data;
  }
}

/**
 * 图层显示状态
 * 配置 是否 默认显示
 */
export class MapLayersShow {
  private static layers = {
    dockMarker: false
  };

  static get(key: string) {
    // @ts-expect-error i don't know
    return this.layers[key];
  }

  static set(key: string, data: boolean) {
    // @ts-expect-error i don't know
    this.layers[key] = data;
  }
}
