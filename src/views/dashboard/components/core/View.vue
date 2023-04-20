<template>
  <v-content>
    <router-view />
<!-- 注释就是去掉footer -->
    <!-- <dashboard-core-footer /> -->
  </v-content>
</template>

<script>
  export default {
    name: 'DashboardCoreView',

    components: {
      DashboardCoreFooter: () => import('./Footer'),
    },
  }
</script>
