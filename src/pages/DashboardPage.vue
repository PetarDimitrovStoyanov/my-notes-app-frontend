<template>
  <section class="dashboard-container">
    <div class="personal-wrapper notes-wrapper">
      <h2>Personal notes:</h2>
      <Draggable
          v-model="personalNotes"
          group="cards"
          item-key="id"
          tag="span"
          class="personal"
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
          v-model="jobNotes"
          group="cards"
          item-key="id"
          tag="span"
          class="job"
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
          v-model="otherNotes"
          group="cards"
          item-key="id"
          tag="span"
          class="other"
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
import {data} from "./data"

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
  mounted() {
    this.setPersonalNotes();
    this.setJobNotes();
    this.setOtherNotes();
  },
  methods: {
    setPersonalNotes() {
      this.personalNotes = [...data].filter(note => note.category.name === 'personal');
    },
    setJobNotes() {
      this.jobNotes = [...data].filter(note => note.category.name === 'job');
    },
    setOtherNotes() {
      this.otherNotes = [...data].filter(note => note.category.name === 'other');
    }
  }
}
</script>
