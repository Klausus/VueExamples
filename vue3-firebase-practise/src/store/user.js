import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { async } from '@firebase/util';
import { useDBStore } from './database.js'

export const useUserStore = defineStore('userStore', () => {

    const router = useRouter();
    const userData = ref({});
    const loadingUser = ref(false);
    const loadingUserSession = ref(false);

    const registerUser = async(email, password) => {
        try {
            loadingUser.value = true;
            const {user} = await createUserWithEmailAndPassword(auth, email, password);
            storeUserData(
                user.email, 
                user.displayName, 
                user.uid, 
                user.accessToken, 
                user.reloadUserInfo.passwordHash,
                user.reloadUserInfo.lastLoginAt
            );
            router.push('/');
        } catch (error) {
            console.log('Error in registerUser => ', error);
        } finally {
            loadingUser.value = false;
        }
    };

    const loginUser = async(email, password) => {
        try {
            loadingUser.value = true;
            const {user} = await signInWithEmailAndPassword(auth, email, password);
            storeUserData(
                user.email, 
                user.displayName, 
                user.uid, 
                user.accessToken, 
                user.reloadUserInfo.passwordHash,
                user.reloadUserInfo.lastLoginAt
            );
            router.push('/');
        } catch (error) {
            console.log('Error in loginUser => ', error);
        } finally {
            loadingUser.value = false;
        }
    };

    const logoutUser = async() => {
        if (auth!=null && auth.currentUser!=null){
            try {
                loadingUser.value = true;
                await signOut(auth);
                resetUserData();
                router.push('/login');                
            } catch (error) {
                console.log('Error in logoutUser => ', error);
            } finally {
                loadingUser.value = false;
            }
        } else {
            console.log('logoutUser => Not exists currentUser in auth ', auth);
        }
    };

    const currentUser = () => {
        return new Promise((resolve, reject) => {
            const unsuscribe = onAuthStateChanged(
                auth,
                (user) => {
                    if (user) {
                        storeUserData(
                            user.email, 
                            user.displayName, 
                            user.uid, 
                            user.accessToken, 
                            user.reloadUserInfo.passwordHash,
                            user.reloadUserInfo.lastLoginAt
                        );
                    } else {
                        resetUserData();
                    }
                    resolve (user);
                },
                (e) => reject(e)
            );
            unsuscribe();
        });
    };  

    const loadFromLocalStorage = () => {
        if (localStorage.getItem('userData')){
            userData.value = JSON.parse(localStorage.getItem('userData'));
        } else {
            resetUserData();
        }
    };
    
    const saveInlocalStorage = () => {
        localStorage.setItem('userData', JSON.stringify(userData.value));
    };
    
    const resetUserData = () => {
        const database = useDBStore();
        storeUserData('','','','','','');
        database.$reset();
    };

    const storeUserData = (email, name, uid, accessToken, passwordHash, lastLoginAt ) => {
        userData.value = {
            email,
            name,
            uid,
            accessToken,
            passwordHash,
            lastLoginAt
        };
        saveInlocalStorage();
    }

    loadFromLocalStorage();

    return {
        userData,
        loadingUser,
        registerUser,
        loginUser,
        loadingUserSession,
        logoutUser,
        currentUser,
        storeUserData,
    };
});
