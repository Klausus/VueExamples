<script setup>
// PROPS: Parametros Recibidos del padre
const props = defineProps({
    id: Number,
    title: String,
    body: {
        type: String,
        default: "Sin Descripcion",
    },
    colorText: {
        type: String,
        default: "primary",
    },
});

// EMIT: Eventos emitidos hacia el padre
const emit = defineEmits([
    'cambiarFav'
]);
</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5 :id="id" class="card-title" :class="`text-${colorText}`"> {{ title }} </h5>
            <p>{{body}}</p>
            <button @click="emit('cambiarFav', title)" class="btn btn-outline-primary">Favorito</button>
        </div>
    </div>
</template>

<style></style>