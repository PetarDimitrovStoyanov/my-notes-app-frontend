<template>
  <h2>Register</h2>
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
    <div class="wrapper">
      <input
          class="input"
          type="password"
          name="confirm-password"
          v-model="confirmPassword"
          placeholder="confirm password"
          required
          @input="debounceField('confirmPassword')"
      >
      <p v-if="errors.confirmPassword" class="confirm-password error">Passwords do not match.</p>
    </div>
    <input class="login-button" type="submit" value="Register" @click="submit($event)">
  </form>
  <p class="sign-up" @click="changeForm">sign in</p>
</template>

<script>
import authenticationMixin from "@/mixins/authenticationMixin";

export default {
  name: "Register",
  emits: ['setIsLogin'],
  mixins: [authenticationMixin],
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    submit(event) {
      event.preventDefault();
      this.verifyError('email');
      this.verifyError('password');
      this.verifyError('confirmPassword');
      if (!this.errors.email && this.email.trim() !== ''
          && !this.errors.password && this.password.trim() !== '' && this.password === this.confirmPassword) {
        //TODO: FETCH
        console.log(this.email)
        console.log(this.password)
        console.log(this.confirmPassword)
      }
    }
  }
}
</script>
