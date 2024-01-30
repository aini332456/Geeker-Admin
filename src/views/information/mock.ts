/**获取品类枚举 */
export const getProdTypeEnum = () => {
  return [
    {
      label: "洞庭湖砂",
      value: 1
    }
  ];
};

/**获取资讯表格数据 */
export const getInfoList = () => {
  const list = [];
  for (let i = 0; i < 100; i++) {
    list.push({
      infoTitle: "11111111111111111111111111111111111111111111111111111111111111云南储量超1.3亿吨砂石矿即将挂牌",
      prodType: 1,
      infoType: "ImageText",
      source: "志豪集团",
      status: "On",
      infoDate: "2024-01-22",
      updateDate: "2024-01-22"
    });
  }
  return list;
};
