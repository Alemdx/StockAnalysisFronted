<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <!-- <v-col
        cols="12"
        lg="4"
      >
  
      </v-col> -->

      <!-- <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          color="success"
          hover-reveal
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Daily Sales
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            <v-icon
              color="green"
              small
            >
              mdi-arrow-up
            </v-icon>
            <span class="green--text">55%</span>&nbsp;
            increase in today's sales
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="dataCompletedTasksChart.data"
          :options="dataCompletedTasksChart.options"
          hover-reveal
          color="info"
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h3 class="card-title font-weight-light mt-2 ml-2">
            Completed Tasks
          </h3>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            Last Last Campaign Performance
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">campaign sent 26 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col> -->

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="info"
          icon="mdi-currency-cny"
          title="两市成交额"
          v-model="volumn"
          sub-icon="mdi-clock"
          sub-text="刚刚更新"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="primary"
          icon="mdi-currency-usd"
          title="离岸人民币汇率"
           v-model="currency"
          sub-icon="mdi-clock"
          sub-text="刚刚更新"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="red"
          icon="mdi-finance"
          title="上证指数"
          v-model="ShIndex"
          sub-icon="mdi-clock"
          sub-text="刚刚更新"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="orange"
          icon="mdi-sofa"
          title="深圳成指"
          v-model="ShIndex"
          sub-icon="mdi-clock"
          sub-text="刚刚更新"
        />
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="warning"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              热门板块
            </div>

            <div class="subtitle-1 font-weight-light">
              当日热门
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="items"
              :options="{itemsPerPage: 5}"
            />
          </v-card-text>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
                <base-material-card
          color="info"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              热门股票
            </div>

            <div class="subtitle-1 font-weight-light">
              当前热门
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headers1"
              :items="items1"
              :options="{itemsPerPage: 5}"
            />
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataService from "@/Service/dataservice"
  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        //先设置为静态数据
        volumn:"1.13万亿",
        currency:"6.92734",
        ShIndex:"1.1379%",
        headers1: [
          {
            sortable: false,
            text: 'ID',
            value: 'ID',
          },
          {
            sortable: false,
            text: '股票代码',
            value: 'code',
          },
          {
            sortable: false,
            text: '股票简称',
            value: 'name',
          }
        ],
        headers: [
          {
            sortable: false,
            text: 'ID',
            value: 'ID',
          },
          {
            sortable: false,
            text: '指数代码',
            value: 'code',
          },
          {
            sortable: false,
            text: '指数简称',
            value: 'name',
          }
        ],
        items:[
    {
        "ID": 1,
        "code": "885874",
        "name": "云游戏"
    },
    {
        "ID": 2,
        "code": "885457",
        "name": "手机游戏"
    },
    {
        "ID": 3,
        "code": "885603",
        "name": "网络游戏"
    },
    {
        "ID": 4,
        "code": "886019",
        "name": "AIGC概念"
    },
    {
        "ID": 5,
        "code": "886031",
        "name": "ChatGPT概念"
    },
    {
        "ID": 6,
        "code": "885918",
        "name": "快手概念"
    },
    {
        "ID": 7,
        "code": "885737",
        "name": "电子竞技"
    },
    {
        "ID": 8,
        "code": "886017",
        "name": "Web3.0"
    },
    {
        "ID": 9,
        "code": "885933",
        "name": "NFT概念"
    },
    {
        "ID": 10,
        "code": "885950",
        "name": "虚拟数字人"
    }
],

        items1:[{'ID': 1, 'code': '600415', 'name': '小商品城'}, {'ID': 2, 'code': '300315', 'name': '掌趣科技'}, {'ID': 3, 'code': '603083',
'name': '剑桥科技'}, {'ID': 4, 'code': '002747', 'name': '埃斯顿'}, {'ID': 5, 'code': '600757', 'name': '长江传媒'}, {'ID': 6,
'code': '600072', 'name': '中船科技'}, {'ID': 7, 'code': '300418', 'name': '昆仑万维'}, {'ID': 8, 'code': '601858', 'name':
'中国科传'}, {'ID': 9, 'code': '300058', 'name': '蓝色光标'}, {'ID': 10, 'code': '300678', 'name': '中科信息'}, {'ID': 11, 'code':
'601360', 'name': '三六零'}, {'ID': 12, 'code': '300031', 'name': '宝通科技'}, {'ID': 13, 'code': '603019', 'name': '中科曙光'},
{'ID': 14, 'code': '002315', 'name': '焦点科技'}, {'ID': 15, 'code': '002229', 'name': '鸿博股份'}, {'ID': 16, 'code': '002222',
'name': '福晶科技'}, {'ID': 17, 'code': '601900', 'name': '南方传媒'}, {'ID': 18, 'code': '300624', 'name': '万兴科技'}, {'ID': 19,
'code': '300085', 'name': '银之杰'}, {'ID': 20, 'code': '601949', 'name': '中国出版'}, {'ID': 21, 'code': '601012', 'name':
'隆基绿能'}, {'ID': 22, 'code': '000977', 'name': '浪潮信息'}, {'ID': 23, 'code': '600629', 'name': '华建集团'}, {'ID': 24, 'code':
'300459', 'name': '汤姆猫'}, {'ID': 25, 'code': '601390', 'name': '中国中铁'}, {'ID': 26, 'code': '600887', 'name': '伊利股份'},
{'ID': 27, 'code': '300017', 'name': '网宿科技'}, {'ID': 28, 'code': '002230', 'name': '科大讯飞'}, {'ID': 29, 'code': '600229',
'name': '城市传媒'}, {'ID': 30, 'code': '601318', 'name': '中国平安'}, {'ID': 31, 'code': '000065', 'name': '北方国际'}, {'ID': 32,
'code': '601068', 'name': '中铝国际'}, {'ID': 33, 'code': '002077', 'name': '大港股份'}, {'ID': 34, 'code': '000625', 'name':
'长安汽车'}, {'ID': 35, 'code': '002555', 'name': '三七互娱'}, {'ID': 36, 'code': '002594', 'name': '比亚迪'}, {'ID': 37, 'code':
'601989', 'name': '中国重工'}, {'ID': 38, 'code': '601857', 'name': '中国石油'}, {'ID': 39, 'code': '300002', 'name': '神州泰岳'},
{'ID': 40, 'code': '002338', 'name': '奥普光电'}, {'ID': 41, 'code': '000830', 'name': '鲁西化工'}, {'ID': 42, 'code': '601326',
'name': '秦港股份'}, {'ID': 43, 'code': '601595', 'name': '上海电影'}, {'ID': 44, 'code': '002624', 'name': '完美世界'}, {'ID': 45,
'code': '002558', 'name': '巨人网络'}, {'ID': 46, 'code': '600105', 'name': '永鼎股份'}, {'ID': 47, 'code': '603322', 'name':
'超讯通信'}, {'ID': 48, 'code': '300308', 'name': '中际旭创'}, {'ID': 49, 'code': '002602', 'name': '世纪华通'}, {'ID': 50, 'code':
'000540', 'name': '中天金融'}],



        tabs: 0,
        tasks: {
          0: [
            {
              text: 'Sign contract for "What are conference organizers afraid of?"',
              value: true,
            },
            {
              text: 'Lines From Great Russian Literature? Or E-mails From My Boss?',
              value: false,
            },
            {
              text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              value: false,
            },
            {
              text: 'Create 4 Invisible User Experiences you Never Knew About',
              value: true,
            },
          ],
          1: [
            {
              text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              value: true,
            },
            {
              text: 'Sign contract for "What are conference organizers afraid of?"',
              value: false,
            },
          ],
          2: [
            {
              text: 'Lines From Great Russian Literature? Or E-mails From My Boss?',
              value: false,
            },
            {
              text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              value: true,
            },
            {
              text: 'Sign contract for "What are conference organizers afraid of?"',
              value: true,
            },
          ],
        },
        list: {
          0: false,
          1: false,
          2: false,
        },
      }
    },
    mounted() {
    this.getVolunm(),
    this.getCurrency(),
    this.getShIndex(),
    this.getHotNotion(),
    this.getHotStock()
  },

    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
      getVolunm() {
        DataService.getvolumn().then((result) => {
          this.volumn = result.data;
        });
      },
      getCurrency(){
        DataService.getcurrency().then((result) => {
          this.currency = result.data;
        });
      },
      getShIndex(){
          DataService.getShIndex().then((result) => {
          this.ShIndex = result.data;
        });
      },
      getHotNotion(){
        DataService.getHotNotion().then((result) => {
          this.items=result.data;
        });

      },
      getHotStock(){
        DataService.getHotStock().then((result) => {
          this.items1=result.data;
        });

      }

    },
  }
</script>
