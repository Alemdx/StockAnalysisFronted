<template>
  <v-app class="grey lighten-4">   
    <div class="bg-image"></div>
      <v-container class="mt-12">
        <v-card class="mx-auto" max-width="600" outlined>
          <v-toolbar color="indigo darken-3" dark>
            <v-toolbar-title>股票分析注册</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="registerUser">
              <v-text-field v-model="user.username" label="用户名" required dense outlined color="indigo"></v-text-field>
              <v-text-field v-model="user.email" label="电子邮件" type="email" required dense outlined color="indigo"></v-text-field>
              <v-text-field v-model="user.password" label="密码" type="password" required dense outlined color="indigo"></v-text-field>
              <v-text-field v-model="confirmPassword" label="确认密码" type="password" required dense outlined color="indigo"></v-text-field>
              <v-row class="mt-8">
                <v-col cols="12">
                  <v-btn type="submit" color="indigo" :disabled="!validForm" block>注册</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-container>
  </v-app>
</template>

<script>
import user from "@/vo/user"
import userService from "@/Service/userservice"

export default {
  data() {
    return {
      user: new user("","",""),
      confirmPassword: "",
    };
  },
  computed: {
    validForm() {
      return (
        this.user.username !== "" && this.user.email !== "" && this.user.password !== "" && this.user.password === this.confirmPassword
      );
    },
  },
  methods: {
    registerUser() {
      userService.register(this.user)
    },
  },
};
</script>

<style>
  .v-card {
    border-radius: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  .v-text-field {
    border-radius: 16px;
  }

  .v-btn {
    border-radius: 16px;
    text-transform: none;
  }

  .v-btn--disabled {
    opacity: 0.5;
  }

  label {
    color: #333;
  }

  input::placeholder {
    color: #666;
  }

  .v-application--wrap {
    background: linear-gradient(to bottom, #fff, #f3f8ff);
  }

  .v-form {
    display: flex;
    flex-direction: column;
  }

  .v-row {
    justify-content: center;
  }

  .bg-image {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-image: url("/path/to/background-image.jpg");
    background-size: cover;
    background-position: center;
    filter: blur(4px) brightness(0.8);
  }
</style>
