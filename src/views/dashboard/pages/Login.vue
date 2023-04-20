<template>
  <v-container fluid class="stock-analysis-container">
    <v-row text-align="center" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="login-card" outlined>
              <h1 class="font-weight-bold display-3 mb-4 text-white ">Stock      Analysis      System</h1>
          <v-img src="https://media.istockphoto.com/id/913219882/photo/financial-graph-on-technology-abstract-background.jpg?b=1&s=170667a&w=0&k=20&c=aFXB_2Bn_T7weuTYIqZAs8sIja9MHcT-u-TlBVftvqo="  height="250px" width="600px" contain />

          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="user.username" label="用户名" required></v-text-field>
              <v-text-field v-model="user.password" label="密码" type="password" required></v-text-field>
                 <div class="text-center">
              <v-btn color="primary" class="mt-4" @click="login">登录</v-btn>
            </div>
            </v-form>
                      <div class="text-right mt-2">
            <router-link to="/register">还没有账号？点此注册</router-link>
          </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import user from "@/vo/user"
import authService from "@/Service/authservice"

export default {
  data() {
    return {
      user: new user("","",""),
    };
  },

  methods: {

    login() {
        //调用服务
        authService.login(this.user)
      }

  },
};
</script>
<style scoped>
.stock-analysis-container {
  /* background-image: url('https://media.istockphoto.com/id/926051128/photo/technical-financial-graph-on-technology-abstract-background.jpg?b=1&s=170667a&w=0&k=20&c=aibay1iN3AGKkrY7qLZRX7EOdHoDQi3lPfcPY0-6Uz0='); */
  background-size: cover;
  background-position: center center;
  height: 100vh;
}

.login-card {
  max-width: 600px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
.font-weight-bold{
    text-align:center
}

@media (max-width: 767px) {
  .login-card {
    padding: 20px;
  }
}
</style>






