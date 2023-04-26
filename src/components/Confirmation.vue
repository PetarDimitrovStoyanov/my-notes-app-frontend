<template>
  <div class="confirmation-container">
    <p>Are you sure you want to delete this note?</p>
    <button @click="hideModal">yes</button>
  </div>
</template>

<script>
import {EventBus} from "@/event-bus/event-bus";

export default {
  name: "Confirmation",
  methods: {
    hideModal() {
      EventBus.emit('toggleModal', 'confirmation');
    }
  }
}
</script>
