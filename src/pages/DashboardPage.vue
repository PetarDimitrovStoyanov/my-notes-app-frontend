<template>
  <section class="dashboard-container" :key="key">
    <CategoryColumn
        :id="'Personal'"
        :wrapperClasses="['personal-wrapper']"
        :draggableClass="'personal'"
    />
    <CategoryColumn
        :id="'Job'"
        :wrapperClasses="['job-wrapper']"
        :draggableClass="'job'"
    />
    <CategoryColumn
        :id="'Other'"
        :wrapperClasses="['other-wrapper']"
        :draggableClass="'other'"
    />
  </section>
</template>

<script>
import * as API_SERVICE from "../services/apiService";
import {EventBus} from "@/event-bus/event-bus";
import CategoryColumn from "@/components/CategoryColumn";

export default {
  name: 'DashboardPage',
  components: {
    CategoryColumn
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
  data() {
    return {
      key: 0
    }
  },
  methods: {
    search(criteria) {
      EventBus.emit("spinner")
      API_SERVICE.search(criteria)
          .then((response) => {
            this.$store.dispatch('setNotes', response.data)
          })
          .catch((error) => {
            console.error(error)
          })
          .finally(() => {
            EventBus.emit("spinner")
            this.key += 1
          })
    },
    fetchNotes() {
      let criteria = {
        ownerId: this.$store.getters.getUserField('id')
      }
      API_SERVICE.search(criteria)
          .then((response) => {
            this.$store.dispatch('setNotes', response.data)
          })
          .catch((error) => {
            console.error(error)
          })
          .finally(() => {
            this.key += 1
          })
    },
    fetchAllCategories() {
      API_SERVICE.fetchCategories()
          .then((response) => this.$store.dispatch('setCategories', response.data))
          .catch((error) => console.error(error))
    }
  }
}
</script>
