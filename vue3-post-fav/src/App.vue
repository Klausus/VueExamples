
<script setup>

  // IMPORTS /////////////////////////////////////////////////////////////////////////
  import {onMounted, ref} from "vue";
  import BlogPost from './components/BlogPost.vue';
  import PaginatePost from "./components/PaginatePost.vue";
  import LoadingSpinner from "./components/LoadingSpinner.vue";

  // VARIABLES ///////////////////////////////////////////////////////////////////////
  const posts = ref([]);
  const favorito = ref("");
  const postPagination = 5;
  const postInicio = ref(0);
  const postFin = ref(postPagination);
  const postSize = ref(0);
  const loading = ref (true);

  // METHODS or FUNCTIONS /////////////////////////////////////////////////////////////
  const cambiarFavorito = (title) => {
    favorito.value = title;    
  };

  const getPostsFetchThen = () => {
    fetch ("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res. json())
    .then((data) => {
        posts.value = data;
        postSize.value = data.length;
        loading.value=false;
    });
  };

  const getPostsAsyncAwait = async() => {
    try {
      loading.value=true;
      const res   = await fetch ("https://jsonplaceholder.typicode.com/posts");
      posts.value = await res.json();
      postSize.value = posts.value.length;      
    } catch (error) {
      console.log('Error in getPosts2() => error'); 
    } finally {
      // setTimeout(() => { loading.value=false; }, 2000);
      loading.value=false;
    }
  };

  const nextPosts = () => {
    const pag = (postPagination < 0) ? postPagination * -1 : postPagination;
    const ini = (postInicio.value + pag) >= postSize.value ? postInicio.value : postInicio.value + pag;
    const fin = (ini + pag) > postSize.value ? postSize.value : ini + pag;
    postInicio.value = ini;
    postFin.value    = fin;
    console.log('postInicio: ' + postInicio.value + ' - postFin: ' + postFin.value + ' - postPagination: ' + pag);
  };

  const previousPosts = () => {
    const pag = postPagination < 0 ? postPagination * -1 : postPagination;
    const ini = (postInicio.value - pag) < 0 ? 0 : postInicio.value - pag;
    const fin = (ini + pag) > postSize.value ? postSize.value : ini + pag;
    postInicio.value = ini;
    postFin.value    = fin;
    console.log('postInicio: ' + postInicio.value + ' - postFin: ' + postFin.value + ' - postPagination: ' + pag);
  };

  // INITIALIZE DATA: BEFORE MOUNTED TEMPLATE /////////////////////////////////////////
  // getPostsFetchThen();
     getPostsAsyncAwait();

  // INITIALIZE DATA: AFTER MOUNTED TEMPLATE //////////////////////////////////////////
  onMounted( async() => {
    // getPostsFetchThen();
    // await getPostsAsyncAwait();
  });

</script>

<template>
  <LoadingSpinner v-if="loading" :loadingText="'Cargando...'" />
  
  <div class="container" v-if="!loading">
    <h2> Mi Post Favorito: {{favorito}}</h2>

    <PaginatePost 
      @previousPosts="previousPosts" 
      @nextPosts="nextPosts"
      :ini="postInicio"
      :fin="postFin"
      :size="postSize"
      class="mb-2"
    />

    <BlogPost v-for="post in posts.slice(postInicio, postFin)" 
      :key="post.id" 
      :id=post.id 
      :title="post.title" 
      :body="post.body" 
      :colorText="post.colorText"
      @cambiarFav="cambiarFavorito"
      class="mb-2"
      />
  </div>
</template>

<style scoped>
</style>
