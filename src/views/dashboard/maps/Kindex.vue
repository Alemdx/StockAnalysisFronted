<template>
  <v-container fluid>
    <v-row>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          高级筛选
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
      <span class="text-h5">指数筛选</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['新高', '新低']"
                  label="选项"
                  required
                  v-model="selectOption"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['5', '10', '15', '20', '25', '30', '35', '40', '45']"
                  label="日期"
                  multiple
                  v-model="selectDay"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*筛选出在n天内创出新高或新低的指数</small>
                    <v-alert
            v-model="showResults"
            border="left"
            colored-border
            type="info"
            elevation="2"
            close-icon='$cancel'
          >
            {{ results.join(', ') }}
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            关闭
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="getDialogValues"
          >
            查看
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
 <v-spacer></v-spacer>
    <v-dialog
      v-model="dialog2"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          获取成分股
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">获取成分股</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                 <v-col cols="12">
                  <v-text-field
                    label="输入代码"
                    class="purple-input"
                    v-model="indexcode"
                  />
                </v-col>
            </v-row>
          </v-container>
          <small>*获取该指数的成分股</small>


    <v-data-table :headers="headers" :items="indexinfo" class="elevation-1" v-show="showDataTable">
      <template v-slot:item.weight="{ item }">
        <span>{{ item.weight }}%</span>
      </template>
    </v-data-table> 

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog2 = false"
          >
            关闭
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="getindexdetail(indexcode)"
          >
            查看
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-row>


    
    <v-row>
      <template v-for="(code, index) in codes">
        <v-col cols="12" sm="6" md="6" lg="6" xl="4" :key="index">
          <v-card
            class="mx-auto mb-6"
            color="blue-grey lighten-5"
            dark
          >
            <v-card-text>
              <k-line-chart
                :chart-id="`chart${index}`"
                :code="code"
                :name="names[index]"
                style="width: 100%; height: 300px;"
              ></k-line-chart>
            </v-card-text>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>


<script>
import KLineChart from "@/views/dashboard/components/KLineChart.vue";
import DataService from "@/Service/dataservice";
import StockItem from "@/components/base/StockList.vue"

export default {
  components: {
    KLineChart,
    StockItem,

  },
  data() {
    return {
       headers: [
      { text: '股票代码', value: 'securityCode' },
      { text: '股票名称', value: 'securityName' },
      { text: '权重', value: 'weight' },
    ],
      codes: ['000016', '000300', '000905', '000688'],
      names: ['上证50', '沪深300', '中证500', '科创50'],
      showDataTable: false,
      dialog2:false,
      dialog: false,
      selectOption: '',
      selectDay: '',
      results: [],
      showResults: false,
      indexcode:'',
      indexinfo:[]
    
    };
  },
  methods:{
async getDialogValues() {
    const promises = this.codes.map((code, i) => {
        return DataService.getindex(code, this.selectDay).then(str => {
            if (str === "yes") {
                return this.codes[i]+": "+this.names[i];
            }
        });
    });

    const results = await Promise.all(promises);
    const filteredResults = results.filter(result => result !== undefined);
    console.log(filteredResults); // 输出过滤后的结果
    this.results = filteredResults;
    this.showResults = true;
  },
  //获取指数详情
  async getindexdetail(code){
    // console.log(code)
    this.indexinfo= await DataService.getcomp(code);
    this.showDataTable=true


  },


  }
};
</script>
