<template>
  <article :id="card.id" :class="['single-card-container', card.isImportant ? 'important' : '']" >
    <div class="card-meta-wrapper">
      <h2
          class="text-area"
          ref="myTitleRef"
          @dblclick="onDoubleClick('myTitleRef')"
          @focusout="update"
          :innerHTML="myTitle"
      ></h2>
      <div class="card-icons">
        <img
            v-if="card.isImportant"
            @click="changeImportance"
            class="important-button"
            :src="require('@/assets/icons/card/star-solid.svg')"
            alt="star"
        >
        <img
            v-else @click="changeImportance"
            class="important-button"
            :src="require('@/assets/icons/card/star-regular.svg')"
            alt="star"
        >
        <img
            @click="deleteNote"
            :src="require('@/assets/icons/card/trash.svg')"
            alt="delete"
        >
      </div>
    </div>

    <div
        class="text-area"
        ref="myDiv"
        @dblclick="onDoubleClick('myDiv')"
        @focusout="update"
        :innerHTML="divValue"
    ></div>
  </article>
</template>

<script>
import {EventBus} from "@/event-bus/event-bus";
import * as API_SERVICE from "../services/apiService";

export default {
  name: "Card",
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      divValue: this.card.text,
      isEditing: false,
      myTitle: this.card.title
    };
  },
  methods: {
    createUpdatingNote() {
      let updatedNote = {...this.card}
      updatedNote.owner = this.$store.getters.getUser;
      updatedNote.title = this.$refs.myTitleRef.textContent;
      updatedNote.text = this.$refs.myDiv.textContent;

      return updatedNote;
    },
    update() {
      let updatedNote = this.createUpdatingNote();
      this.updateNoteInDatabase(updatedNote);
    },
    deleteNote() {
      EventBus.emit('toggleModal', 'confirmation');
      this.$store.dispatch('setSelectedNote', this.card.id);
    },
    updateNoteInDatabase(updatedNote, type) {
      API_SERVICE.updateNote(updatedNote)
          .then(() => {
            if (type && type === 'isImportant') {
              // eslint-disable-next-line vue/no-mutating-props
              this.card.isImportant = !this.card.isImportant;
            }
          })
          .catch((error) => {
            console.error(error)
          })
    },
    changeImportance() {
      let updatedNote = this.createUpdatingNote();
      updatedNote.isImportant = !this.card.isImportant;
      this.updateNoteInDatabase(updatedNote, 'isImportant');
    },
    onDoubleClick(ref) {
      this.isEditing = true;
      this.$refs[ref].contentEditable = true;
      this.$refs[ref].focus();
    }
  },
};
</script>
