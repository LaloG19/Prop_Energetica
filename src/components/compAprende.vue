<template>
  <div>
    <h1>Bienvenido a la sección educativa</h1>
    <p>
      Sumérgete en el fascinante mundo de la energía solar a través de nuestra
      cuidadosamente seleccionada playlist de videos educativos. Estos videos
      cubren una variedad de temas, desde la tecnología detrás de los paneles
      solares hasta la importancia de la sostenibilidad energética. ¡Aprender
      nunca fue tan fácil y entretenido!
    </p>
    <div class="container">
      <div class="video-principal-container">
        <iframe
          :src="mainVideoSrc"
          frameborder="0"
          allowfullscreen
          class="main-video"
        ></iframe>
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
          <iframe
            :src="getYouTubeEmbedUrl(video.src)"
            frameborder="0"
            allowfullscreen
            class="lista-videos"
          ></iframe>
          <h3 class="lista-titulos">{{ video.title }}</h3>
        </div>
      </div>
    </div>
  </div>

  <!-- Cards -->
  <div class="container mt-5">
    <div class="row">
      <center><h3>Documentos</h3></center>
      <p>
        En nuestro compromiso constante con la educación y la conciencia sobre
        la energía solar, hemos reunido una colección de documentos educativos
        que te brindarán información detallada y perspicaz sobre diversos
        aspectos de la energía solar y su implementación en el hogar. Estos
        documentos actúan como valiosos recursos complementarios a los videos
        educativos, proporcionándote una visión más profunda y técnica de los
        conceptos clave.
      </p>
      <!-- Card 1 -->
      <div class="col-md-3">
        <div class="card m-2">
          <img
            :src="require('@/assets/images/card1.png')"
            class="card-img-top"
            alt="Placeholder Image"
          />
          <div class="card-body">
            <h5 class="card-title">Qué es la energía solar</h5>
            <p class="card-text">
              En este artículo se habla sobre qué es la energía solar, asi como
              sobre sus ventajas y desventajas.
            </p>
            <a
              href="https://www.ecologiaverde.com/que-es-la-energia-solar-3567.html"
              class="btn btn-primary"
              >Ver más</a
            >
          </div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="col-md-3">
        <div class="card m-2">
          <img
            :src="require('@/assets/images/card2.jpg')"
            class="card-img-top"
            alt="Placeholder Image"
          />
          <div class="card-body">
            <h5 class="card-title">Beneficios de la energia solar</h5>
            <p class="card-text">
              ¡Descubre el poder del sol y sus impactantes beneficios!
            </p>
            <a
              href="https://www.acciona.com/es/energias-renovables/energia-solar/?_adin=01833301559"
              class="btn btn-primary"
              >Ver más</a
            >
          </div>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="col-md-3">
        <div class="card m-2">
          <img
            :src="require('@/assets/images/card3.png')"
            class="card-img-top"
            alt="Placeholder Image"
          />
          <div class="card-body">
            <h5 class="card-title">
              La energía solar y el calentamiento global.
            </h5>
            <p class="card-text">
              Conoce la opinión de los especialistas y cuáles son los desafíos
              en este articulo de National Geographic.
            </p>
            <a
              href="https://www.nationalgeographicla.com/medio-ambiente/2022/04/la-energia-solar-y-su-potencial-para-ayudar-a-reducir-el-calentamiento-global"
              class="btn btn-primary"
              >Ver más</a
            >
          </div>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="col-md-3">
        <div class="card m-2">
          <img
            :src="require('@/assets/images/card4.png')"
            class="card-img-top"
            alt="Placeholder Image"
          />
          <div class="card-body">
            <h5 class="card-title">Tipos de paneles solares</h5>
            <p class="card-text">
              En este articulo encontrarás los distintos tipos de paneles
              solares y sus especificaciones.
            </p>
            <a
              href="https://solar-energia.net/que-es-energia-solar/panel-solar"
              class="btn btn-primary"
              >Ver más</a
            >
          </div>
        </div>
      </div>

      <!-- Card 5 -->
      <div class="col-md-3">
        <div class="card m-2">
          <img
            :src="require('@/assets/images/card5.png')"
            class="card-img-top"
            alt="Placeholder Image"
          />
          <div class="card-body">
            <h5 class="card-title">¿Qué son las energías renovables?</h5>
            <p class="card-text">
              Las energías renovables son un tipo de energías derivadas de
              fuentes naturales que llegan a reponerse más rápido de lo que
              pueden consumirse.
            </p>
            <a
              href="https://www.un.org/es/climatechange/what-is-renewable-energy"
              class="btn btn-primary"
              >Ver más</a
            >
          </div>
        </div>
      </div>

      <!-- Card 6 -->
      <div class="col-md-3">
        <div class="card m-2">
          <img
            :src="require('@/assets/images/card6.png')"
            class="card-img-top"
            alt="Placeholder Image"
          />
          <div class="card-body">
            <h5 class="card-title">Lobueno y lo malo de la energia solar</h5>
            <p class="card-text">
              En este articulo encontrarás todas las ventajas y desventajas del
              uso de la energia solar.
            </p>
            <a
              href="https://www.diferenciador.com/energia-solar-ventajas-y-desventajas/"
              class="btn btn-primary"
              >Ver más</a
            >
          </div>
        </div>
      </div>

      <!-- Card 7 -->
      <div class="col-md-3">
        <div class="card m-2">
          <img
            :src="require('@/assets/images/card7.png')"
            class="card-img-top"
            alt="Placeholder Image"
          />
          <div class="card-body">
            <h5 class="card-title">
              La verdad sobre el costo de la energia solar
            </h5>
            <p class="card-text">
              ¿Es La Energía Solar Cara O Barata? Descubre La Verdad Aquí.
            </p>
            <a
              href="https://energiasinlimite.bio/la-energia-solar-es-cara-o-barata/"
              class="btn btn-primary"
              >Ver más</a
            >
          </div>
        </div>
      </div>

      <!-- Card 8 -->
      <div class="col-md-3">
        <div class="card m-2">
          <img
            :src="require('@/assets/images/card8.png')"
            class="card-img-top"
            alt="Placeholder Image"
          />
          <div class="card-body">
            <h5 class="card-title">
              Paneles solares para casa: la guía completa
            </h5>
            <p class="card-text">
              Guía completa con todo lo que debes saber sobre los paneles
              solares para casa antes de instalarlos.
            </p>
            <a
              href="https://suncore.com.mx/paneles-solares/paneles-solares-para-casa-la-guia-completa-2022-mexico/"
              class="btn btn-primary"
              >Ver más</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainVideoSrc:
        "https://www.youtube.com/embed/5cVpl1WGmJA?si=1RTyzfUDSYZ6nG0O",
      mainVideoTitle: "¿Cómo funciona un panel solar?",
      videoList: [
        {
          src: "5cVpl1WGmJA?si=1RTyzfUDSYZ6nG0O",
          title: "¿Qué es la energía solar?",
        },
        {
          src: "5MKOe44upAc?si=m_lDEGzYs4SEDrI3",
          title:
            "La ENERGÍA SOLAR  (Definición, Usos, Ventajas y Desventajas) ",
        },
        {
          src: "k9ghIhZx6aw?si=FxTdIyFeZAelVLtx",
          title: "¿Cómo funciona un panel solar?",
        },
        {
          src: "jcvcQPYevDA?si=NNagJcdKkjL-rJG_",
          title: "ENERGÍA SOLAR: VENTAJAS y DESVENTAJAS ",
        },
        {
          src: "jO8HBDaok5I?si=wgg6MjMuw9LcGn9w",
          title: "Conoce Tu Energía - Energía Solar",
        },
        {
          src: "q_Wmdn48jB0?si=HIgVpVSMdE98_WXy",
          title: "¿Cómo funciona una casa con energía solar?",
        },
        {
          src: "Q3284wEzdB0?si=02QYGV0RxT_Uu8GQ",
          title: "1 AÑO con PLACAS SOLARES: 12 cosas que he aprendido",
        },
        {
          src: "wmEjU3_0jz4?si=VvkXelXqWV26THtO",
          title: "Sistema de paneles solares para el hogar | Cómo funciona?",
        },
        {
          src: "MgLGKmrsBX8?si=FQqEvJaHdm0QIJQ9",
          title: "¿Cómo funcionan las celdas solares?",
        },
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
.container {
  max-width: 1200px;
  margin: 100px auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 20px;
}

.container .video-principal-container {
  flex: 1 1 700px;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 15px;
}

.container .video-principal-container .main-video {
  margin-bottom: 7px;
  border-radius: 5px;
  width: 100%;
  height: 400px;
}

.container .video-principal-container .titulo-video-principal {
  font-size: 20px;
  color: #444;
}

.container .playlist-container {
  flex: 1 1 350px;
  height: 485px;
  overflow-y: scroll;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 15px;
}

.container .playlist-container::-webkit-scrollbar {
  width: 10px;
}

.container .playlist-container::-webkit-scrollbar-track {
  background-color: #fff;
  border-radius: 5px;
}

.container .playlist-container::-webkit-scrollbar-thumb {
  background-color: #444;
  border-radius: 5px;
}

.container .playlist-container .lista {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  background-color: #eee;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 10px;
}

.container .playlist-container .lista:last-child {
  margin-bottom: 0;
}

.container .playlist-container .lista.active {
  background-color: #444;
}

.container .playlist-container .lista.active .lista-titulos {
  color: #fff;
}

.container .playlist-container .lista .lista-videos {
  width: 100px;
  height: 75px;
  border-radius: 5px;
}

.container .playlist-container .lista .lista-titulos {
  font-size: 17px;
  color: #444;
}

@media (max-width: 1200px) {
  .container {
    margin: 0;
  }
}

@media (max-width: 450px) {
  .container .video-principal-container .titulo-video-principal {
    font-size: 15px;
    text-align: center;
  }

  .container .playlist-container .lista {
    flex-flow: column;
    gap: 10px;
  }

  .container .playlist-container .lista .lista-videos {
    width: 100%;
  }

  .container .playlist-container .lista .lista-titulos {
    font-size: 15px;
    text-align: center;
  }
}

.card-img-top {
  width: 258px; 
  height: 170px;
}
.card-body{
  min-height: 262px;
}
a{
  width: 100%; 
}
</style>