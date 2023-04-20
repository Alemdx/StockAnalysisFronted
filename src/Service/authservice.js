import axios from 'axios';
const API_URL = 'http://localhost:8080/';//服务端地址


class AuthService {

    async login(user) {
        //这种是url传参的方式，不是在body里面传参
        const url="http://localhost:8080/login?username="+user.username+"&password="+user.password
        try {
          const response =await axios.post(url);
          localStorage.setItem('token',response.data.token)
          location.replace("/#/dashboard")//这里也是逆天
        } catch (error) {
          alert(error);
        }
      }

    //登出 删除token
    logout () {
      localStorage.removeItem('token');
    }
    //获取token
    gettoken(){
        return localStorage.getItem('token');
    }
    async register (user) {
      const response = await axios.post(API_URL + 'account-info/register', {
        userId: user.userId,
        // email: user.email,
        password: user.password,
        identity: user.identity
      });
      return response;
    }
  }

  export default new AuthService();