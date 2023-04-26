<template>
  <form class="form-create">
    <div class="select-wrapper">
          <span>
            <input
                type="radio"
                id="personal"
                name="category"
                value="personal"
                @change="selectCategory($event)"
            >
            <label for="personal">Personal</label>
          </span>
      <span>
            <input
                type="radio"
                id="job"
                name="category"
                value="job"
                @change="selectCategory($event)"
            >
            <label for="job">Job</label>
          </span>
      <span>
            <input
                type="radio"
                id="other"
                name="category"
                value="other"
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
      categories: [
        {
          id: 1,
          name: 'personal'
        },
        {
          id: 2,
          name: 'job'
        },
        {
          id: 3,
          name: 'other'
        }
      ]
    }
  },
  methods: {
    selectCategory(event) {
      this.category = this.categories.find(category => category.name === event.target.value);
    },
    submit(event) {
      event.preventDefault();
      this.verifyFields();
      if (!this.errors.text && !this.errors.title) {
        console.log(this.title)
        console.log(this.text)
        console.log(this.category)
        EventBus.emit('toggleModal', 'create');
      }
    },
    verifyFields() {
      this.errors.text = this.text.trim() === '';
      this.errors.title = this.title.trim() === '';
    }
  }
}
</script>
