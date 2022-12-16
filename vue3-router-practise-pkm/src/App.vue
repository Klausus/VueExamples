<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <div class="d-flex" width="30">
        <RouterLink class="navbar-brand" to="/">
          <img src="@/assets/pokeapi.svg"  alt="PokeApi" width="130" height="50" class="d-inline-block align-text-top" />
        </RouterLink>
      </div>
      <div class="d-flex text-center" width="30">
        <img src="@/assets/pokeball.svg" alt="PokeApi" width="50"  height="50" class="d-inline-block align-text-top" />
      </div>
      <div class="d-flex" width="30">
        <RouterLink class="btn btn-outline-danger btn-lg" to="/">Home</RouterLink> &nbsp;
        <RouterLink class="btn btn-outline-danger btn-lg" to="/pokemons">Pokemons</RouterLink> &nbsp;
      </div>
    </div>
  </nav>

  <br/>

  <RouterView />

</template>

<style scoped>
</style>
