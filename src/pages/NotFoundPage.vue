<template>
  <div class="not-found-component">
    <h2>ERROR 404</h2>
    <h3>Page not found.</h3>
    <button class="button-to-notes" @click="redirect()">View notes</button>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
  methods: {
    redirect() {
      this.$router.push("/dashboard")
    }
  }
}
</script>
