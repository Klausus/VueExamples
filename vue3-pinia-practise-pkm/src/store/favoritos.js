import {defineStore} from 'pinia';
import {ref, watch} from 'vue';

export const useFavoritosStore = defineStore('favoritos', () => {
    const favoritos = ref([]);

    const add = (poke) => {
        console.log(poke);
        if( !findPokemonById(poke.id) ) {
            favoritos.value.push(poke);
            saveInlocalStorage();
        }
    };

    const remove = (poke) => {
        removeById(poke.id);
    };

    const removeById = (id) => {
        favoritos.value = favoritos.value.filter( item => item.id !== id );
        saveInlocalStorage();
    };

    const findPokemonByName = (name) => {
        return favoritos.value.find((item) => item.name === name);
    };

    const findPokemonById = (id) => {
        return favoritos.value.find((item) => item.id === id);
    };

    const loadFromLocalStorage = () => {
        if (localStorage.getItem('favoritos')){
            favoritos.value = JSON.parse(localStorage.getItem('favoritos'));
        }
    };

    const saveInlocalStorage = () => {
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value));
    };

    // watch(favoritos, (data) => {
    //     console.log(data);
    //     saveInlocalStorage();
    // });

    loadFromLocalStorage();

    return {
        favoritos,
        add,
        remove,
        removeById,
        findPokemonByName,
        findPokemonById
    };
});