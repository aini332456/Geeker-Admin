/**
 * v-auth
 * 按钮权限指令
 */
import { useAuthStore } from "@/stores/modules/auth";
import type { Directive, DirectiveBinding } from "vue";

const auth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    const authStore = useAuthStore();
    const currentPageRoles = authStore.authButtonListGet[authStore.routeName] ?? [];
    if (value instanceof Array && value.length) {
      /**此处判断为权限全包含, 根据业务逻辑可以修改为部分包含 */
      const hasPermission = value.every(item => currentPageRoles.includes(item));
      if (!hasPermission) el.remove();
    } else {
      if (!currentPageRoles.includes(value)) el.remove();
    }
  }
};

export default auth;
