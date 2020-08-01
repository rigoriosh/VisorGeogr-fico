<template>
  <div>
    <div class="modal-card" style="width: auto">
      <section class="modal-card-body">
        <b-field label="Selecciona un rango de fechas entre los últimos 31 días">
          <b-datepicker placeholder="Click to select..." v-model="dates" range></b-datepicker>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" @click="consultar">Consultar</button>
      </footer>
    </div>
  </div>
</template>
<script>
import L from "leaflet";

export default {
  name: "dataRangeCapas",
  data() {
    return {
      dates: [],
    };
  },
  methods: {
    consultar() {
      console.log(this.dates);
      var mesMax =
        parseInt(this.dates[0].getMonth() + 1) < 10
          ? "0" + parseInt(this.dates[0].getMonth() + 1)
          : parseInt(this.dates[0].getMonth() + 1);
      var diaMax =
        parseInt(this.dates[0].getDate()) < 10
          ? "0" + parseInt(this.dates[0].getDate())
          : parseInt(this.dates[0].getDate());
      var mesMin =
        parseInt(this.dates[1].getMonth() + 1) < 10
          ? "0" + parseInt(this.dates[1].getMonth() + 1)
          : parseInt(this.dates[1].getMonth() + 1);
      var diaMin =
        parseInt(this.dates[1].getDate()) < 10
          ? "0" + parseInt(this.dates[1].getDate())
          : parseInt(this.dates[1].getDate());
      var fechaConsulta =
        this.dates[0].getFullYear() +
        "-" +
        mesMax +
        "-" +
        diaMax +
        "/" +
        this.dates[1].getFullYear() +
        "-" +
        mesMin +
        "-" +
        diaMin;
      var urlQueryToNasa = this.$store.getters.getState.urlQueryToNasa;
      var layerName = this.$store.getters.getState.nameLayerSelected;
      var urlToQuery =
        urlQueryToNasa +
        "/?REQUEST=GetMap&layers=" +
        layerName +
        "&TIME=" +
        fechaConsulta +
        "&WIDTH=1024&HEIGHT=512&BBOX=-180,-90,180,90";

      L.tileLayer
        .wms(urlToQuery, {
          layers: layerName,
          format: "image/png",
          transparent: true,
        })
        .addTo(this.mapaLeafLet.$data.mapa);
      this.$store.commit("addIdToLayers", { layerName: layerName });
      this.$store.commit("setState", {
        field: "isDataRangeCapasActive",
        data: false,
      });

      //////////////

      console.log(urlToQuery);
      //////////////
      this.$store.commit("setState", { field: "panelVisibility", data: true });
      //this.$store.commit("setState", { field: "dateRageQueryLayerNasa", data: fechaConsulta });
    },
  },
  mounted(){   
    console.log("dataRangeCapas");     
  },
};
</script>
<style scoped>
.modal-card-body {
  height: 459px;
  width: 375px;
  text-align: center;
}
.modal-card-foot {
  width: 375px;
}
</style>