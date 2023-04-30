<template>
  <div class="side-nav">
    <div class="user">
      <img class="user-img" :src="require('@/assets/icons/side-menu/user.svg')" alt="user">
      <div>
        <h2>{{$store.getters.getUserField('fullName')}}</h2>
        <p class="paragraph">{{$store.getters.getUserField('email')}}</p>
      </div>
    </div>
    <ul class="unordered-list">
      <li class="list-item" @click="openModal('search')">
        <img class="item-image" :src="require('@/assets/icons/side-menu/search.svg')" alt="search">
        <p class="paragraph">Search</p>
      </li>
      <li class="list-item" @click="openModal('create')">
        <img class="item-image" :src="require('@/assets/icons/side-menu/plus.svg')" alt="reports">
        <p class="paragraph">Create</p>
      </li>
    </ul>
    <ul class="unordered-list">
      <li class="list-item" @click="logout">
        <img class="item-image" :src="require('@/assets/icons/side-menu/logout.svg')" alt="logout">
        <p class="paragraph">Logout</p>
      </li>
    </ul>
  </div>

</template>

<script>
import {EventBus} from "@/event-bus/event-bus";
import * as API_SERVICE from "../services/apiService";

export default {
  name: "SideMenu",
  data() {
    return {}
  },
  methods: {
    openModal(type) {
      EventBus.emit('toggleModal', type);
    },
    logout() {
      API_SERVICE.logout()
      .then(() => {
        this.$router.push("/login")
      })
      .catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>
