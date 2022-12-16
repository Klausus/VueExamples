<script setup>
// IMPORTS /////////////////////////////////////////////////////////////////////////
import {ref} from 'vue';
import axios from 'axios';
import { useRoute, useRouter  } from 'vue-router';
import LoadingSpinner from '../components/LoadingSpinner.vue';

// VARIABLES ///////////////////////////////////////////////////////////////////////
const route  = useRoute();
const router = useRouter();
const pokemon  = ref({});
const pokeData = ref({});
const loading  = ref(true);

// METHODS or FUNCTIONS ////////////////////////////////////////////////////////////
const getPkmData = async (pokeName) => {
    try {
        const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon/' + pokeName);
        pokemon.value = data;
        formatPokeData(data);
        console.log(pokemon.value);
        console.log(pokeData.value);
    } catch (e) {
        console.log("Error getPkmData(): " + e);
        pokeData.value = {};
        loading.value  = false;  
    }
};

const formatPokeData = (pk) => {
    loading.value = true;
    pokeData.value = {
        id: pk.id,
        name: pk.name,
        sprites: [{
            id: "default",
            sprite: pk.sprites!==null && pk.sprites.front_default !==null ? pk.sprites.front_default : '',
            sex: "male",
            shiny: false,
        },{
            id: "female",
            sprite: pk.sprites!==null && pk.sprites.front_female  !==null ? pk.sprites.front_female : '',
            sex: "female",
            shiny: false,   
        },{
            id:"shiny",
            sprite: pk.sprites!==null && pk.sprites.front_shiny   !==null ? pk.sprites.front_shiny : '',
            sex:"male",
            shiny: true,    
        },{
            id:"shiny_female",
            sprite: pk.sprites!==null && pk.sprites.front_shiny_female !==null ? pk.sprites.front_shiny_female : '',
            sex:"female",
            shiny: true,     
        }],
    };
    loading.value = false;
};

const backToPokemonsRoute = () => {
    router.push('/pokemons');
}

const textCapitalize = text => text.slice(0,1).toUpperCase() + text.slice(1);

// INITIALIZE DATA /////////////////////////////////////////////////////////////////
getPkmData( route.params.name );
</script>

<template>

    <LoadingSpinner :loadingText="Cargando" v-if="loading"/>

    <div clas="container" v-if="!loading">

        <div clas="container" v-if="pokeData.id==null">
            <h1 class="text-center"> Pokemon no encontrado </h1>
        </div>

        <div clas="container" v-if="pokeData.id!=null">
            <div class="card">
                <div class="card-header text-center">
                    <h1> {{ pokeData.name.toUpperCase() }} </h1>
                    <h5> Pokedex: {{ pokeData.id }}</h5>
                </div>
                <div class="card-body row clearfix justify-content-center text-center">
                    <div v-for="sprite in pokeData.sprites.filter(pk => pk.sprite !== '')" class="card item col-lg-3 col-md-3 col-sm-6">
                        <div class="card-body sprite">
                            <img :src="sprite.sprite" :alt="sprite.type" class="img-fluid mx-auto rounded" />
                        </div>
                        <div class="card-footer detail">
                            <h5>
                                {{ sprite.shiny ? 'Shiny' : 'Normal' }}
                                <ion-icon name="star-outline" v-if="sprite.shiny"></ion-icon>
                                <ion-icon name="male"   v-if="sprite.sex === 'male'" ></ion-icon>
                                <ion-icon name="female" v-if="sprite.sex === 'female'"></ion-icon>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
        
        <div class="justify-content-center text-center">
            <button class="btn btn-outline-danger btn-lg mt-2" @click="backToPokemonsRoute">
                Volver a la Lista de Pokemons
            </button>
        </div>

    </div>


</template>

<style scoped>
.item {}

.detail {
    text-align: center;
    vertical-align: middle;
    font-size: 16px;
    color: #444;
}

.sprite {
    text-align: center;
    align-items: center;
    vertical-align: middle;
    width: 100%;
    height: auto;
}

.sprite img{
    position: relative;
    margin: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 30%;
    height: auto;
    transition: all 0.2s ease-in-out;   
}

.sprite:hover img{
    width: 28%;
    height: auto;
    transition: all 0.2s ease-in-out;
    filter: brightness(110%);
}
</style>