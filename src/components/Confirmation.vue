<template>
  <div class="confirmation-container">
    <p>Are you sure you want to delete this note?</p>
    <button @click="hideModal">yes</button>
  </div>
</template>

<script>
import {EventBus} from "@/event-bus/event-bus";
import * as API_SERVICE from "@/services/apiService";

export default {
  name: "Confirmation",
  methods: {
    hideModal() {
      const ownerId = this.$store.getters.getUserField('id');
      API_SERVICE.deleteNote(this.$store.getters.getSelectedNote, ownerId)
          .then(() => {
            EventBus.emit("fetchNotes")
            EventBus.emit('toggleModal', 'confirmation');
          })
          .catch((error) => {
            console.error(error)
          })
          .finally(() => {
            this.$store.dispatch('setSelectedNote', null)
          })
    }
  }
}
</script>
