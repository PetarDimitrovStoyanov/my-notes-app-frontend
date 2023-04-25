<template>
  <section class="dashboard-container">
    <Draggable
        v-model="cards1"
        group="cards"
        item-key="id"
        tag="span"
    >
      <template #item="{element}">
        <Card :card="element"/>
      </template>
    </Draggable>
    <Draggable
        v-if="cards2.length > 0"
        v-model="cards2"
        group="cards"
        item-key="id"
        tag="span"
    >
      <template #item="{element}">
        <Card :card="element"/>
      </template>
    </Draggable>
    <Draggable
        v-if="cards3.length > 0"
        v-model="cards3"
        group="cards"
        item-key="id"
        tag="span"
    >
      <template #item="{element}">
        <Card :card="element"/>
      </template>
    </Draggable>
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
      cards1: [],
      cards2: [],
      cards3: [],
      displayWidth: window.innerWidth
    }
  },
  mounted() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    setCardsForDesktopVersion() {
      let firstPart = Math.ceil(data.length / 3);
      let secondPart = Math.ceil((data.length - firstPart) / 2);

      this.cards1 = [...data].slice(0, firstPart);
      this.cards2 = [...data].slice(firstPart, firstPart + secondPart);
      this.cards3 = [...data].slice(firstPart + secondPart, data.length);
    },
    setCardsForTabletVersion() {
      let firstPart = Math.ceil(data.length / 2);
      this.cards1 = [...data].slice(0, firstPart);
      this.cards2 = [...data].slice(firstPart, data.length);
      this.cards3 = [];
    },
    setCardsForMobileVersion() {
      this.cards1 = data;
      this.cards2 = [];
      this.cards3 = [];
    },
    isTabletVersion() {
      return this.displayWidth > 600 && this.displayWidth <= 1120;
    },
    isMobileVersion() {
      return this.displayWidth <= 600;
    },
    handleResize() {
      this.displayWidth = window.innerWidth;
      if (this.isMobileVersion()) {
        this.setCardsForMobileVersion();
      } else if (this.isTabletVersion()) {
        this.setCardsForTabletVersion();
      } else {
        this.setCardsForDesktopVersion();
      }
    },
  }
}
</script>
