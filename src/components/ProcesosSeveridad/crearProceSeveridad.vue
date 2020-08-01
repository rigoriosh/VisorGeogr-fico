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
        <b-upload v-model="filesAreaBurn" expanded multiple drag-drop type="is-info">
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
        <span v-for="(file, index) in filesAreaBurn" :key="index" class="tag is-primary">
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
        <b-upload v-model="filesParcelas" multiple drag-drop expanded type="is-info">
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
        <span v-for="(file, index) in filesParcelas" :key="index" class="tag is-primary">
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
            v-for="option in data"
            :value="option.id"
            :key="option.id"
          >{{ option.user.first_name }}</option>
        </b-select>
        <b-button type="is-primary" inverted outlined>Añadir</b-button>
      </b-field>
    </b-field>
    <b-button type="is-primary" inverted outlined expanded v-on:click="iniciar">Iniciar</b-button>
    <b-button type="is-primary" inverted outlined expanded v-on:click="deleteLayerGeoJson">Quitar layer</b-button>
    <br />
  </div>
</template>
<script>
// Importamos JQuery
//const $ = require("jquery");
// Lo declaramos globalmente
//window.$ = $;
import L from "leaflet";
export default {
  name: "crearProceSeveridad",
  data() {
    return {
      Nombre: "",
      descricion: "",
      filesAreaBurn: [],
      filesParcelas: [],
      file: "",
      Recolectores: "",
      data: [{ id: 1, user: { first_name: "rigo" } }],
      expandirUpload: true,
    };
  },
  methods: {
    iniciar() {
      var mapa = this.$store.getters.getState.mapaLeaft;      
      console.log(mapa);
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        console.log("Great success! All the File APIs are supported.");
      } else {
        alert("The File APIs are not fully supported in this browser.");
      }      
      for (var i = 0, f; (f = this.filesAreaBurn[i]); i++) {
        
        if (f.name.split(".")[1] != "geojson") {//solo procesa archivos geojson.
          continue;
        }

        var reader = new FileReader();
        reader.readAsBinaryString(f);                
        // Closure to capture the file information.
        reader.onload = (function () {
          return function (e) {            
            var result = JSON.parse(e.target.result);            
            var geojsonLayer = L.geoJSON(result);
            geojsonLayer.addTo(mapa);    
            console.log(mapa);
          };
        })(f);        
        
      }
    },
    deleteLayerGeoJson(){
      var mapa = this.$store.getters.getState.mapaLeaft;      
      let layers = Object.keys(mapa._layers);
      mapa.removeLayer(mapa._layers[layers[layers.length-1]])
    },
    deleteDropFilesAreaBurn(index) {
      console.log("delete");
      this.filesAreaBurn.splice(index, 1);
    },
    deleteDropFileParcelas(index) {
      this.filesParcelas.splice(index, 1);
    },
  },
  mounted() {
    console.log("crearProceSeveridad");
  },
};
</script>