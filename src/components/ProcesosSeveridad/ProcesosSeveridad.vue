<template>
  <div class="container">
    <div>
      <h1 class="titleProcesosSev">{{titlePrcesosSeveridad}}</h1>
    </div>

    <section v-show="verTema == 'procesosSeveridad'">
      <b-tabs v-model="activeTab">
        <b-tab-item label="En proceso">          
          <DataTable v-bind="{showBTN: true}" v-on:irCrearPS="verTema = 'crearSeveridad'"/>
        </b-tab-item>

        <b-tab-item label="Terminados">
          <DataTable />
        </b-tab-item>
        <!--  <b-tab-item label="Selected">
          <pre>{{ selected }}</pre>
        </b-tab-item>-->
      </b-tabs>
    </section>
    <crearProceSeveridad v-show="verTema == 'crearSeveridad'" v-on:regresar="verTema = 'procesosSeveridad'"/>
  </div>
</template>
<script>
import DataTable from "../DataTable";
import crearProceSeveridad from "../ProcesosSeveridad/crearProceSeveridad"
export default {
  name: "ProcesosSeveridad",
  components: {
    DataTable,
    crearProceSeveridad
  },
  data() {
    return {
      activeTab: 0,
      titlePrcesosSeveridad:"PROCESOS DE ESTIMACIÓN DE SEVERIDAD DE AREAS QUEMADAS",
      verTema: 'procesosSeveridad'
    };
  },
  methods:{
    a(d){
      console.log(d);
      console.log(4554544);
    }
  },
  mounted(){   
    console.log("ProcesosSeveridad");     
    
  },
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