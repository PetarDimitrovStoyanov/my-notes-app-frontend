<template>
  <div class="spinner-container" v-if="isLoading">
    <div class="spinner">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import {EventBus} from "@/event-bus/event-bus";

export default {
  name: "Spinner",
  data() {
    return {
      isLoading: false
    }
  },
  created() {
    EventBus.on('spinner', this.toggleSpinner)
  },
  beforeUnmount() {
    EventBus.off('spinner')
  },
  methods: {
    toggleSpinner() {
      this.isLoading = !this.isLoading;
    }
  }
}
</script>
