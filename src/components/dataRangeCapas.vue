<template>
  <div class="a">
    <b-message
      v-show="validaciones"
      type="is-danger"
      has-icon
      aria-close-label="Close message"
    >{{textValidate}}</b-message>
    <div class="b">
      <b-button size="is-small" class="button is-info" @click="consultar">Consultar</b-button>
      <!-- <b-button size="is-small" class="button is-warning" @click="Cerrar">Cerrar</b-button> -->
      <b-button size="is-small" class="button is-info" @click="dates = []">Limpiar</b-button>
      <!-- <button class="button is-primary" @click="testV">testV</button> -->
    </div>

    <b-field label="Selecciona hasta 31 días" id="sss">
      <b-datepicker
        :min-date="minDate"
        :max-date="maxDate"
        placeholder="Click to select..."
        v-model="dates"
        range
        size="is-small"
        indicators="bars"
      ></b-datepicker>
    </b-field>
  </div>
</template>

<script>
//import L from "leaflet";
export default {
  name: "dataRangeCapas",
  data() {
    const today = new Date();
    return {
      dates: [],
      btnQShow: false,
      textValidate: "",
      validaciones: false,
      minDate: new Date(
        today.getFullYear() - 30,
        today.getMonth(),
        today.getDate()
      ),
      maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      //layerShowed:false, //bandera para mostrar dataRange solo cuando se valla a realizar la consulta
    };
  },
  methods: {
    /* Cerrar() {
      this.$emit("hideDatePiker");
    }, */
    showValidate(msm) {
      this.validaciones = true;
      this.textValidate = msm;
      setTimeout(() => {
        this.validaciones = false;
      }, 3000);
    },
    consultar() {
      console.log(this.dates);
      var tablaDeContenido = this.$store.getters.getState.tablaDeContenido;
      if (this.dates.length === 0) {
        this.showValidate("El rango de fechas es requerido");
      } else if ((this.dates[1] - this.dates[0]) / 86400000 > 31) {
        this.showValidate("El rango de fechas no puede ser superior a 31 días");
      } else {
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
        var urlQueryToNasa = tablaDeContenido.urlQueryToNasa;
        var layerName = tablaDeContenido.nameLayerSelected;
        var urlToQuery =
          urlQueryToNasa +
          "/?REQUEST=GetMap&layers=" +
          layerName +
          "&TIME=" +
          fechaConsulta +
          "&WIDTH=1024&HEIGHT=512&BBOX=-180,-90,180,90";
        this.$store.commit("setTablaDeContenido", {
          field: "urlQueryToNasa",
          data: urlToQuery,
        });
        this.$emit("checkLayer");        
      }
    },
  },
  mounted() {
    console.log("dataRangeCapas");
  },
};
</script>
<style scoped>
.a {
  text-align: center;
  padding: 7px;
  border: solid honeydew;
}
.b {
  display: flex;
  justify-content: space-evenly;
}
.dropdown-menu {
  width: inherit !important;
}
</style>