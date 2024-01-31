import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";

export interface SortChangeEvent {
  column: TableColumnCtx<any>;
  prop: string;
  order: "ascending" | "descending" | null;
}

export enum ProdTypeStateEnum {
  Enable = "On",
  Disable = "Off"
}
