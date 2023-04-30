<template>
  <form class="form-create">
    <div class="select-wrapper">
          <span>
            <input
                type="radio"
                id="personal"
                name="category"
                value="Personal"
                @change="selectCategory($event)"
            >
            <label for="personal">Personal</label>
          </span>
      <span>
            <input
                type="radio"
                id="job"
                name="category"
                value="Job"
                @change="selectCategory($event)"
            >
            <label for="job">Job</label>
          </span>
      <span>
            <input
                type="radio"
                id="other"
                name="category"
                value="Other"
                @change="selectCategory($event)"
                checked
            >
            <label for="other">Other</label>
          </span>
    </div>
    <div class="content-wrapper">
      <input
          class="create-title text-space"
          type="text"
          name="title"
          placeholder="Write the title"
          v-model="title"
      >
      <p class="error" v-if="errors.title">This field can't be empty</p>
    </div>
    <div class="content-wrapper">
          <textarea
              class="text-space"
              name="text"
              id="text"
              cols="30"
              rows="10"
              placeholder="Write content"
              v-model="text"
          ></textarea>
      <p class="error" v-if="errors.text">This field can't be empty</p>
    </div>
    <input class="create-button" type="submit" value="create" @click="submit($event)">
  </form>
</template>

<script>
import {EventBus} from "@/event-bus/event-bus";
import * as API_SERVICE from "../services/apiService";

export default {
  name: "Create",
  data() {
    return {
      title: '',
      text: '',
      category: {},
      errors: {
        title: false,
        text: false
      },
      categories: []
    }
  },
  mounted() {
    this.fetchAllCategories();
  },
  methods: {
    fetchAllCategories() {
      API_SERVICE.fetchCategories()
          .then((response) => {
            this.categories = response.data;
          })
          .catch((error) => {
            console.error(error)
          })
    },
    selectCategory(event) {
      this.category = this.categories.find(category => category.name === event.target.value);
    },
    submit(event) {
      event.preventDefault();
      this.verifyFields();
      if (!this.errors.text && !this.errors.title) {
        this.category = this.category.id ? this.category : this.categories.find(category => category.name === "Other");
        let note = {
          title: this.title,
          text: this.text,
          category: this.category,
          isImportant: false,
          owner: this.$store.getters.getUser,
          orderNumber: this.$store.getters.getNotes.length === 0 ? 0 : this.$store.getters.getNotes.length - 1
        }
        API_SERVICE.createNote(note)
            .then((response) => {
              this.$store.dispatch('addNote', response.data);
              EventBus.emit("fetchNotes")
            })
            .catch((error) => {
              console.error(error)
            })
            .finally(() => {
              EventBus.emit('toggleModal', 'create');
            });
      }
    },
    verifyFields() {
      this.errors.text = this.text.trim() === '';
      this.errors.title = this.title.trim() === '';
    }
  }
}
</script>
