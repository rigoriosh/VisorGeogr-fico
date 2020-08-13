<template>
  <div>
    <b-button size="is-small" icon-left="arrow-left" @click="$emit('regresar')">Regresar</b-button>
    <b-field label="Nombre">
      <b-input v-model="Nombre" size="is-small"></b-input>
    </b-field>
    <b-field label="Descripción">
      <b-input v-model="descricion" size="is-large"></b-input>
    </b-field>
    <section>
      <b-field label="Archivo Area Quemada (GeoJson)">
        <b-upload
          v-show="showBurnArea"
          v-model="filesAreaBurn"
          multiple
          drag-drop
          type="is-info"
          expanded
        >
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="upload" size="is-large"></b-icon>
              </p>
              <p>{{"Arrastre y suelte su archivo o seleccionelo"}}</p>
            </div>
          </section>
        </b-upload>
      </b-field>
      <div class="tags">
        <span v-for="(file, index) in filesAreaBurnReactivo" :key="index" class="tag is-primary">
          {{file.name}}
          <button
            class="delete is-small"
            type="button"
            @click="deleteDropFilesAreaBurn(index)"
          ></button>
        </span>
      </div>
    </section>
    <section>
      <b-field label="Parcelas de valoración (GeoJson)">
        <b-upload
          v-show="showBurnParcela"
          v-model="filesParcelas"
          multiple
          drag-drop
          expanded
          type="is-info"
        >
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="upload" size="is-large"></b-icon>
              </p>
              <p>Arrastre y suelte su archivo o seleccionelo</p>
            </div>
          </section>
        </b-upload>
      </b-field>

      <div class="tags">
        <span v-for="(file, index) in filesParcelasReactivo" :key="index" class="tag is-primary">
          {{file.name}}
          <button
            class="delete is-small"
            type="button"
            @click="deleteDropFileParcelas(index)"
          ></button>
        </span>
      </div>
    </section>
    <b-field label="Recolectores">
      <b-field>
        <b-select placeholder="Seleccione recolector" expanded>
          <option
            v-for="option in Recolectores"
            :value="option.id"
            :key="option.id"
          >{{ option.name}}</option>
        </b-select>
        <b-button type="is-primary" inverted outlined>Añadir</b-button>
      </b-field>
    </b-field>
    <b-button type="is-primary" inverted outlined expanded v-on:click="iniciar">Iniciar</b-button>    
    <br />
  </div>
</template>
<script>
import L from "leaflet";
export default {
  name: "crearProceSeveridad",
  data() {
    var procesosSeveridad = this.$store.getters.getState.procesosSeveridad;
    return {
      Nombre: "",
      descricion: "",
      filesAreaBurn: [],
      filesParcelas: [],      
      Recolectores: procesosSeveridad.recolectores,
      showBurnArea: true,
      showBurnParcela: true,
      idLayersTotalesMapa: [],
      idLayersfilesAreaBurn: [],
      idLayersfilesParcelas: [],      
    };
  },
  methods: {
    ocultarYdibujar(area, dragDrop) {      
      if (this[area].length == 0) {
        this[dragDrop] = true;
      } else {
        this[dragDrop] = false; //oculta drag a drup
        this.iniciar(this[area], area); //lee archivo y dibuja geoJson
      }
    },
    iniciar(fileToDraw, area) {
      var mapa = this.$store.getters.getState.mapaLeaft;
      this.idLayersTotalesMapa = Object.keys(mapa._layers);
      var myThis = this;      
      //https://www.html5rocks.com/es/tutorials/file/dndfiles//
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        console.log("Great success! All the File APIs are supported.");
      } else {
        alert("The File APIs are not fully supported in this browser.");
      }
      for (var i = 0, f; (f = fileToDraw[i]); i++) {
        if (f.name.split(".")[1] != "geojson") {
          //solo procesa archivos geojson.
          continue;
        }
        var reader = new FileReader();
        reader.readAsBinaryString(f);
        reader.onload = (function () {
          return function (e) {
            var result = JSON.parse(e.target.result);
            var featuresToDraw = [];
            result.features.forEach((c) => {
              //for para seleccionar solo los tipo poligon
              c.geometry.type == "Polygon" ? featuresToDraw.push(c) : "";
            });
            result.features = featuresToDraw;
            var geojsonLayer = L.geoJSON(result);            
            geojsonLayer.addTo(mapa);            
            myThis.idLayersTotales = Object.keys(mapa._layers);
            myThis.isIdtoLayerOur=false;
            myThis.idLayersTotales.forEach((idLayersTotales) => {
              myThis.idLayersTotalesMapa.forEach((idLayersTotalesMapa) => {
                if (idLayersTotales == idLayersTotalesMapa) {
                  myThis.isIdtoLayerOur = true
                }                  
              });
              if (!myThis.isIdtoLayerOur) {                  
                  myThis["idLayers" + area].push(idLayersTotales);                  
                }
                myThis.isIdtoLayerOur = false
            });            
          };
        })(f);
      }
    },
    deleteLayerGeoJson(area) {
      var mapa = this.$store.getters.getState.mapaLeaft;     
      this["idLayers"+area].forEach(e => {
        mapa._layers[e] != undefined ? mapa.removeLayer(mapa._layers[e]):'';        
      });      
    },
    deleteDropFilesAreaBurn(index) {
      this.filesAreaBurn.splice(index, 1);
      this.showBurnArea = true;
      this.deleteLayerGeoJson("filesAreaBurn");
    },
    deleteDropFileParcelas(index) {
      this.filesParcelas.splice(index, 1);
      this.showBurnParcela = true;
      this.deleteLayerGeoJson("filesParcelas");
    },
  },
  computed: {
    filesParcelasReactivo() {
      this.ocultarYdibujar("filesAreaBurn", "showBurnArea");
      return this.filesParcelas;
    },
    filesAreaBurnReactivo() {
      this.ocultarYdibujar("filesParcelas", "showBurnParcela");
      return this.filesAreaBurn;
    },
  },
  mounted() {
    console.log("crearProceSeveridad");
  },
};
</script>