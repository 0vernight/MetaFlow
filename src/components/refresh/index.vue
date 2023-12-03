<!--
 * @Description:
 * @Author: Edward
 * @Date: 2023-07-12 16:32:33
 * @LastEditors: Edward
 * @LastEditTime: 2023-07-21 09:31:39
-->
<script lang="ts" setup>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { getOtherQuery } from '@/utils/url';

/* export default defineComponent({
beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
    // console.log('refresh', to, from, next)
    next((vm: any) => {
      console.log('vm', vm.$router);
      vm.$router.replace(from);
      // 跳到该路由页面后，再替换为from来源
    });

    // next({...from, replace: true});
  },

}); */
const router = useRouter();
const { currentRoute, replace} = useRouter();
// const from = currentRoute.value.redirectedFrom;
// if (currentRoute.value.query) {

//   // replace(from);
//   const path = currentRoute.value.query.redirect as string ?? '/';
//   if (window.__POWERED_BY_QIANKUN__) {
//     const query = getOtherQuery(currentRoute.value.query);
//     const url1 = router.resolve({ path: path, query: { ...query } });
//     window.history.pushState(null, '', url1.href);
//   } else {
//     router.push({path: path, query: getOtherQuery(currentRoute.value.query)});
//   }
// } else {
//   // replace({
//   //   path: '/'
//   // });
//   router.push('/');
// }

</script>
