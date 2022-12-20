<script setup>
import { ref } from 'vue';
import { useUserStore } from '../store/user.js';

const email = ref('');
const pass  = ref('');
const userStore = useUserStore();

const handleSubmitLogin = async () => {
    if (!email.value || pass.value.length < 6) {
        console.log('Rellena los campos => \n','email:', email.value, 'pass: ', pass.value);
    } else {
        await userStore.loginUser(email.value, pass.value);
    }
};

</script>

<template>
    <section class="vh-100" style="background-color: #508bfc;">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card shadow-2-strong" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">
    
                            <!-- User Image -->
                            <img src="/userimg.png" width="150" alt="userImage"/>

                            <!-- Text -->
                            <h3 class="mb-5">Login</h3>
    
                            <form @submit.prevent="handleSubmitLogin">
                    
                                <!-- Email input -->
                                <div class="form-outline mb-4">
                                    <input 
                                        type="email" 
                                        id="formEmail" 
                                        placeholder="Ingrese el Email"  
                                        class="form-control form-control-lg" 
                                        v-model.trim="email"
                                    />
                                    <!-- <label class="form-label" for="formEmail">Email</label> -->
                                </div>
                    
                                <!-- Password input -->
                                <div class="form-outline mb-4">
                                    <input 
                                        type="password" 
                                        id="formPass" 
                                        placeholder="Ingrese la Contraseña"
                                        class="form-control form-control-lg" 
                                        v-model.trim="pass" 
                                    />
                                    <!-- <label class="form-label" for="formPass">Password</label> -->
                                </div>
                    
                                <!-- Submit button -->
                                <div class="form-outline mb-4">
                                    <button 
                                        type="submit" 
                                        style="border-radius: 2rem;"
                                        class="btn btn-primary btn-lg btn-block" 
                                        :disabled="userStore.loadingUser">
                                        Login
                                    </button>
                                </div>
    
                                <!-- Separator -->
                                <hr class="my-4"/>
                    
                                <!-- Register buttons -->
                                <div class="text-center">
                                    <p>¿ No Estas Registrado ?</p>
                                    <RouterLink class="btn btn-outline-primary btn-sm" to="/register">
                                        Registrate
                                    </RouterLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
</style>