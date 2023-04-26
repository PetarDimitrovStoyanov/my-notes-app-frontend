<template>
  <section class="modal-container" v-if="showModal">
    <div class="modal-wrapper">
      <img class="close" @click="toggleModal" :src="require('../assets/icons/x.svg')" alt="x">
      <Search v-if="type === 'search'" />
      <Create v-if="type === 'create'" />
      <Confirmation v-if="type ==='confirmation'" />
    </div>
  </section>
</template>

<script>
import {EventBus} from '@/event-bus/event-bus';
import Create from "@/components/Create";
import Search from "@/components/Search";
import Confirmation from "@/components/Confirmation";

export default {
  name: "Modal",
  components: {
    Create,
    Search,
    Confirmation
  },
  data() {
    return {
      showModal: false,
      type: ''
    }
  },
  created() {
    EventBus.on('toggleModal', this.toggleModal);
  },
  beforeUnmount() {
    this.type = '';
  },
  methods: {
    toggleModal(type) {
      this.type = type;
      this.showModal = !this.showModal;
      if (this.showModal) {
        this.$router.push({ path: '/', query: { modal: 'true' }})
      } else {
        this.$router.push({ path: '/', query: {}})
      }
    },
  }
}
</script>
