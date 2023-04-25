<template>
  <article class="single-card-container">
    <h2
        class="text-area"
        ref="myTitleRef"
        @dblclick="onDoubleClick('myTitleRef')"
        :innerHTML="myTitle"
    ></h2>
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
    onDoubleClick(ref) {
      this.isEditing = true;
      this.$refs[ref].contentEditable = true;
      this.$refs[ref].focus();
    }
  },
};
</script>
