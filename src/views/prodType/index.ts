import { ProdTypeStateEnum } from "./type";

export const getProdTypeStateEnum = () => {
  return [
    {
      label: "启用",
      value: ProdTypeStateEnum.Enable
    },
    {
      label: "禁用",
      value: ProdTypeStateEnum.Disable
    }
  ];
};
