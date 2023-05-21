<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="mx-auto">
          <v-card-title>
            <h3 class="text-center">股票列表</h3>
          </v-card-title>
          <v-divider></v-divider>
          <v-simple-table class="elevation-1">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">证券代码</th>
                  <th class="text-center">证券名称</th>
                  <th class="text-center">权重</th>
                </tr>
              </thead>
              <tbody>
                <stock-item
                  v-for="(stock, index) in stockData"
                  :key="index"
                  :stock="stock"
                ></stock-item>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      headers: [
        { text: "证券代码", value: "securityCode", align: "center" },
        { text: "证券名称", value: "securityName", align: "center" },
        { text: "权重", value: "weight", align: "center" },
      ],
      stockData: [
        { securityCode: "600893", securityName: "航发动力", weight: 5.56 },
        { securityCode: "601989", securityName: "中国重工", weight: 4.97 },
        { securityCode: "600150", securityName: "中国船舶", weight: 4.52 },
        { securityCode: "600760", securityName: "中航沈飞", weight: 4.27 },
        { securityCode: "002179", securityName: "中航光电", weight: 4.15 },
        { securityCode: "000768", securityName: "中航西飞", weight: 3.33 },
        { securityCode: "000733", securityName: "振华科技", weight: 2.99 },
        { securityCode: "600372", securityName: "中航电子", weight: 2.84 },
        { securityCode: "002625", securityName: "光启技术", weight: 2.52 },
        { securityCode: "688122", securityName: "西部超导", weight: 2.52 },
      ],
    };
  },
};
</script>
