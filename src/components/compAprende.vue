<template>
  <div>
    <h1> Bienvenido a la sección educativa </h1>
    <p>
      Sumérgete en el fascinante mundo de la energía solar a través de nuestra cuidadosamente seleccionada playlist de videos educativos. Estos videos cubren una variedad de temas, desde la tecnología detrás de los paneles solares hasta la importancia de la sostenibilidad energética. ¡Aprender nunca fue tan fácil y entretenido!
    </p>
    <div class="container">
      <div class="video-principal-container">
        <iframe :src="mainVideoSrc" frameborder="0" allowfullscreen class="main-video"></iframe>
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
          <!-- Utilizando la etiqueta iframe para videos de YouTube -->
          <iframe :src="getYouTubeEmbedUrl(video.src)" frameborder="0" allowfullscreen class="lista-videos"></iframe>
          <h3 class="lista-titulos">{{ video.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainVideoSrc: 'https://www.youtube.com/embed/5cVpl1WGmJA?si=1RTyzfUDSYZ6nG0O',
      mainVideoTitle: '¿Cómo funciona un panel solar?',
      videoList: [
        { src: '5cVpl1WGmJA?si=1RTyzfUDSYZ6nG0O', title: '¿Qué es la energía solar?' },
        { src: '5MKOe44upAc?si=m_lDEGzYs4SEDrI3', title: 'La ENERGÍA SOLAR  (Definición, Usos, Ventajas y Desventajas) ' },
        { src: 'k9ghIhZx6aw?si=FxTdIyFeZAelVLtx', title: '¿Cómo funciona un panel solar?' },
        { src: 'jcvcQPYevDA?si=NNagJcdKkjL-rJG_', title: 'ENERGÍA SOLAR: VENTAJAS y DESVENTAJAS ' },
        { src: 'jO8HBDaok5I?si=wgg6MjMuw9LcGn9w', title: 'Conoce Tu Energía - Energía Solar' },
        { src: 'q_Wmdn48jB0?si=HIgVpVSMdE98_WXy', title: '¿Cómo funciona una casa con energía solar?' },
        { src: 'Q3284wEzdB0?si=02QYGV0RxT_Uu8GQ', title: '1 AÑO con PLACAS SOLARES: 12 cosas que he aprendido' },
        { src: 'wmEjU3_0jz4?si=VvkXelXqWV26THtO', title: 'Sistema de paneles solares para el hogar | Cómo funciona?' },
        { src: 'MgLGKmrsBX8?si=FQqEvJaHdm0QIJQ9', title: '¿Cómo funcionan las celdas solares?' }
      ],
      activeVideo: null,
    };
  },
  methods: {
    changeMainVideo(video) {
      // Actualizar el video principal al hacer clic en la lista de reproducción
      this.mainVideoSrc = `https://www.youtube.com/embed/${video.src}`;
      this.mainVideoTitle = video.title;
      this.activeVideo = video;
    },
    getYouTubeEmbedUrl(videoId) {
      // Obtener la URL de incorporación de YouTube para el video dado su ID
      return `https://www.youtube.com/embed/${videoId}`;
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
    height: 400px;
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
    height: 75px;
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