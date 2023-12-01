<template>
<div class="mainC">
<h1> Bienvenido a Solar Home </h1>
<p> Con la calculadora de Solar Home podrás conocer el número de paneles solares, las baterías, el inversor y el resto de información necesaria para poner en marcha la instalación solar en tu Hogar.
Además aquí encontrarás información educativa sobre la energía solar</p>
<img src="@/assets/panelesSolares.jpg" alt="Descripción de la imagen">
<p> Sencillo y en pocos clics, calcularemos los componentes que necesitas para disfrutar de la energía verde, pero para ello necesitamos conocer tus hábitos de consumo.</p>
<img src="@/assets/img2.png" alt="Descripción de la imagen">

<p class="pregunta">¿Qué datos te pedimos?</p>
<ul>
  <li>Consumo mensual de luz.</li>
  <li>Promedio de consumo de los últimos 12 meses.</li>
  <li>El área disponible para la instalación de paneles solares.</li>
</ul>

<p class="pregunta">¿Qué recibirás a cambio?</p>
<ul>
  <li>Estimación del número de paneles solares y la capacidad de inversores y baterías necesarios. </li>
  <li>Información educativa sobre energía solar.</li>
</ul>


<!-- <a href="#" class="button" @click="cambiarComponente('calculadora')"> 
      <span> Calcular</span> 
</a> -->

</div>
</template>
  
<script>
import CompCalculadora from '@/components/compCalculadora.vue';

export default {
  name: 'compHome',
  components: {
    // eslint-disable-next-line
    CompCalculadora,
  },
  data() {
    return {
      componenteActual: 'CompHome', 
    };
  },
  methods: {
    cambiarComponente(componente) {
      if (componente === 'calculadora') {
        this.componenteActual = 'CompCalculadora';
      }
    },
  },
};
</script>

<style scoped> 
.mainC{
  min-height: 100vh;
  margin: 0;
  margin-right: 2vw;
  padding: 0;
}

h1{
  text-align: center;
}

p{
  margin: 15px 0;
  text-align: justify;
  font-size: 20px;
}

.pregunta{
  margin: 15px 0;
  text-align: center;
  font-weight: bold;
}

img{
  width: 300px;
  border-radius: 10px;
  margin: 15px auto;
  display: block;
}

li{
  font-size: 20px;
}

.button{
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

    margin: 2vh auto; 
    display: block; 
    text-align: center;
    max-width: 50%;
}

.button:hover span{ 
  background-color: #F15C31;
  color: #FED420;
}

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

  
.button:active span{ translate: none;}

</style>