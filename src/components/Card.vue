<template>
  <article class="single-card-container">
    <h2>{{ card.title }}</h2>
    <div
        class="text-area"
        ref="myDiv"
        @dblclick="onDoubleClick"
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
      isEditing: false
    };
  },
  methods: {
    onDoubleClick() {
      this.isEditing = true;
      this.$refs.myDiv.contentEditable = true;
      this.$refs.myDiv.focus();
    },
    onInput() {
      console.log(this.$refs.myDiv.textContent);
    },
  },
};
</script>
