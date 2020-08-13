<template>
  <div class="container">
    <div>
      <h1 class="titleProcesosSev">{{titlePrcesosSeveridad}}</h1>
    </div>

    <section v-show="verTema == 'procesosSeveridad'">
      <b-tabs v-model="activeTab">
        <b-tab-item label="En proceso">
          <DataTable
            v-bind="{
              showBTN: true,
              data:enProceso}"
            v-on:ircrearps="verTema = 'crearSeveridad'"
          />
        </b-tab-item>

        <b-tab-item label="Terminados">
          <DataTable v-bind="{
              showBTN: false,
              data:terminados}" />
        </b-tab-item>
        <!-- <b-tab-item label="Selected">
          <pre>{{ selected }}</pre>
        </b-tab-item>-->
      </b-tabs>
    </section>
    <crearProceSeveridad
      v-show="verTema == 'crearSeveridad'"
      v-on:regresar="verTema = 'procesosSeveridad'"
    />
  </div>
</template>
<script>
//import axios from "axios";
import DataTable from "../DataTable";
import crearProceSeveridad from "../ProcesosSeveridad/crearProceSeveridad";
export default {
  name: "ProcesosSeveridad",
  components: {
    DataTable,
    crearProceSeveridad,
  },
  data() {
    return {
      activeTab: 0,
      titlePrcesosSeveridad:
        "PROCESOS DE ESTIMACIÓN DE SEVERIDAD DE AREAS QUEMADAS",
      verTema: "procesosSeveridad",
      selected: "",
      enProceso: [],
      terminados: [],
    };
  },
  methods: {},
  mounted() {
    //console.log("ProcesosSeveridad");
    var procesosSeveridad = this.$store.getters.getState.procesosSeveridad;
    var procesosHistoricos =  procesosSeveridad.procesosHistoricos;
    let columnsDataTables = [];
    let toSetColumns = Object.keys(procesosHistoricos[0]);
    toSetColumns.forEach((field) => {
      if(field == 'Identificador' || field == 'Fecha' || field == 'Usuario'){
        let a = {
        field: field,
        label: field,
        width: "100",
        numeric: false,
        searchable: true,
      };
      columnsDataTables.push(a);
      }      
    });
    this.$store.commit("setProcesosSeveridad", {
      field: "columnsProcesosHistoricos",
      data: columnsDataTables,
    });
    procesosHistoricos.forEach(e => {
      //console.log(e);
      e.estado == 'proceso'?this.enProceso.push(e):this.terminados.push(e);
    });
    

    ////logica para cargar los procesos de severidad historicos
    /* let vue = this;
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(function (respon) {
        vue.$store.commit("setProcesosSeveridad", {
          field: "procesosHistoricos",
          data: respon.data,
        });
        let columnsDataTables = [];
        let toSetColumns = Object.keys(respon.data[0]);
        toSetColumns.forEach((field) => {
          let a = {
            field: field,
            label: field,
            width: "100",
            numeric: false,
            searchable: true,
          };
          columnsDataTables.push(a);
        });
        vue.$store.commit("setProcesosSeveridad", {
          field: "columnsProcesosHistoricos",
          data: columnsDataTables,
        });
      }) */
    //////////////////////////////////////////////////
  },
  computed: {},
};
</script>

<style >
.tab-content {
  padding-left: 0px !important;
}
.tabs {
  display: flex;
  flex-direction: column;
  align-items: center;
}

li a span {
  color: black;
}
.titleProcesosSev {
  text-align: center;
}
</style>