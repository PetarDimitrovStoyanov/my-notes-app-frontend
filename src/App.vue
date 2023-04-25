<template>
  <SideMenu v-if="$route.name !== 'login'"/>
  <router-view />
</template>

<script>

import SideMenu from "@/components/SideMenu";

export default {
  name: 'App',
  components: {
    SideMenu
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
