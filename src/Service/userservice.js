import axios from 'axios';
import authservice from './authservice';
const API_URL = 'http://localhost:8080/';//服务端地址


class UserService{
    //用户注册
    async register(user) {
        //这种是url传参的方式，不是在body里面传参
        const url="http://localhost:8080/register?username="+user.username+"&password="+user.password+"&email="+user.email
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
        const url="http://localhost:8080/update?username="+username+"&password="+password
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


}

export default new UserService();