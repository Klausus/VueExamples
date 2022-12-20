<script setup>
import { RouterView, RouterLink } from 'vue-router';
import { useUserStore } from './store/user.js';
const userStore = useUserStore();
</script>

<template>

  <nav class="navbar navbar-dark bg-dark d-flex justify-content-end">
    <div class="me-2" v-if="!userStore.loadingUserSession">
      <RouterLink class="btn btn-primary me-2" to="/" v-show="userStore.userData.uid">
        Home
      </RouterLink> 
      <RouterLink class="btn btn-primary me-2" to="/login" v-show="!userStore.userData.uid">
        Login
      </RouterLink> 
      <RouterLink class="btn btn-primary me-2" to="/register" v-show="!userStore.userData.uid">
        Register
      </RouterLink> 
      <button class="btn btn-primary me-2" @click="userStore.logoutUser" v-show="userStore.userData.uid"> 
        LogOut 
      </button>
    </div>
  </nav>

  <RouterView></RouterView>

</template>

<style lang="scss" scoped>

</style>