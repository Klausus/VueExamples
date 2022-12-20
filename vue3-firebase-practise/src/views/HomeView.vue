<script setup>
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from '../firebaseConfig';
import { useUserStore } from '../store/user.js';
import { useDBStore } from '../store/database.js';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const userStore = useUserStore();
const database  = useDBStore();

const url = ref('');

onAuthStateChanged(auth, (user) => {
    // console.log('user:' , user);
});

const handleSubmitAddUrl = () => {
    database.addUrl(url.value);
}

const handleRemoveUrl = (id) => {
    database.deleteUrl(id);
}

database.getUrls();

</script>

<template>
    <div class="container">

        <div class="align-center text-center m-3">
            <img src="/userimg.png" width="150" alt="userImage"/>
            <h1> {{ userStore.userData.email }} </h1>
            <h2> {{ userStore.userData.name  }} </h2>
        </div>
        
        <div class="align-center text-center m-3" v-if="database.loadingDocs">
            <h1> Loading Documents </h1>
            <div class="spinner-border" role="status"></div>
        </div>
        
        <div v-if="!database.loadingDocs">
            <div class="list-group">

                <div class="list-group-item list-group-item-secondary">
                    <form @submit.prevent="handleSubmitAddUrl" class="row g-3">
                        <div class="col-md-10">
                            <label for="inputUrl" class="form-label">Url</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="inputUrl" 
                                placeholder="Ingrese la URL" 
                                v-model.trim="url"
                            />
                        </div>
                        <div class="col-md-2 d-flex align-items-end">
                            <button type="submit" class="btn btn-primary ms-2" :disabled="userStore.loadingUser">
                                Añadir URL
                            </button>
                        </div>
                    </form>
                </div>

                <div class="list-group-item" v-for="doc in database.documents" :key="doc.id">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label :for="`inputEmail${doc.id}`" class="form-label">Id</label>
                            <input type="email" class="form-control" :id="`inputEmail${doc.id}`" :placeholder="doc.id" disabled>
                        </div>
                        <div class="col-md-6">
                            <label :for="`inputPass${doc.id}`" class="form-label">Short Id</label>
                            <input type="password" class="form-control" :id="`inputPass${doc.id}`" :placeholder="doc.short" disabled>
                        </div>
                        <div class="col-md-10">
                            <label :for="`inputUrl${doc.id}`" class="form-label">Url</label>
                            <input type="text" class="form-control" :id="`inputUrl${doc.id}`" :placeholder="doc.name" disabled>
                        </div>
                        <div class="col-md-2 d-flex align-items-end">
                            <button type="button" class="btn btn-outline-secondary ms-2" @click="router.push(`/edit/${doc.id}`)">
                                Editar
                            </button>
                            <button type="button" class="btn btn-outline-danger ms-2" @click="handleRemoveUrl(doc.id)">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
</style>