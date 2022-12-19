<script setup>
// import {ref} from 'vue';
import { storeToRefs } from 'pinia';
import { useFavoritosStore } from '@/store/favoritos';
import { RouterLink } from 'vue-router';

const useFavoritos = useFavoritosStore();
const {favoritos} = storeToRefs(useFavoritos);
const {removeById} = useFavoritos;

const textCapitalize = text => text.slice(0,1).toUpperCase() + text.slice(1);

</script>

<template>
    <h1 class="text-center">Favoritos</h1>
    <p  class="text-center" v-if="favoritos.length === 0">Sin Favoritos</p>
    <div class="container" v-if="favoritos.length > 0">
        <ul class="list-group justify-content-center text-center" v-for="poke in favoritos" :key="poke.id">
            <li class="list-group-item">
                <div>
                    <h4> {{ textCapitalize(poke.name) }} </h4>
                </div>
                <div>
                    <img :src="poke.sprites[0].sprite" width="100"  height="100" alt="" onerror="this.src='/favicon.ico'" />
                </div>
                <div>
                    <RouterLink 
                        class="btn btn-sm btn-primary me-2"
                        :to="`/pokemon/${poke.name}`" >
                        Ver Detalle
                    </RouterLink>
                    <button 
                        class="btn btn-sm btn-danger  me-2" 
                        @click="removeById(poke.id)">
                        Eliminar
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>
