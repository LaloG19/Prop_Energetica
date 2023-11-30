<template>
  <div id="app" class="d-flex">
    <!-- Barra lateral -->
    <div class="sideNav col-2 bg-dark text-white d-flex flex-column align-items-center">
      <div class="tabs">
        <img src="../public/logo.svg" alt="logo" class="logoMain">
        <p class="eslogan"> Potenciando tu hogar con energía solar inteligente... </p>
        <div class="tab" @click="cambiarComponente('home')">Home</div>
        <div class="tab" @click="cambiarComponente('calculadora')">Calculadora</div>
        <div class="tab" @click="cambiarComponente('aprende')">Aprende</div>
      </div>
    </div>
    <!-- Barra lateral -->

    <!-- Contenido principal -->
    <div class="col-10 mainC">
      <!-- Mostrar el componente actual -->
      <component :is="componenteActual" />
    </div>
  </div>
</template>

<script>
import CompHome from '@/components/compHome.vue';
import CompCalculadora from '@/components/compCalculadora.vue';
import CompAprende from '@/components/compAprende.vue';

export default {
  name: 'App',
  components: {
    CompHome,
    CompCalculadora,
    CompAprende,
  },
  data() {
    return {
      componenteActual: 'compHome', 
    };
  },
  methods: {
    cambiarComponente(componente) {
      switch (componente) {
        case 'home':
          this.componenteActual = 'CompHome';
          break;
        case 'calculadora':
          this.componenteActual = 'CompCalculadora';
          break;
        case 'aprende':
          this.componenteActual = 'CompAprende';
          break;
        default:
          this.componenteActual = 'CompHome'; 
      }
    },
  },
};
</script>

<style>

.sideNav {
  height: 100vh;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    min-width: 125px;
  }
}
body {
  background-color: #FED420;
}
.tabs {
  width: 80%;
  margin: auto;
}
.logoMain {
  width: 100%;
  margin: 10% auto;
}
.eslogan {
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  margin: 10% auto;
  font-style: italic;
  color: #f2f2f2ec;
}
.tab {
  text-transform: uppercase;
  text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000;
  border-radius: 20px;
  text-align: center;
  background-color: #FED420;
  color: #F15C31;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  margin: 10% auto;

/*   @media screen and (max-width: 768px) {
    font-size: 0.5rem;
  } */
}
.tab:hover {
  background-color: #F15C31;
  color: #FED420;
  text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000;
}

.mainC{
  padding-left: 3rem;
  padding-top: 3rem;
}
</style>
<!-- FFA000 y FFFFFF -->