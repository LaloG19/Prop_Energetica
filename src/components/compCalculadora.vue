<template>
  
  <form action="/" class="frmCalculadora col-md-12" @submit.prevent="calcular">
    <h1> Calculadora </h1>
    <input v-model="consumoBimestral" type="number" placeholder="Consumo Bimestral (kWh)" class="frmConsumo">
    <input v-model="horasPicoMax" type="number" placeholder="Horas pico máximas (Hrs)" class="frmHorasMax">
    <input v-model="horasPicoMin" type="number" placeholder="Horas pico minímas (Hrs)" class="frmHorasMin">

      <a class="button" @click="calcular"> 
        <span> Calcular</span> 
      </a>
  </form>
</template>
  
<script>

export default {
  data() {
    return {
      consumoBimestral: 0,
      horasPicoMax: 0,
      horasPicoMin: 0,
    };
  },
  methods: {
    calcular() {
      // Aquí puedes acceder a los valores de los campos y llamar a tu script
      const valores = {
        consumoBimestral: this.consumoBimestral,
        horasPicoMax: this.horasPicoMax,
        horasPicoMin: this.horasPicoMin,
      };

      // Llamar a tu script o realizar las operaciones necesarias con los valores
      this.llamarScript(valores);
    },
    llamarScript(valores) {
      // Aquí puedes agregar la lógica para llamar a tu script con los valores
      console.log('Llamando al script con los valores:', valores);
      // Ejemplo: Puedes enviar los valores a una API, realizar cálculos, etc.
    },
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