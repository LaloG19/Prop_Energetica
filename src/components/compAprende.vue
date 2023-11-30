<template>
  <h1> Bienvenido a la sección educativa </h1>
  <p> Sumérgete en el fascinante mundo de la energía solar a través de nuestra cuidadosamente seleccionada playlist de videos educativos. Estos videos cubren una variedad de temas, desde la tecnología detrás de los paneles solares hasta la importancia de la sostenibilidad energética. ¡Aprender nunca fue tan fácil y entretenido!</p>
  <div class="container">
    <div class="video-principal-container">
      <video :src="mainVideoSrc" loop controls class="main-video"></video>
      <h3 class="titulo-video-principal">{{ mainVideoTitle }}</h3>
    </div>

    <div class="playlist-container">
      <div
        v-for="(video, index) in videoList"
        :key="index"
        @click="changeMainVideo(video)"
        :class="{ 'lista active': video === activeVideo }"
        class="lista"
      >
        <video :src="video.src" class="lista-videos"></video>
        <h3 class="lista-titulos">{{ video.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainVideoSrc: '/images/vid-1.mp4',
      mainVideoTitle: ' ¿Cómo funciona un panel solar? ',
      videoList: [
        { src: '/images/vid-1.mp4', title: ' ¿Cómo funciona un panel solar? ' },
        { src: '/images/vid-2.mp4', title: ' ¿Cómo funciona una casa con energía solar? ' },
        { src: '/images/vid-3.mp4', title: ' ¿Cómo funcionan las celdas solares? ' },
        { src: '/images/vid-4.mp4', title: ' ¿Qué es la energía solar? ' },
        { src: '/images/vid-5.mp4', title: ' 1 AÑO con PLACAS SOLARES: 12 cosas que he aprendido ' },
        { src: '/images/vid-6.mp4', title: ' Conoce Tu Energía - Energía Solar ' },
        { src: '/images/vid-7.mp4', title: ' La ENERGÍA SOLAR ☀️ (Definición, Usos, Ventajas y Desventajas) ' },
        { src: '/images/vid-8.mp4', title: ' La ENERGÍA SOLAR explicada: VENTAJAS y DESVENTAJAS ' },
        { src: '/images/vid-9.mp4', title: ' Sistema de paneles solares para el hogar | Cómo funciona? ' },

      ],
      activeVideo: null,
    };
  },
  methods: {
    changeMainVideo(video) {
      this.mainVideoSrc = video.src;
      this.mainVideoTitle = video.title;
      this.activeVideo = video;
    },
  },
};
</script>

<style>
  .container{
    max-width: 1200px;
    margin:100px auto;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap:20px;
  }

  .container .video-principal-container{
    flex:1 1 700px;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0,0,0,.1);
    background-color: #fff;
    padding:15px;
  }

  .container .video-principal-container .main-video{
    margin-bottom: 7px;
    border-radius: 5px;
    width: 100%;
  }

  .container .video-principal-container .titulo-video-principal{
    font-size: 20px;
    color:#444;
  }

  .container .playlist-container{
    flex:1 1 350px;
    height: 485px;
    overflow-y: scroll;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0,0,0,.1);
    background-color: #fff;
    padding:15px;
  }

  .container .playlist-container::-webkit-scrollbar{
    width: 10px;
  }

  .container .playlist-container::-webkit-scrollbar-track{
    background-color: #fff;
    border-radius: 5px;
  }

  .container .playlist-container::-webkit-scrollbar-thumb{
    background-color: #444;
    border-radius: 5px;
  }

  .container .playlist-container .lista{
    display: flex;
    align-items: center;
    gap:15px;
    padding:10px;
    background-color: #eee;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .container .playlist-container .lista:last-child{
    margin-bottom: 0;
  }

  .container .playlist-container .lista.active{
    background-color: #444;
  }

  .container .playlist-container .lista.active .lista-titulos{
    color:#fff;
  }

  .container .playlist-container .lista .lista-videos{
    width: 100px;
    border-radius: 5px;
  }

  .container .playlist-container .lista .lista-titulos{
    font-size: 17px;
    color:#444;
  }

  @media (max-width:1200px){

    .container{
        margin:0;
    }

  }

  @media (max-width:450px){

    .container .video-principal-container .titulo-video-principal{
        font-size: 15px;
        text-align: center;
    }

    .container .playlist-container .lista{
        flex-flow: column;
        gap:10px;
    }

    .container .playlist-container .lista .lista-videos{
        width: 100%;
    }

    .container .playlist-container .lista .lista-titulos{
        font-size: 15px;
        text-align: center;
    }

  }
</style>