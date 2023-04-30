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
  <p class="sign-up" @click="changeForm">sign up</p>
</template>

<script>

import authenticationMixin from "@/mixins/authenticationMixin";
import * as API_SERVICE from "../services/apiService";

export default {
  name: "Login",
  emits: ['setIsLogin'],
  mixins: [authenticationMixin],
  methods: {
    submit(event) {
      event.preventDefault();
      this.verifyError('email');
      this.verifyError('password');

      if (!this.errors.email && this.email.trim() !== '' && !this.errors.password && this.password.trim() !== '') {
        API_SERVICE.login({'email': this.email, 'password': this.password})
        .then((response)=> {
          this.$store.dispatch("setUser", response.data);
          this.$store.dispatch("setToken", response.headers['authorization']);
          this.$router.push("/dashboard")
        })
        .catch((error)=> {
          console.error(error)
        })
      }
    }
  }
}
</script>
