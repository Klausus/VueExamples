<template>

  <div class="container text-center mt-3">
    <h1>{{ title.toUpperCase() }}</h1>
    <h3>{{ subtitle }}</h3>

    <h2 :class="classCounter">Numero: {{ contador }}</h2> 

    <div class="btn-group">
      <button @click="increment(1)"  class="btn btn-primary"> Incrementar </button>
      <button @click="increment(-1)" class="btn btn-primary"> Decrementar </button>
      <button @click="reset" class="btn btn-primary"> Reset </button>
      <button @click="addToArray(contador)" :disabled="disableButtonAdd" class="btn btn-primary"> Add </button>
    </div>
      
    <div class="container" v-if="arrayNumeros.length > 0">
      <h2>Lista:</h2>
      <ul class="list-group mt-4">
        <li class="list-group-item" v-for="(num, index) in arrayNumeros" :key="index"> {{ num }}</li>
      </ul>
      Array: {{arrayNumeros}}
    </div>
  </div>

  <div class="container text-center fixed-bottom mt-3 md-3"> 
    <b> Fuente: </b>
    <a href="https://www.youtube.com/watch?v=PL-aTHv2L3E&list=PLPl81lqbj-4J-gfAERGDCdOQtVgRhSvIT"> 
      https://www.youtube.com/watch?v=PL-aTHv2L3E&list=PLPl81lqbj-4J-gfAERGDCdOQtVgRhSvIT
    </a>
  </div>

</template>


<style>
  h1 {
    color: red;
  }

  .positiveNumber {
    color: green;
  }

  .negativeNumber {
    color: red;
  }

  .zeroNumber {
    color: black;
  }
</style>


<script setup>
  import {ref} from 'vue';
  import {computed} from 'vue'; 

  const title = "Aprende Los Fundamento de VUEJS3"
  const subtitle = "Añadir Numeros Favoritos a una lista de numeros no repetibles.";
  const contador = ref(0);
  const arrayNumeros = ref([]);

  const increment = (number) => {
    contador.value += number;
  };

  const reset = () => {
    contador.value = 0;
  };

  const addToArray = (num) => {
    if ( !arrayNumeros.value.includes(num) ) {
      arrayNumeros.value.push(num);
    }
  };

  const classCounter = computed(() => {
    if(contador.value > 0)    return 'positiveNumber';
    if(contador.value < 0)    return 'negativeNumber';
    if(contador.value === 0)  return 'zeroNumber';
    return 'zeroNumber';
  });

  const disableButtonAdd = computed(() => {
    if ( arrayNumeros.value.includes(contador.value) ) {
      return true;
    }
    return false;
  });


</script>
