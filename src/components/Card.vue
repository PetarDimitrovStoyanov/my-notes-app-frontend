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
        <img @click="changeImportance" class="important-button" :src="require('@/assets/icons/card/important.svg')" alt="!">
        <img @click="deleteNote" :src="require('@/assets/icons/card/trash.svg')" alt="delete">
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
      //TODO: FETCH + delete from storage
    },
    changeImportance() {
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
