<script setup>
    // PROPS: Parametros Recibidos del padre
    const props = defineProps({
        loadingText: {
            type: String,
            default: ""
        }, 
        show: {
            type: Boolean,
            default: true,
        },
    });
</script>

<template>
    <div class="container" v-if="show">
        <div class="d-flex flex-column align-items-center justify-content-center">
            <div class="spinner-border text-primary" role="status"></div>
            <p class="text-center mt2 mb2"> {{loadingText}} </p>
        </div>
    </div>
</template>