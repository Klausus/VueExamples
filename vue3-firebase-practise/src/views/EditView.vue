<script setup>
import { async } from '@firebase/util';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDBStore } from '../store/database.js';
import { useUserStore } from '../store/user.js';


const route = useRoute(); 
const router = useRouter();
const database = useDBStore();
const userStore = useUserStore();
const url   = ref('');  
const id    = ref('');
const short = ref('');

const handleSubmitEdit = async() =>  {
    await database.updateUrlById(route.params.id, url.value);
    router.push('/');
}

onMounted(async() => {
    const doc = await database.getUrlById(route.params.id);
    id.value  = doc.id || route.params.id;
    short.value = doc.short;
    url.value = doc.name;
});
</script>


<template>
    <div class="container">

        <div class="align-center text-center m-3">
            <img src="/userimg.png" width="150" alt="userImage"/>
            <h1> {{ userStore.userData.email }} </h1>
            <h2> {{ userStore.userData.name  }} </h2>
        </div>

        <div class="list-group">
            <div class="list-group-item list-group-item-secondary">
                <form class="row g-3" @submit.prevent="handleSubmitEdit">
                    <div class="col-md-6">
                        <label :for="`inputId`" class="form-label">Id</label>
                        <input type="email" class="form-control" :id="`inputId`" :placeholder="id" disabled />
                    </div>
                    <div class="col-md-6">
                        <label :for="`inputShort`" class="form-label">Short Id</label>
                        <input type="password" class="form-control" :id="`inputShort`" :placeholder="short" disabled />
                    </div>
                    <div class="col-md-10">
                        <label :for="`inputUrl`" class="form-label">Url</label>
                        <input type="text" class="form-control" :id="`inputUrl`" placeholder="Ingrese la Url" v-model.trim="url"/>
                    </div>
                    <div class="col-md-2 d-flex align-items-end">
                        <button type="submit" class="btn btn-outline-secondary ms-2" :disabled="database.loadingDocs">
                            Editar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<style scoped>
</style>