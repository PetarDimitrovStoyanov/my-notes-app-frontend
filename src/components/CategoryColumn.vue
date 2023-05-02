<template>
  <div :class="['notes-wrapper', wrapperClasses.join(','), `${id}`]">
    <h2>{{ id }} notes:</h2>
    <Draggable
        :id="id"
        v-model="notes"
        group="cards"
        item-key="id"
        tag="span"
        :class="draggableClass"
        @end="onDragEnd($event)"
        :touchStartThreshold="10"
    >
      <template #item="{element}">
        <Card :card="element"/>
      </template>
    </Draggable>
    <p class="drag">+ Drag some note here</p>
  </div>
</template>

<script>
import Card from "@/components/Card";
import Draggable from "vuedraggable";
import * as API_SERVICE from "@/services/apiService";

export default {
  name: "CategoryColumn",
  components: {
    Card,
    Draggable
  },
  props: {
    id: {
      type: String,
      required: true
    },
    draggableClass: {
      type: String,
      required: true
    },
    wrapperClasses: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      notes: [...this.$store.getters.getNotes].filter(note => note.category.name === this.id)
    }
  },
  methods: {
    onDragEnd(event) {

      const {item, to} = event;
      this.updateCategory(item, to);
      let categoryNotes = [];

      this.$store.getters.getCategories.forEach(category => {
        let categoryId = `#${category.name}`;
        let categoryColumn = document.querySelector(categoryId);
        let currentCategoryNotes = Array.from(categoryColumn.querySelectorAll('article'));

        for (let index = 0; index < currentCategoryNotes.length; index++) {
          let updateNote = this.generateUpdateNote(currentCategoryNotes, index);
          categoryNotes.push(updateNote);
        }
      })

      this.updateDraggedNote(categoryNotes);
    },
    generateUpdateNote(currentCategoryNotes, index) {
      let singleNote = this.$store.getters.getSingleNote(Number(currentCategoryNotes[index].id));

      return {
        id: singleNote.id,
        title: singleNote.title,
        text: singleNote.text,
        owner: this.$store.getters.getUser,
        isImportant: singleNote.isImportant,
        orderNumber: index,
        category: singleNote.category,
        createdDate: singleNote.createdDate
      }
    },
    updateCategory(item, to) {
      let singleNote = this.$store.getters.getSingleNote(Number(item.id));
      singleNote.category = this.$store.getters.getCategoryByName(to.id);
      this.$store.dispatch('updateSingleNote', singleNote);
    },
    updateDraggedNote(updateNote) {
      API_SERVICE.updateNoteOnDrag(updateNote)
          .then(() => {
            this.$parent.fetchNotes();
          })
          .catch((error) => {
            console.error(error);
          })
    },
  }
}
</script>
