import axios from 'axios';
import authservice from './authservice';
const API_URL = 'http://localhost:8005/';//服务端地址


class UserService{
    //用户注册
    async register(user) {
        //这种是url传参的方式，不是在body里面传参
        const url="http://localhost:8005/register?username="+user.username+"&password="+user.password+"&email="+user.email
        try {
          const response =await axios.post(url);
          location.replace("/#/login")//这里也是逆天
        } catch (error) {
          alert(error);
        }
      }

    //更新用户信息
    async updateuser(username,password) {
        //这种是url传参的方式，不是在body里面传参
        const url="http://localhost:8085/update?username="+username+"&password="+password
        const token = localStorage.getItem('token');
        let parm={
          username:username,
          password:password
        }
        const config = {
          headers: {
            'Authorization': token
          }
        };
        axios.post(url,parm,
          config)
        .then(response => {
          alert(response)
          console.log(response)
        })
        .catch(error => {
          alert(error)
        });
      }

    //获取用户关注股票
    async getStock() {
      const url = "http://localhost:8005/UserService/getMyStock?username=" + localStorage.getItem('username');
      console.log('URL:', url);
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': token
        }
      };
      let parm = {
        username: localStorage.getItem('username'),
      }
      const response = await axios.post(url, parm, config);
      const data = response.data;
      console.log('Response data:', data);
      return data;
    }

    //删除用户关注股票
    async deleteStock(code) {
      const url = "http://localhost:8005/UserService/deleteMyStock?username=" + localStorage.getItem('username')+"&code="+code;
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': token
        }
      };
      let parm = {
        username: localStorage.getItem('username'),
        code:code
      }
      const response = await axios.post(url, parm, config)
    }
    //添加股票
    async addStock(code) {
      const url = "http://localhost:8005/UserService/addMyStock?username=" + localStorage.getItem('username')+"&code="+code;
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': token
        }
      };
      let parm = {
        username: localStorage.getItem('username'),
        code:code
      }
      const response = await axios.post(url, parm, config);
      const data = response.data;
    }
    
    

}

export default new UserService();