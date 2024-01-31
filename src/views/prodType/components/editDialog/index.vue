<template>
  <div class="edit-dialog">
    <el-dialog
      v-model="editDialogConf.visible"
      :title="editDialogConf.title"
      width="44%"
      close-icon="CircleCloseFilled"
      :close-on-click-modal="false"
    >
      <div class="form-container">
        <el-form label-position="top">
          <Grid ref="gridRef" :gap="[20, 0]" :cols="3">
            <GridItem :span="3">
              <el-form-item label="品类名称" required>
                <el-input maxlength="10" placeholder="请输入品类名称" v-model="formData.prodType"></el-input>
              </el-form-item>
            </GridItem>
            <el-form-item label="规格" required>
              <el-select placeholder="请选择规格" v-model="formData.specification">
                <el-option v-for="item in getSpecEnum()" :key="item.label" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="最小细度模数" required>
              <el-input
                placeholder="请输入最小细度模数"
                v-model="formData.miniGradationModulus"
                :formatter="modulusFormatter"
              ></el-input>
            </el-form-item>
            <el-form-item label="最大细度模数">
              <el-input
                placeholder="请输入最大细度模数"
                v-model="formData.maxiGradationModulus"
                :formatter="modulusFormatter"
              ></el-input>
            </el-form-item>
            <GridItem :span="3">
              <div class="form-container--sep">参数值</div>
            </GridItem>
            <el-form-item label="含泥量">
              <el-input placeholder="请输入含泥量" v-model="formData.clayContent" :formatter="paramsFormatter"></el-input>
            </el-form-item>
            <el-form-item label="压碎值">
              <el-input placeholder="请输入压碎值" v-model="formData.crushingVal" :formatter="paramsFormatter"></el-input>
            </el-form-item>
            <el-form-item label="石粉MB值">
              <el-input placeholder="请输入石粉MB值" v-model="formData.stonePowderMBVal" :formatter="paramsFormatter"></el-input>
            </el-form-item>
            <el-form-item label="含水率">
              <el-input placeholder="请输入含水率" v-model="formData.moistureContent" :formatter="paramsFormatter"></el-input>
            </el-form-item>
            <el-form-item label="细粉含量">
              <el-input placeholder="请输入细粉含量" v-model="formData.finePowderContent" :formatter="paramsFormatter"></el-input>
            </el-form-item>
          </Grid>
          <GridItem :span="3">
            <el-form-item label="品类介绍" required>
              <el-input
                type="textarea"
                maxlength="200"
                show-word-limit
                rows="6"
                resize="none"
                placeholder="请输入品类介绍"
                v-model="formData.prodTypeDesc"
              ></el-input>
            </el-form-item>
          </GridItem>
        </el-form>
        <div class="form-container--tag">参数值单位: %</div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="large">取消</el-button>
          <el-button size="large" type="primary"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Grid from "@/components/Grid/index.vue";
import GridItem from "@/components/Grid/components/GridItem.vue";
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption } from "element-plus";
import { getSpecEnum } from "../../mock";
import { decimalFormatter } from "@/utils/formatter";

const editDialogConf = ref({
  visible: true,
  title: "新增品类"
});

const formData = ref({
  prodType: "",
  specification: "",
  miniGradationModulus: "",
  maxiGradationModulus: "",
  clayContent: "",
  crushingVal: "",
  stonePowderMBVal: "",
  moistureContent: "",
  finePowderContent: "",
  prodTypeDesc: ""
});

const modulusFormatter = (val: string) => {
  if (val === "" || val.slice(-1) === ".") {
    return val;
  }
  const _val = Number(val);
  if (!isNaN(_val)) {
    return decimalFormatter(_val, 3);
  }
  return val;
};

const paramsFormatter = (val: string) => {
  if (val === "" || val.slice(-1) === ".") {
    return val;
  }
  const _val = Number(val);
  if (!isNaN(_val)) {
    return decimalFormatter(_val, 2);
  }
  return val;
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
