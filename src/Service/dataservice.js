import axios from 'axios';
const API_URL = 'http://localhost:5000/';//服务端地址


class DataService{
    //获取K线数据
    async getindexkline(code) {
        //这种是url传参的方式，不是在body里面传参
        const url="http://localhost:5000/stock/getIndexPerf?code="+code;
        const response = await axios.post(url);
        const tpm=response.data.data.map((item) => [
          item.tradeDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3'), // 将日期格式从 '20230130' 转换为 '2023/01/30'
          item.open,
          item.close,
          item.low,
          item.high,
        ]);   
        return tpm;
      }

    //查询符合条件股指
    async getindex(code,day) {
      //这种是url传参的方式，不是在body里面传参
      const url="http://localhost:5002/recommendation/getNewHighIndex?code="+code+"&day="+day;    
      const response = await axios.post(url);
      const str=response.data 
      return str;
    }  

    //查看指数成分股
    async getcomp(code) {
      //这种是url传参的方式，不是在body里面传参
      const url="http://localhost:5000/stock/getIndexComp?code="+code  
      const response = await axios.post(url);
      return response.data;
    }

    //获取成交额
    async getvolumn() {
      //这种是url传参的方式，不是在body里面传参
      const url="http://localhost:5000/stock/getAvolumn"
      return axios.get(url)
    }
    //获取汇率
    async getcurrency() {
      //这种是url传参的方式，不是在body里面传参
      const url="http://localhost:5000/stock/getForeign"
      return axios.get(url)
    }

    async getShIndex(){
      const url="http://localhost:5000/stock/getShIndex"
      return axios.get(url)
    }

    async getHotNotion(){
      const url="http://localhost:5000/stock/getHotNotion"
      return axios.get(url)
    }

    async getHotStock(){
      const url="http://localhost:5000/stock/getHotStock"
      return axios.get(url)
    }

}
export default new DataService();