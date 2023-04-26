<template>
  <div class="search-container">
    <span class="text-input">
      <input type="text" v-model="searchText" placeholder="Search by title or text">
      <span>
        <img :src="require('@/assets/icons/side-menu/search.svg')" alt="search">
      </span>
    </span>
    <div class="filters">
      <h4>Select one or combine filter options:</h4>
      <div class="options">
        <span class="filter-wrapper">
         <input type="checkbox" id="personal" name="personal" v-model="personal">
         <label for="personal">Personal</label>
        </span>
        <span class="filter-wrapper">
         <input type="checkbox" id="job" name="job" v-model="job">
         <label for="job">Job</label>
        </span>
        <span class="filter-wrapper">
         <input type="checkbox" id="other" name="other" v-model="other">
         <label for="other">Other</label>
        </span>
        <span class="filter-wrapper">
         <input type="checkbox" id="important" name="important" v-model="important">
         <label for="important">Important</label>
        </span>
      </div>
    </div>
    <input class="search-button" type="submit" value="Search" @click="submit">
  </div>
</template>

<script>
import {EventBus} from "@/event-bus/event-bus";

export default {
  name: "Search",
  data() {
    return {
      searchText: '',
      personal: false,
      job: false,
      other: false,
      important: false
    }
  },
  methods: {
    submit() {
      console.log(this.searchText)
      console.log(this.personal)
      console.log(this.job)
      console.log(this.other)
      console.log(this.important)
      EventBus.emit('toggleModal', 'search');
    }
  }
}
</script>
