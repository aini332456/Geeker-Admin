/**获取品类枚举 */
export const getProdTypeEnum = () => {
  return [
    {
      label: "洞庭湖砂",
      value: 1
    }
  ];
};

/**获取规格枚举 */
export const getSpecEnum = () => {
  return [{ label: "普砂", value: 1 }];
};

/**获取品类表格数据 */
export const getProdTypeList = () => {
  const list = [];
  for (let i = 0; i < 100; i++) {
    list.push({
      prodType: 1,
      specification: 1,
      gradationModulus: "2.0-2.5",
      clayContent: "12",
      crushingVal: "12",
      stonePowderMBVal: "15",
      finePowderContent: "15",
      status: "On",
      createDate: "2024-01-22 16:40:20"
    });
  }

  return list;
};
