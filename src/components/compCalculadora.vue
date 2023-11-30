<!-- SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS -->
<template>
  <form class="frmCalculadora col-md-12" @submit.prevent>
    <h1>Calculadora</h1>
    <input v-model="consumo" type="text" placeholder="Consumo mensual (kWh)" class="frmConsumo">
    <input v-model="horasMax" type="text" placeholder="Horas pico máximas (Hrs)" class="frmHorasMax">
    <input v-model="horasMin" type="text" placeholder="Horas pico mínimas (Hrs)" class="frmHorasMin">

    <button   class="button" @click="calcular"> 
      <span>Calcular</span> 
    </button> 
  </form>
    <div v-show="mostrarResultados" class="modal-custom">
      <h3 class="modal-title"> Resultados </h3>
        <ul class="modal-content mt-4">
          <li> Tu sistema tiene un consumo con margen funcional de {{ consumoMes }} kWh mensuales. </li>
          <li> El sistema se calculó para tener un Voltaje de {{ sysVoltage }} voltios. Y un wattage de {{ sysWatt }} watts. </li>
          <p>  Ahora bien, los componentes seleccionados fueron: </p>
          <li> Se necesita de {{ cantPaneles }} paneles de nombre {{ panIdeal.nombre }}. </li>
          <li> El sistema necesita el inversor {{ invIdeal.nombre }}, el cuál tiene un amperaje de {{ invIdeal.watts }}. </li>
          <li> Se necesitan de {{ cantBat }} baterías de nombre {{ batIdeal.nombre }}. Estás tienen una capacidad de {{ cantBat.amp }} amp.</li>
          <p>  Hablando de precios: </p> 
          <li> El precio de los paneles es de {{ precioPaneles }} MXN. El precio de las baterías es de {{ precioBaterias }} MXN. </li>
          <li> El precio de los inversores es de {{ precioInversores }} MXN. El precio total de tu sistema es de {{ precioTotal }} MXN. </li>
          <li> Esperamos que este presupuesto te sea de utilidad</li>
        </ul>
          <input class="rounded cerrar" type="button" value="CERRAR" @click="cerrarModal">
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let consumo = ref(''), horasMax = ref(''), horasMin = ref(''), mostrarResultados = ref(false), consumoMes = ref(0),
    horasPicoMax = ref(0), horasPicoMin = ref(0), sysVoltage = ref(0), sysWatt = ref(0), panIdeal = ref([]), 
    batIdeal = ref([]), invIdeal = ref([]), cantPaneles = ref(0), cantBat = ref(0), potPicoBanco = ref(0), 
    residuo = ref(0), horaProm = ref(0), potPromBanco = ref, precioPaneles = ref(0), precioBaterias = ref(0), 
    precioInversores = ref(0), precioTotal = ref(0);
    
    let paneles = [
      {
        nombre: "Panel 1: 200 watts",
        watts: 200,
        cantidad: 7,
        precio: 2000,
        cantidadMax: maxWatts
      },
      {
        nombre: "Panel 2: 450 watts",
        watts: 450,
        cantidad: 12,
        precio: 4000,
        cantidadMax: maxWatts
      },
      {
        nombre: "Panel 3: 750 watts",
        watts: 750,
        cantidad: 25,
        precio: 7000,
        cantidadMax: maxWatts
      }
    ];
    let baterias = [
      {
        nombre: "Batería 1: 50 amp",
        amp: 50,
        cantidad: 10,
        precio: 2000,
        cantidadMax: maxAmp
      },
      {
        nombre: "Batería 2: 150 amp",
        amp: 150,
        cantidad: 70,
        precio: 4000,
        cantidadMax: maxAmp
      },
      {
        nombre: "Batería 3: 200 amp",
        amp: 200,
        cantidad: 140,
        precio: 7000,
        cantidadMax: maxAmp
      }
    ];
    let inversores = [
      {
        nombre: "Inversor 1: 3000 watts",
        watts: 3000,
        cantidad: 3,
        precio: 4500
      },
      {
        nombre: "Inversor 2: 7000 watts",
        watts: 7000,
        cantidad: 2,
        precio: 8000
      },
      {
        nombre: "Inversor 3: 12000 watts",
        watts: 12000,
        cantidad: 2,
        precio: 10000
      },
      {
        nombre: "Inversor 4: 30000 watts",
        watts: 30000,
        cantidad: 1,
        precio: 18000
      }
    ];
    function maxWatts() {
      return (this.watts * (this.cantidad + 1));
    }
    function maxAmp() {
      return (this.amp * (this.cantidad + 1));
    }

    const calcular = () => {
      console.log('La función calcular se está ejecutando');

      const consumoNum = parseFloat(consumo.value), horasMaxNum = parseFloat(horasMax.value), horasMinNum = parseFloat(horasMin.value);

      if ( isNaN(consumoNum) || isNaN(horasMaxNum) || isNaN(horasMinNum) || consumoNum <= 0 || horasMaxNum <= 0 || horasMinNum <= 0){
        console.error('Ingrese valores numéricos válidos');
        return;      }

      // Asignar los valores a las variables locales y globales
      consumoMes.value = consumoNum; horasPicoMax.value = horasMaxNum; horasPicoMin.value = horasMinNum;

      //4 Aumento del consumo mensual para tener un margen de error
      consumoMes.value = consumoMes.value * 1.3;

      //5 Calculo del Voltaje del sistema
      if (consumoMes.value <= 1900) {
        sysVoltage.value = 12;
      } else if (consumoMes.value > 1900 && consumoMes.value < 4000) {
        sysVoltage.value = 24;
      } else if (consumoMes.value > 4000 && consumoMes.value < 7000) {
        sysVoltage.value = 48;
      } else {
        console.log('El consumo mensual es: ' + consumoMes.value);
        throw new Error('El sistema es demasiado grande para un hogar, consulta con un especialista');  
      }

      //6 Calculo de la potencia pico del banco
      potPicoBanco.value = consumoMes.value / horasPicoMax.value;

      //7 Calculo de panel ideal
      for (const panel of paneles) {
        if (panel.cantidadMax() > consumoMes.value) {
          panIdeal.value = panel;
          console.log('El panel ideal es: ' + panIdeal.value.nombre);
          break;
        }
      }

      if (panIdeal.value == -1) {
        throw new Error('No hay paneles para tu consumo');
    } else{
        console.log("Se ha completado el calculo para paneles");
    }

      //8 Calculo de la cantidad de paneles
      cantPaneles.value = potPicoBanco.value / panIdeal.value.watts;  
      residuo.value = cantPaneles.value % 2;

      //9 Ajuste de la cantidad de paneles
      if (residuo.value != 0) {
        cantPaneles.value = Math.ceil(cantPaneles.value);
        console.log('La cantidad de paneles es: ' + cantPaneles.value);
      }
      if (panIdeal.value == -1) {
        throw new Error('No hay paneles para tu consumo');
      }

      //10 Calculo del wattage del sistema
      sysWatt.value = cantPaneles.value * panIdeal.value.watts;
      

      //11 Calculo del inversor ideal
      for (const inversor of inversores) {
        console.log('El inversor es: ' + inversor.watts + ' y el consumo es: ' + consumoMes.value);
        if (inversor.watts > consumoMes.value) {
          invIdeal.value = inversor;
          break;
        }
      }
      if (invIdeal.value == -1) {
        throw new Error('No hay inversores para tu consumo');
      }

      //12 Calculo de horas promedio de sol
      horaProm.value = (horasPicoMax.value + horasPicoMin.value) / 2;

      //13 Calculo de la potencia promedio del banco
      potPromBanco.value = consumoMes.value / horaProm.value;

      //14 Calculo de la batería ideal
      for (const bateria of baterias) {
        if (bateria.cantidadMax() > (consumoMes.value * 2)) {
          batIdeal.value = bateria;
          break;
        }
      }
      if (batIdeal.value == -1) {
        throw new Error('No hay baterías para tu consumo');
      }
      
      cantBat.value = ((sysVoltage.value * cantPaneles.value )/ batIdeal.value.amp)*2;
      residuo.value = cantBat.value % 2;

      //9 Ajuste de la cantidad de baterias
      if (residuo.value != 0) {
        cantBat.value = Math.ceil(cantBat.value);
      }
      console.log('La cantidad de baterías es: ' + cantBat.value + ' y el nombre es: ' + batIdeal.value.nombre);

      //15 Calculo del precio de los paneles
      precioPaneles.value = cantPaneles.value * panIdeal.value.precio;

      //16 Calculo del precio de las baterías
      precioBaterias.value = cantBat.value * batIdeal.value.precio;

      //17 Calculo del precio de los inversores
      precioInversores.value = invIdeal.value.precio;

      //18 Calculo del precio total
      precioTotal.value = precioPaneles.value + precioBaterias.value + precioInversores.value;
      
      // Mostrar los resultados solo si el botón de calcular ha sido presionado
      mostrarResultados.value = true;
    };
    const cerrarModal = () => {
      mostrarResultados.value = !mostrarResultados.value;
    };

    return {
      consumo,
      horasMax,
      horasMin,
      mostrarResultados,
      calcular,
      consumoMes,
      sysVoltage,
      sysWatt,
      panIdeal,
      batIdeal,
      invIdeal,
      cantPaneles,
      cantBat,
      precioPaneles,
      precioBaterias,
      precioInversores,
      precioTotal,
      cerrarModal
    };
  },
};
</script>

