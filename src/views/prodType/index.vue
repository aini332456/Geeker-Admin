<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :columns="columns"
      :data="getProdTypeList()"
      @sort-change="onSortChange"
      :border="false"
      :tool-button="false"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary">新增品类</el-button>
      </template>
      <!-- 资讯标题自动换行 -->
      <template #infoTitle="{ row }">
        <span style="white-space: normal">{{ row.infoTitle }}</span>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button plain type="primary" @click="operation('查看')" class="transp-btn">编辑</el-button>
        <el-button plain @click="operation(scope.row)">{{
          scope.row.status == ProdTypeStateEnum.Enable ? "启用" : "禁用"
        }}</el-button>
        <el-button plain @click="operation(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <EditDialog></EditDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ColumnProps, ProTableInstance } from "@/components/ProTable/interface";
import { getProdTypeEnum, getProdTypeList, getSpecEnum } from "./mock";
import { getProdTypeStateEnum } from ".";
import ProTable from "@/components/ProTable/index.vue";
import { SortChangeEvent, ProdTypeStateEnum } from "./type";
import EditDialog from "./components/editDialog/index.vue";
const columns = ref<ColumnProps[]>([
  {
    label: "品类",
    prop: "prodType",
    enum: getProdTypeEnum(),
    search: {
      el: "select",
      label: "",
      props: { placeholder: "请选择砂石品类" }
    }
  },
  {
    label: "规格",
    prop: "specification",
    enum: getSpecEnum()
  },
  { label: "粒径/细度模数", prop: "gradationModulus" },
  { label: "含泥量", prop: "clayContent" },
  { label: "压碎值", prop: "crushingVal" },
  { label: "石粉MB值", prop: "stonePowderMBVal" },
  { label: "含水率", prop: "moistureContent" },
  { label: "细粉含量", prop: "finePowderContent" },
  { label: "状态", prop: "status", enum: getProdTypeStateEnum() },
  {
    label: "创建日期",
    prop: "createDate",
    sortable: true,
    width: 240
  },
  { label: "操作", prop: "operation", width: 240 }
]);

// ProTable 实例
const proTable = ref<ProTableInstance>();

/**处理排序事件 */
const onSortChange = (data: SortChangeEvent) => {
  // const { prop, order } = data;
  // /**根据排序prop不同修改参数 */
  // if (prop === "infoDate") {
  // } else if (prop === "updateDate") {
  // }
  // proTable.value!.pageable.pageNum = 1;
  return data;
};

const operation = (pa: any) => pa;
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
