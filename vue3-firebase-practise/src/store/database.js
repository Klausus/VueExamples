import { defineStore } from 'pinia';
import { ref } from 'vue';
import { collection, query, where, doc, getDoc, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore/lite';
import { db } from '../firebaseConfig.js';
import { auth } from '../firebaseConfig';
import { useUserStore } from './user.js';
import { nanoid } from 'nanoid';

export const useDBStore = defineStore('database', () => {

    const userStore = useUserStore();
    const documents = ref([]);
    const loadingDocs = ref(false);

    const getUrls = async () => {
        if (documents && documents.length > 0) { return; }
        else {
            try {
                loadingDocs.value = true;
                documents.value = [];
                const q = query(collection(db, 'urls'), where('user', "==", userStore.userData.uid));
                const querySnapthot = await getDocs(q);
                querySnapthot.forEach( doc => {
                    documents.value.push({ id:doc.id, ...doc.data() });
                });                            
            } catch (error) {
                console.log('Error in getUrls => ', error);
            } finally {
                loadingDocs.value = false;
            }
        }
    };

    const addUrl = async (name) => {
        try {
            loadingDocs.value = true;
            const newDoc = {
                name,
                short: nanoid(6),
                user: userStore.userData.uid
            };
            const docRef = await addDoc(collection(db, 'urls'), newDoc);
            documents.value.push({id:docRef.id, ...newDoc});       
        } catch (error) {
            console.log('Error in addUrl => ', error);
        } finally {
            loadingDocs.value = false;
        }
    };

    const getUrlById = async (id) => {
        try {
            loadingDocs.value = true;
            const docRef = await doc(db, 'urls', id);
            const d = await getDoc(docRef);

            if (!d.exists()) {
                throw new Error("No existe el documento que intentas borrar.");
            } else if (d.data().user !== auth.currentUser.uid) {
                throw new Error("El Documento no pertenece al usuario.");
            }

            return { id:d.id, ...d.data() };
        } catch (error) {
            console.log('Error in getUrlById => ', error);
        } finally {
            loadingDocs.value = false;
        }
    };

    const updateUrlById = async (id, url) => {
        try {
            loadingDocs.value = true;
            const docRef = await doc(db, 'urls', id);
            const d = await getDoc(docRef);

            if (!d.exists()) {
                throw new Error("No existe el documento que intentas borrar.");
            } else if (d.data().user !== auth.currentUser.uid) {
                throw new Error("El Documento no pertenece al usuario.");
            }

            await updateDoc(docRef, {name: url});
            documents.value = documents.value.map(item => item.id !== id ? {...item, name: name} : item);
        } catch (error) {
            console.log('Error in updateUrl => ', error);
        } finally {
            loadingDocs.value = false;
        }
    }

    const deleteUrl = async (id) => {
        try {
            loadingDocs.value = true;
            const docRef = await doc(collection(db, 'urls'), id);
            const d = await getDoc(docRef);

            if (!d.exists()) {
                throw new Error("No existe el documento que intentas borrar.");
            } else if (d.data().user !== auth.currentUser.uid) {
                throw new Error("El Documento no pertenece al usuario.");
            }

            await deleteDoc(docRef);
            documents.value = documents.value.filter(item => item.id !== id);
        } catch (error) {
            console.log('Error in deleteUrl => ', error);
        } finally {
            loadingDocs.value = false;
        }
    }

    return {
        documents,
        loadingDocs,
        getUrls,
        addUrl,
        deleteUrl,
        getUrlById,
        updateUrlById,
    };
});