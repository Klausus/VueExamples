import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/pokemons',
      name: 'pokemons',
      component: () => import('../views/PokemonsView.vue')
    },
    {
      path: '/pokemon/:name',
      name: 'pokemon',
      component: () => import('../views/PokemonView.vue')
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFoundView.vue"),
  },
  ]
})

export default router
