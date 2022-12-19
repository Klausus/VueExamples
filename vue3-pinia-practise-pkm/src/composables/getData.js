import axios from 'axios';
import {ref} from 'vue';

export const GetData = () =>{
    const data = ref(null);
    const loading = ref(true);

    const getData = async(url) => {
        loading.value = true;
        try {
            console.log('api-url: ' + url);
            const res = await axios.get(url);
            console.log(res.data);  
            data.value = res.data;  
        } catch (e) {
            console.log("Error: " + e);        
        } finally {
            loading.value = false;
        }
    };

    return {
        data,
        loading,
        getData
    }
}