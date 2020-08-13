<template>
  <div>
    <button class="button is-info" @click="$emit('hidedetail')">
      <b-icon icon="chevron-left" size="is-medium"></b-icon>
      <span>Atras</span>
    </button>
    <h2 class="title is-5 styleh2">{{ detalleprocestimacion.Código }}</h2>
    <div v-for="(i, index) in propiedades" :key="index">
      <h1 class="is-5 titleh1">{{ i }}</h1>
      <h2 class="is-6">{{ detalleprocestimacion[i] }}</h2>
    </div>
    
    <div class="columns">
      <div v-show="m" class="column leyendasPterminados">
        <div style="display:flex"  v-for="(i, index) in leyendasPTerminados" :key="index">
          <div :class='i.clase'></div>{{i.texto}}
        </div>        
      </div>
      <div :class="miEstilo">
        <doughnut-chart :datos="datos" class="card" />
      </div>
    </div>
    <h1>{{ avance }}% de avance</h1>
    <h2 class="is-6">Nota: La descarga de datos se hará sobre las parcelas y en formato GeoJson</h2>
    <div class="botones">
      <button @click="descargarDatosRecolectados()" class="button is-info ajusteBtn">
        <span>
          Descargar datos
          <br />recolectados
        </span>
      </button>
      <button @click="finalizarOdescargar" class="button is-info ajusteBtn">
        <span>{{finalizar_Odescargar}}</span>
      </button>
    </div>
  </div>
</template>
<script>
import DoughnutChart from "../varius/doughnutcenter";
export default {
  name: "detalle_proceso_estimacion",
  props: ["detalleprocestimacion"],
  components: {
    DoughnutChart,
  },
  data() {
    return {
      propiedades: null,
      pv: null,
      ppv: null,
      avance: null,
      estilo: "",
      finalizar_Odescargar:'',
      m: false,
      leyendasPTerminados:[
        {texto: "Visitadas", clase: "Visitadas"},
        {texto: "Pendientes visita", clase: "Pendientesvisita"},
        {texto: "Severidad Baja", clase: "SeveridadBaja"},
        {texto: "Severidad Media", clase: "SeveridadMedia"},
        {texto: "Severidad Alta", clase: "SeveridadAlta"}
      ]
    };
  },
  computed: {
    miEstilo() {
      return this.estilo;
    },
    datos() {
      let dpe, np, pv;
      dpe = this.detalleprocestimacion;
      np = dpe.Numero_parcelas;
      pv = dpe.Parcelas_visiadas;
      let ppv = np - pv;
      var chartData = [pv, ppv];
      //console.log(chartData);
      return chartData;
    },
  },
  mounted() {
    //console.log(this.detalleprocestimacion.Numero_parcelas);
    let dpe, np;
    dpe = this.detalleprocestimacion;
    dpe = this.detalleprocestimacion;
    np = dpe.Numero_parcelas;
    this.pv = dpe.Parcelas_visiadas;
    this.ppv = np - this.pv;
    this.avance = ((this.pv / np) * 100).toFixed(2);
    this.propiedades = Object.keys(this.detalleprocestimacion);
    if (this.detalleprocestimacion.estado == "proceso") {
        this.estilo = "column is-full";        
        this.m = false
        this.finalizar_Odescargar = "Finalizar Procesos"
      } else {        
        this.estilo = "column is-half";
        this.m = true
        this.finalizar_Odescargar = "Descargar Datos Severidad"
      }
  },
  methods: {
    descargarDatosRecolectados(){
      console.log("descargarDatosRecolectados");
      console.log(this.detalleprocestimacion);
    },
    finalizarOdescargar(){
      if(this.detalleprocestimacion.estado == "proceso"){
        console.log("logica finalizar proceso");
      }else{
        console.log("logicad descargar datos severidad");
        console.log(this.detalleprocestimacion);
      }      
    }    
  },
};
</script>

<style scoped>
.styleh2 {
  text-align: center;
}
.titleh1 {
  border-bottom: solid;
  color: black;
}
.botones {
  display: flex;
  justify-content: space-around;
}
.ajusteBtn {
  padding: 25px 5px 25px 5px;
}
.card {
  /* background: transparent; */
  mix-blend-mode: color-burn;
  
}
.is-half{
  padding: 0%;
}
.Visitadas {
  width: 20px;
  background-color: green;
  margin-right: 10px;
}
.Pendientesvisita {
  width: 20px;
  background-color: red;
  margin-right: 10px;
}
.SeveridadBaja {
  width: 20px;
  background-color: lightgreen;
  margin-right: 10px;
}
.SeveridadMedia {
  width: 20px;
  background-color: lightsalmon;
  margin-right: 10px;
}
.SeveridadAlta {
  width: 20px;
  background-color: orangered;
  margin-right: 10px;
}
.leyendasPterminados{
  display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
