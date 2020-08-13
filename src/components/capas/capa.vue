<template>
  <div>
    <div class="fila1">
      <b-checkbox>        
        <h6 @click="layerSelected(layer)">{{index}} - {{layer.titleLayer}}</h6>
      </b-checkbox>
      <b-icon
        icon="alpha-i-circle-outline"
        class="panel__btn"
        @click.native="infoLayer(layer.layerName)"
      ></b-icon>
    </div>
    <b-message
      :title="layer.titleLayer"
      :id="layer.layerName"
      type="is-info"
      :active="true"
    >{{layer.descricionCapa}}</b-message>
    
    <dataRangeCapas v-show="showDataRange" v-on:hideDatePiker="hideDatePiker(layer)" v-on:checkLayer="checkLayer(layer)"/>
  </div>
  <!-- v-show="this.$store.getters.getState.isDataRangeCapasActive && layer.dataRange" -->
</template>
<script>
import dataRangeCapas from "../dataRangeCapas";
export default {
  name: "capa",
  props: ["layer", "index"],
  components: {
    dataRangeCapas,
  },
  data() {
    return {
      isShowDataRange: false,
      isCapaShowed: false, //bandera para saber cuando el dataRange debe ser mostrado      
    };
  },
  computed: {
    showDataRange() {
      return this.isShowDataRange;
    },
  },
  methods: {
    layerSelected(layer) {
      console.log("aaaaaaaaaaaaaaaaa");      
      if (
        layer.layerName == "fires_terra" ||
        layer.layerName == "fires_viirs" ||
        layer.layerName == "fires_viirs_snpp" ||
        layer.layerName == "fires_viirs_noaa20" ||
        layer.layerName == "fires_aqua" ||
        layer.layerName == "fires_modis"
      ) {
        this.isShowDataRange = layer.dataRange && !this.isShowDataRange;
        this.$store.commit("setTablaDeContenido", {field: "urlQueryToNasa", data: ''})
      }
      this.checkLayer(layer)
    },
    checkLayer(){
      this.$emit("checkLayer", this.layer.layerName)
    },
    hideDatePiker() {     
      this.isShowDataRange = false;
      //this.isCapaShowed = true;
    },
    infoLayer(layerName) {
      var tablaDeContenido = this.$store.getters.getState.tablaDeContenido
      if (tablaDeContenido.nameLayerSelected == "") {
        this.showInfoLayer(layerName);
      } else if (tablaDeContenido.nameLayerSelected == layerName) {
        if (tablaDeContenido.infoLayerShowed) {
          tablaDeContenido.nameLayerSelected == "";
          document.getElementById(layerName).style.display = "none";
          tablaDeContenido.infoLayerShowed = false;
        } else {
          this.showInfoLayer(layerName);
        }
      } else {
        document.getElementById(
          tablaDeContenido.nameLayerSelected
        ).style.display = "none";
        this.showInfoLayer(layerName);
      }
    },
    showInfoLayer(layerName) {
      document.getElementById(layerName).style.display = "block";
      this.$store.commit("setTablaDeContenido", {
        field: "nameLayerSelected",
        data: layerName,
      });
      this.$store.commit("setTablaDeContenido", { field: "infoLayerShowed", data: true });
    },
  },
};
</script>