<template>
  <article :class="['single-card-container', card.important ? 'important' : '']">
    <div class="card-meta-wrapper">
      <h2
          class="text-area"
          ref="myTitleRef"
          @dblclick="onDoubleClick('myTitleRef')"
          :innerHTML="myTitle"
      ></h2>
      <div class="card-icons">
        <img
            v-if="card.important"
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
        :innerHTML="divValue"
    ></div>
  </article>
</template>

<script>
import {EventBus} from "@/event-bus/event-bus";

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
    deleteNote() {
      EventBus.emit('toggleModal', 'confirmation');
      //TODO: FETCH + delete from storage
    },
    changeImportance() {
      // eslint-disable-next-line vue/no-mutating-props
      this.card.important = !this.card.important
      //TODO: FETCH + change object property
    },
    onDoubleClick(ref) {
      this.isEditing = true;
      this.$refs[ref].contentEditable = true;
      this.$refs[ref].focus();
    }
  },
};
</script>
