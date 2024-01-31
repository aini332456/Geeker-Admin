export const timeFormatter = (time: Date | string | number, options?: { getTime: boolean }) => {
  let timeString: string;
  const _time = new Date(time);
  timeString = _time.toLocaleDateString().replaceAll("/", "-");
  if (options?.getTime) {
    timeString += " " + _time.toLocaleTimeString();
  }
  return timeString;
};

export const decimalFormatter = (number: number, maxDecimalPlaces: number) => {
  // 将数字转换为字符串
  let numberString = number.toString();

  // 查找小数点的位置
  let decimalIndex = numberString.indexOf(".");

  // 如果找到小数点
  if (decimalIndex !== -1) {
    // 获取小数部分
    let decimalPart = numberString.substring(decimalIndex + 1);

    // 截取小数部分，确保不超过最大位数
    let truncatedDecimalPart = decimalPart.substring(0, maxDecimalPlaces);

    // 拼接整数部分和截取后的小数部分
    return numberString.substring(0, decimalIndex + 1) + truncatedDecimalPart;
  }

  // 如果没有小数点，直接返回原数字
  return Number.parseFloat(numberString);
};
