<template>
  <section class="dashboard-container">
    <div class="personal-wrapper notes-wrapper">
      <h2>Personal notes:</h2>
      <Draggable
          id="Personal"
          v-model="personalNotes"
          group="cards"
          item-key="id"
          tag="span"
          class="personal"
          @end="onDragEnd($event)"
      >
        <template #item="{element}">
          <Card :card="element"/>
        </template>
      </Draggable>
      <p class="drag">+ Drag some note here</p>
    </div>
    <div class="job-wrapper notes-wrapper">
      <h2>Job notes:</h2>
      <Draggable
          id="Job"
          v-model="jobNotes"
          group="cards"
          item-key="id"
          tag="span"
          class="job"
          @end="onDragEnd($event)"
      >
        <template #item="{element}">
          <Card :card="element"/>
        </template>
      </Draggable>
      <p class="drag">+ Drag some note here</p>
    </div>
    <div class="other-wrapper notes-wrapper">
      <h2>Other notes:</h2>
      <Draggable
          id="Other"
          v-model="otherNotes"
          group="cards"
          item-key="id"
          tag="span"
          class="other"
          @end="onDragEnd($event)"
      >
        <template #item="{element}">
          <Card :card="element"/>
        </template>
      </Draggable>
      <p class="drag">+ Drag some note here</p>
    </div>
  </section>
</template>

<script>
import Draggable from "vuedraggable";
import Card from "@/components/Card";
import * as API_SERVICE from "../services/apiService";
import {EventBus} from "@/event-bus/event-bus";

export default {
  name: 'DashboardPage',
  components: {
    Draggable,
    Card
  },
  data() {
    return {
      personalNotes: [],
      jobNotes: [],
      otherNotes: [],
    }
  },
  created() {
    EventBus.on('fetchNotes', this.fetchNotes);
    EventBus.on('search', this.search);
  },
  beforeUnmount() {
    EventBus.off('fetchNotes')
    EventBus.off('search');
  },
  mounted() {
    this.fetchAllCategories();
    this.fetchNotes();
  },
  methods: {
    getNotesByCategory(category) {
      let notesByCategory;
      if (category === 'Personal') {
        notesByCategory = [...this.personalNotes]
      } else if (category === "Job") {
        notesByCategory = [...this.jobNotes]
      } else {
        notesByCategory = [...this.otherNotes]
      }

      return notesByCategory;
    },
    onDragEnd(event) {
      const {item, newIndex, to} = event;
      const notes = this.getNotesByCategory(to.id);
      let updateNote = notes.find(note => note.id == item.id);

      this.updatePositionFields(updateNote, notes, newIndex);

      updateNote.category = this.$store.getters.getCategoryByName(to.id);
      // updateNote.category = this.getCategory(to.id);
      updateNote.owner = {
        id: this.$store.getters.getUserField('id')
      }

      this.updateDraggedNote(updateNote)
    },
    updatePositionFields(updateNote, notes, newIndex) {
      if (this.isNoteSingleElement(notes)) {
        updateNote.orderDateTime = notes[newIndex].orderDateTime;
        updateNote.isIncrement = true;
      } else if (this.isNoteFirstElement(newIndex, notes)) {
        updateNote.orderDateTime = notes[newIndex + 1].orderDateTime;
        updateNote.isIncrement = true;
      } else if (this.isNoteInTheMiddle(newIndex, notes)) {
        updateNote.orderDateTime = notes[newIndex - 1].orderDateTime;
        updateNote.isIncrement = false;
      } else if (this.isNoteLastElement(newIndex, notes)) {
        updateNote.orderDateTime = notes[newIndex - 1].orderDateTime;
        updateNote.isIncrement = false;
      }
    },
    isNoteSingleElement(notes) {
      return notes.length === 1;
    },
    isNoteFirstElement(newIndex, notes) {
      return notes.length >= 1 && newIndex === 0;
    },
    isNoteInTheMiddle(newIndex, notes) {
      return notes.length >= 1 && newIndex !== 0 && notes.length - 1 > newIndex
    },
    isNoteLastElement(newIndex, notes) {
      return notes.length >= 1 && newIndex !== 0 && notes.length - 1 === newIndex;
    },
    updateDraggedNote(updateNote) {
      API_SERVICE.updateNoteOnDrag(updateNote)
          .then(() => {
            this.fetchNotes();
          })
          .catch((error) => {
            console.error(error);
          })
    },
    search(criteria) {
      API_SERVICE.search(criteria)
          .then((response) => {
            this.$store.dispatch('setNotes', response.data)
            this.setPersonalNotes();
            this.setJobNotes();
            this.setOtherNotes();
          })
          .catch((error) => {
            console.error(error)
          })
    },
    fetchNotes() {
      let criteria = {
        ownerId: this.$store.getters.getUserField('id')
      }
      API_SERVICE.search(criteria)
          .then((response) => {
            this.$store.dispatch('setNotes', response.data)
            this.setPersonalNotes();
            this.setJobNotes();
            this.setOtherNotes();
          })
          .catch((error) => {
            console.error(error)
          })
    },
    fetchAllCategories() {
      API_SERVICE.fetchCategories()
          .then((response) => {
            this.$store.dispatch('setCategories', response.data)
          })
          .catch((error) => {
            console.error(error)
          })
    },
    setPersonalNotes() {
      this.personalNotes = [...this.$store.getters.getNotes]
          .filter(note => note.category.name === 'Personal');
    },
    setJobNotes() {
      this.jobNotes = [...this.$store.getters.getNotes]
          .filter(note => note.category.name === 'Job');
    },
    setOtherNotes() {
      this.otherNotes = [...this.$store.getters.getNotes]
          .filter(note => note.category.name === 'Other');
    }
  }
}
</script>
