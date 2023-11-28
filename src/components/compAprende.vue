<template>
    <div>
      <h1>{{ mensaje }}</h1>
    </div>
  </template>
  
<script>
    import { ref } from 'vue';

    export default {
    setup() {
        const mensaje = ref('Hola desde mi componente con Composition API: Aprende');

        return {
        mensaje,
        };
    },
    };
</script>

<style>
</style>