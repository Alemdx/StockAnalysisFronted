<template>
  <v-container>
    <v-data-table :headers="headers" :items="stocks" class="header-green">
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="item.stockCode"
            :class="index % 2 === 0 ? 'red--text' : 'green--text'"
          >
            <td>{{ item.stockCode }} - {{ item.stockName }}</td>
            <td>{{ item.marketStatus }}</td>
            <td>{{ item.currentPrice }}</td>
            <td>{{ item.high52w }}</td>
            <td>{{ item.low52w }}</td>
            <td>{{ (item.volume / 10000).toFixed(2) }}</td>
            <td>{{ (item.marketCapital / 100000000).toFixed(2) }}</td>
            <td>{{ item.turnoverRate }}%</td>
            <td>{{ item.amplitude }}%</td>
            <td>
              <v-btn
                small
                class="ml-1"
                min-width="-1"
                text
                @click="deleteItem(index)"
              >
                <v-icon dark>
                  mdi-minus
                </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import UserService from "@/Service/userservice";
export default {
  data() {
    return {
      headers: [
        { text: '股票代码 - 名称', value: 'stockCode', sortable: false },
        { text: '市场状态', value: 'marketStatus', sortable: false },
        { text: '当前价格（元）', value: 'currentPrice', sortable: false },
        { text: '52 周最高（元）', value: 'high52w', sortable: false },
        { text: '52 周最低（元）', value: 'low52w', sortable: false },
        { text: '成交量（万手）', value: 'volume', sortable: false },
        { text: '市值（亿）', value: 'marketCapital', sortable: true },
        { text: '换手率', value: 'turnoverRate', sortable: true },
        { text: '振幅', value: 'amplitude', sortable: true },
        { text: '取消关注', value: 'actions', sortable: false },
      ],
      stocks: [],
    };
  },
  async mounted() {
    await this.initData();
  },
  methods: {
    async initData() {
      this.stocks = await UserService.getStock();
    },
    async deleteItem(index) {
    const stockCode = this.stocks[index].stockCode;
    try {
      await UserService.deleteStock(stockCode);
      alert(stockCode)
      this.stocks.splice(index, 1);
    } catch (error) {
      console.error('Failed to delete stock:', error);
    }
  },
  },
};
</script>

<style scoped>
.header-green >>> thead th {
  font-weight: bold;
  font-size: 1.2em;
  /* background-color: #4caf50; */
  color: white;
}
</style>
