<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-select
          label="Select an algorithm"
          v-model="algorithm"
          :items="algorithms"
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="Enter a stock symbol"
          v-model="symbol"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="predict">Predict</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <!-- 添加股票预测图片 -->
<v-img
  :src="require('@/assets/stock_prediction.png')"
  alt="Stock prediction chart"
  max-height="300"
  contain
  class="mx-auto"
></v-img>
          <v-card-text>
            <v-data-table :headers="headers" :items="predictions"></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      algorithm: '',
      algorithms: ['LSTM', '随机森林', '决策树'],
      symbol: '',
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'High', value: 'high' },
        { text: 'Low', value: 'low' },
        { text: 'Close', value: 'close' },
      ],
      predictions: [],
    };
  },
  methods: {
    predict() {
      axios
        .post(`http://localhost:5001/service/${this.algorithm}?code=${this.symbol}`)
.then(response => {
  console.log(response); // 检查API响应是否正确
  const parsedData = JSON.parse(response.data); // 将字符串解析为数组
  const formattedData = parsedData.map((row, index) => {
    return {
      date: `${index + 1}`,
      high: row[0].toFixed(2),
      low: row[1].toFixed(2),
      close: row[2].toFixed(2),
    };
  });
  this.predictions = formattedData;
})
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
  },
};
</script>
