<script setup>
// PROPS: Parametros Recibidos del padre
const props = defineProps(["ini", "fin", "size"]);

// EMIT: Eventos emitidos hacia el padre
const emit = defineEmits([
    'nextPosts', 
    'previousPosts',
]);
</script>

<template>
    <div class="btn-group" role="group" aria-label="Post Pagination">
        <button 
            @click="emit('previousPosts')" 
            type="button" 
            class="btn btn-outline-primary"
            :disabled="ini <= 0">
            Anterior
        </button>
        <button 
            @click="emit('nextPosts')" 
            type="button" 
            class="btn btn-outline-primary"
            :disabled="fin >= size">
            Siguiente
        </button>
        <div class=""> Mostando: {{ini}}-{{fin}} de {{size}} </div>
    </div>
</template>
