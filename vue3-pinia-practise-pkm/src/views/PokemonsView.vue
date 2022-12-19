<script setup>
// IMPORTS /////////////////////////////////////////////////////////////////////////
import {ref, watch} from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import {GetData} from '@/composables/getData.js';


// VARIABLES ///////////////////////////////////////////////////////////////////////
const apiUrl  = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
const pag       = ref(10);
const pagIndex  = ref(0);
const pokemons = ref([]);
const {data, loading, getData} = GetData();

// METHODS or FUNCTIONS ////////////////////////////////////////////////////////////
const getDataOld = async () => {
    loading.value = true;
    try {
        const {data} = await axios.get(apiUrl);
        pokemons.value = data.results;  
        console.log(pokemons.value);  
    } catch (e) {
        console.log("Error: " + e);        
    } finally {
        loading.value = false;
    }
};

const getPokedexNumer = (pk) => {
    const pokedex = pk.url.replace("https://pokeapi.co/api/v2/pokemon/","").replace("/","");
    return pokedex;
};

const getPokemonFrontSpriteUrl = (pkdexNumber) => {
    const url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pkdexNumber + ".png";
    return url;
};

const getPokemonBackSpriteUrl = (pkdexNumber) => {
    const url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/" + pkdexNumber + ".png";
    return url;
};

const getFilterList = () => {
    const start = pagIndex.value * pag.value;
    const end = start + pag.value;
    return pokemons.value.slice(start,end);
};

const pagNext = () => {
    pagIndex.value++;
};

const pagPrevious = () => {
    pagIndex.value--;
};

const pagSet = (pag) => {
    pagIndex.value = pag;
};

const textCapitalize = text => text.slice(0,1).toUpperCase() + text.slice(1);

// WATCHERS ////////////////////////////////////////////////////////////////////////
watch(data, (currentData) => {
    pokemons.value = currentData.results;
});

// INITIALIZE DATA /////////////////////////////////////////////////////////////////
getData(apiUrl);

</script>

<template>

    <LoadingSpinner v-if="loading" :loadingText="'Cargando...'" />
    <div class="container" v-if="!loading && pokemons!=null">
        <h1 class="text-center"> Pokemons </h1>
    
        <div class="container">
            <div class="list-group justify-content-center text-center">
                <RouterLink v-for="pokemon in getFilterList()" 
                :key="pokemon.name" 
                :to="`/pokemon/${pokemon.name}`"
                class="list-group-item list-group-item-action" >               
                  <img :src="getPokemonFrontSpriteUrl( getPokedexNumer(pokemon) )" width="80"  height="80" alt="" onerror="this.src='/favicon.ico'" />
                  <h5 class="d-inline-block m-4"> {{ textCapitalize(pokemon.name) }} </h5>
                  <img :src="getPokemonBackSpriteUrl(  getPokedexNumer(pokemon) )" width="80"  height="80" alt="" onerror="this.src='/favicon.ico'" />
                </RouterLink>
            </div>
        </div>
    
        <nav aria-label="Pokemon Pagination" class="mt-2">
            <ul class="pagination justify-content-center">
                <li class="page-item m-2" v-show="pagIndex-1 >= 0">
                    <btn class="btn btn-outline-danger" @click="pagPrevious">
                        <span aria-hidden="true">&laquo;</span>
                    </btn>
                </li>
    
                <li class="page-item m-2" v-show="pagIndex-1 >= 0">
                    <btn class="btn btn-outline-danger" @click="pagSet(pagIndex-1)">
                        {{ pagIndex - 1 }}
                    </btn>
                </li>
                <li class="page-item m-2">
                    <btn class="btn btn-danger">
                        {{ pagIndex }}
                    </btn>
                </li>
                <li class="page-item m-2" v-show="(pagIndex+1)*pag < pokemons.length">
                    <btn class="btn btn-outline-danger" @click="pagSet(pagIndex+1)">
                        {{ pagIndex + 1 }}
                    </btn>
                </li>
    
                <li class="page-item m-2" v-show="(pagIndex+1)*pag < pokemons.length">
                    <btn class="btn btn-outline-danger" @click="pagNext">
                        <span aria-hidden="true">&raquo;</span>
                    </btn>
                </li>
            </ul>
        </nav>
    </div>
</template>