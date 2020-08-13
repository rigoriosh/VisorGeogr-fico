<template>
  <div>
    <ul>
      <div>
        <h1 class="titleProducto">LISTADO DE CAPAS</h1>
      </div>
      <li class="layer" v-for="(i,index) in layers" :key="index">
        <div >          
          <capa v-bind:layer="i" v-bind:index="index + 1" v-on:checkLayer="checkLayer(i.layerName)" />
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import L from "leaflet";
import capa from "./capa";

export default {
  name: "listadoCapas",
  components: {
    capa,
  },
  data() {
    return {
      layers: this.$store.getters.getState.tablaDeContenido.layers.layers,
      mapaLeaft: this.$store.getters.getState.mapaLeaft,
      idLayerToRemove: null,
      isLayerDraw: false,
    };
  },
  methods: {
    checkLayer(layerName) {
      this.layers.forEach((e, item) => {
        if (e.layerName == layerName) {
          this.idLayerToRemove = e.idMapLayer;
          if (e.idMapLayer != null) {
            this.layers[item].idMapLayer = null; //reset id layer loaded
            this.isLayerDraw = true;
          }
        }
      });
      this.isLayerDraw
        ? this.removeLayer(this.idLayerToRemove)
        : this.drawLayer(layerName);
    },
    drawLayer(layerName) {
      var tablaDeContenido = this.$store.getters.getState.tablaDeContenido;
      console.log(layerName);
      var urlNasa = "https://firms.modaps.eosdis.nasa.gov/wms/key/",
        key = "e8f6d1455a4b2ef30caee56c8d4c5435",
        urlToQuery = "";

      if (
        layerName == "fires_terra" ||
        layerName == "fires_viirs" ||
        layerName == "fires_viirs_snpp" ||
        layerName == "fires_viirs_noaa20" ||
        layerName == "fires_aqua" ||
        layerName == "fires_modis"
      ) {
        urlToQuery = tablaDeContenido.urlQueryToNasa;
        urlToQuery != ""
          ? this.executeQuery({ layerName: layerName, urlToQuery: urlToQuery })
          : this.$store.commit("setTablaDeContenido", {
              field: "urlQueryToNasa",
              data: urlNasa + key,
            });

        //this.$store.commit("setTablaDeContenido", {"field":"nameLayerSelected", "data":layerName});
      } else {
        urlToQuery = urlNasa + key + "/";
        this.executeQuery({ layerName: layerName, urlToQuery: urlToQuery });
      }
      //var urlEjemplo1 = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}"
    },
    executeQuery(dataObjet) {
      console.log(dataObjet, "capa pintada");
      L.tileLayer
        .wms(dataObjet.urlToQuery, {
          layers: dataObjet.layerName,
          format: "image/png",
          transparent: true,
        })
        .addTo(this.mapaLeaft);
      this.$store.commit("addIdToLayers", { layerName: dataObjet.layerName }); 
    },
    removeLayer(idLayerToRemove) {
      console.log(idLayerToRemove, "capa removida");
      this.mapaLeaft.removeLayer(this.mapaLeaft._layers[idLayerToRemove]);
      this.isLayerDraw = false;
      this.$store.commit("setTablaDeContenido", { field: "urlQueryToNasa", data: "" });
      this.isLayerDraw = false
    },
    hideInfoLayer() {
      this.layers.forEach((e) => {
        document.getElementById(e.layerName).style.display = "none";
      });
    },
  },
  mounted() {
    console.log("listadoCapas");
    this.hideInfoLayer();
  },
};
</script>
<style scoped>
.a {  
  display: flex;
  justify-content: space-between;
}
.b {
  display: flex;
  justify-content: space-between;
}
</style>
