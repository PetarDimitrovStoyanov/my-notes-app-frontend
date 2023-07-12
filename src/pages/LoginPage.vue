<template>
  <section class="login-page">
    <div class="content-wrapper">
      <Login
          v-if="isLogin" 
          @setIsLogin="signUp" 
      />
      <Register
          v-else
          @setIsLogin="signUp"
      />
    </div>
  </section>
</template>

<script>
import Login from "@/components/Login";
import Register from "@/components/Register";

export default {
  name: "LoginPage",
  components: {
    Login,
    Register
  },
  data() {
    return {
      isLogin: true
    }
  },
  methods: {
    signUp() {
      this.isLogin = !this.isLogin;
    }
  }
}
</script>
