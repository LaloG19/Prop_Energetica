
<template>
  <form @submit="submitForm">
    <div>
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" v-model="nombre" />
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" />
    </div>
    <div>
      <label for="mensaje">Mensaje:</label>
      <textarea id="mensaje" v-model="mensaje"></textarea>
    </div>
    <button type="submit">Enviar</button>
  </form>

  <input type="text" name="" value="asdasd">
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const nombre = ref('');
    const email = ref('');
    const mensaje = ref('');

    const submitForm = () => {
      // Aquí puedes realizar las acciones necesarias al enviar el formulario
      console.log('Formulario enviado');
    };

    return {
      nombre,
      email,
      mensaje,
      submitForm
    };
  }
};
</script>

<style scoped>
/* Estilos específicos del componente */
</style>
