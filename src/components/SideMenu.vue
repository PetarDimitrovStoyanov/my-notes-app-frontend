<template>
  <div class="side-nav">
    <div class="user">
      <img class="user-img" :src="require('@/assets/icons/side-menu/user.svg')" alt="user">
      <div>
        <h2>Thomas Daniel</h2>
        <p class="paragraph">test@gmail.com</p>
      </div>
    </div>
    <ul class="unordered-list">
      <li class="list-item">
        <img class="item-image" :src="require('@/assets/icons/side-menu/search.svg')" alt="search">
        <p class="paragraph">Search</p>
      </li>
      <li class="list-item">
        <img class="item-image" :src="require('@/assets/icons/side-menu/plus.svg')" alt="reports">
        <p class="paragraph">Create</p>
      </li>
      <li class="list-item">
        <img class="item-image" :src="require('@/assets/icons/side-menu/bg.svg')" alt="star">
        <p class="paragraph">Language</p>
      </li>
    </ul>
    <ul class="unordered-list">
      <li class="list-item">
        <img class="item-image" :src="require('@/assets/icons/side-menu/logout.svg')" alt="logout">
        <p class="paragraph">Logout</p>
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  name: "SideMenu",
  data() {
    return {}
  },
  methods: {}
}
</script>
