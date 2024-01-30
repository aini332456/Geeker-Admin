<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :columns="columns"
      :data="getInfoList()"
      @sort-change="onSortChange"
      :border="false"
      :tool-button="false"
    >
      <!-- 表格 header 按钮 -->
      <!-- <template #tableHeader="scope">
        <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增用户</el-button>
        <el-button v-auth="'batchAdd'" type="primary" :icon="Upload" plain @click="batchAdd">批量添加用户111</el-button>
        <el-button v-auth="'export'" type="primary" :icon="Download" plain @click="downloadFile">导出用户数据</el-button>
        <el-button type="primary" plain @click="toDetail">To 子集详情页面</el-button>
        <el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected" @click="batchDelete(scope.selectedListIds)">
          批量删除用户
        </el-button>
      </template> -->
      <!-- 资讯标题自动换行 -->
      <template #infoTitle="{ row }">
        <span style="white-space: normal">{{ row.infoTitle }}</span>
      </template>
      <!-- 表格操作 -->
      <!-- <template #operation="scope">
        <el-button plain type="primary" @click="operation('查看', scope.row)" class="transp-btn">编辑</el-button>
        <el-button plain @click="operation('编辑', scope.row)">查看</el-button>
        <el-button plain @click="operation(scope.row)">下架</el-button>
        <el-button plain @click="operation(scope.row)">删除</el-button>
      </template> -->
    </ProTable>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ColumnProps, ProTableInstance } from "@/components/ProTable/interface";
import { getProdTypeEnum, getInfoList } from "./mock";
import { getInfoStateEnum, getInfoTypeEnum } from ".";
import ProTable from "@/components/ProTable/index.vue";
import { SortChangeEvent } from "./type";

const columns = ref<ColumnProps[]>([
  {
    label: "资讯标题",
    prop: "infoTitle",
    minWidth: 130,
    search: {
      el: "switch",
      label: ""
    }
  },
  { label: "品类", prop: "prodType", enum: getProdTypeEnum() },
  { label: "资讯类型", prop: "infoType", enum: getInfoTypeEnum() },
  { label: "来源", prop: "source" },
  { label: "资讯日期", prop: "infoDate", sortable: true },
  { label: "状态", prop: "status", enum: getInfoStateEnum() },
  { label: "更新日期", prop: "updateDate", sortable: true },
  { label: "操作", prop: "operation", width: 300 }
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

// const operation = (pa: any) => pa;
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
