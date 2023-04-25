<template>
  <h2>Login</h2>
  <form class="form-login">
    <div class="wrapper">
      <input
          class="input"
          type="email"
          name="email"
          v-model="email"
          placeholder="your email"
          required
          @input="debounceField('email')"
      >
      <p v-if="errors.email" class="email error">The email is not in valid format.</p>
    </div>
    <div class="wrapper">
      <input
          class="input"
          type="password"
          name="password"
          v-model="password"
          placeholder="your password"
          required
          @input="debounceField('password')"
      >
      <p v-if="errors.password" class="password error">The password is not in valid format.</p>
    </div>
    <input
        class="login-button"
        type="submit"
        value="Login"
        @click="submit($event)"
    >
  </form>
  <div class="with">
    <p>or sign up using</p>
    <div class="options">
      <span @click="loginFacebook"><img :src="require('@/assets/icons/login/facebook.svg')" alt="facebook"></span>
      <span @click="loginGoogle"><img :src="require('@/assets/icons/login/google.svg')" alt="google"></span>
    </div>
  </div>
  <p class="sign-up" @click="changeForm">sign up</p>
</template>

<script>

import authenticationMixin from "@/mixins/authenticationMixin";

export default {
  name: "Login",
  mixins: [authenticationMixin],
  methods: {
    loginFacebook() {
      console.log("Facebook")
    },
    loginGoogle() {
      console.log("Google")
    },
    submit(event) {
      event.preventDefault();
      this.verifyError('email');
      this.verifyError('password');
      console.log(this.errors)
      if (!this.errors.email && this.email.trim() !== '' && !this.errors.password && this.password.trim() !== '') {
        //TODO: FETCH
        console.log(this.email)
        console.log(this.password)
      }
    }
  }
}
</script>