<style scoped>
.modal-custom {
  position: absolute;
  top: 50%;
  left: 56.6%;
  transform: translate(-50%, -50%);
  z-index: 999;
  width: 77%;
  height: 80%;
  padding: 1.5rem;
  background-color: rgba(33, 37, 41 , 0.90);
  border-radius: 2rem;
  text-align:justify;
}
.modal-content {
  color: #FFFFFF;
  font-weight: bold;
  font-size: 1rem;
  padding: 1rem 4rem;
}
.modal-title{
  background-color: rgba(0, 0, 0, 0.7);
  color: #FFFFFF;
  border-radius: 2rem;
  text-align: center;
  text-transform: uppercase;
}
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

input::placeholder {text-align: center;}
.frmConsumo, .frmHorasMax, .frmHorasMin { 
  flex: 1 0 3rem; min-width: 250px; max-width: 90%; padding: 0 23px; text-align: center; border-radius: 20px;
}
.button{
    margin-top: 15px; 
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
  translate: 0.25rem -0.25rem;
  border: 2px solid #000000;
  transition: translate 100ms
  cubic-bezier(0.175, 0.885 0.32, 1.275),
  background-color 250ms; }
li {
  margin-bottom: 1rem;
  font-size: 0.75rem;
}
ul p {
  text-transform: uppercase;
}

.cerrar{
  background-color: #FED420;
  color: #F15C31;
  font-weight: 600;
}
.cerrar:hover{
  background-color: #F15C31;
  color: #FED420;
}
</style>