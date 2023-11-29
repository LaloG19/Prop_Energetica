<template>
  <form action="/" class="frmCalculadora col-md-12" @submit.prevent="calcular">
    <h1>Calculadora</h1>
    <input v-model="consumo" type="number" placeholder="Consumo mensual (kWh)" class="frmConsumo">
    <input v-model="horasMax" type="number" placeholder="Horas pico máximas (Hrs)" class="frmHorasMax">
    <input v-model="horasMin" type="number" placeholder="Horas pico mínimas (Hrs)" class="frmHorasMin">

    <button type="submit" class="button"> 
      <span>Calcular</span> 
    </button>
  </form>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    // Crear referencias reactivas
    const consumo = ref('');
    const horasMax = ref('');
    const horasMin = ref('');

    // Función para manejar el evento de submit
    const calcular = () => {
      // Acceder a los valores de los inputs
      console.log('Consumo:', consumo.value);
      console.log('Horas pico máximas:', horasMax.value);
      console.log('Horas pico mínimas:', horasMin.value);

      // Aquí puedes realizar cualquier lógica de cálculo que necesites
    };

    // Devolver los datos y métodos que necesitas en el template
    return {
      consumo,
      horasMax,
      horasMin,
      calcular,
    };
  },
};
</script>


<style scoped>

h1{
  font-size: 5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3%;
  color: #FFFFFF;
}
.frmCalculadora{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem; 
  margin-top: 20vh;
  margin-bottom: auto;

}

  
  /* Formulario - Contenido*/
input::placeholder {text-align: center;}
.frmConsumo, .frmHorasMax, .frmHorasMin { 
  flex: 1 0 3rem; min-width: 250px; max-width: 90%; padding: 0 23px; text-align: center; border-radius: 20px;
}

  /* Boton */
.button{
    margin-top: 15px; /* Eliminar al terminar el margen */
    display: inline-block;
    text-decoration: none;
    color: #000000;
    background-color:  rgb(134, 134, 0);
    border-radius: 0.25rem;
    flex: 1 0 3rem; 
    color: #F15C31;
    text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000;
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: uppercase;
}
.button:hover span{ 
  background-color: #F15C31;
  color: #FED420;
}

.button:active span{ translate: none;}
.button span{
  display: inherit;
  border-radius: inherit;
  background-color: #FED420;
  padding: 1rem 3rem;
  translate: 0.25rem -00.25rem;
  border: 2px solid #000000;
  transition: translate 100ms
  cubic-bezier(0.175, 0.885 0.32, 1.275),
  background-color 250ms; }
  /* Boton */
/* Formulario - Contenido*/
</style>