<template style="position: relative" >
  <SideMenu
      v-if="$route.name !== 'login' && $route.name !== 'not-found'"
      :class="$route.query.modal ? 'modal' : ''"
  />
  <router-view :class="$route.query.modal ? 'modal' : ''" />
  <Modal />
  <Spinner />
</template>

<script>

import SideMenu from "@/components/SideMenu";
import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";

export default {
  name: 'App',
  components: {
    Spinner,
    SideMenu,
    Modal
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
  left: 0;
  background-image: url("@/assets/icons/background.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
