<template>
  <div>
    <div v-show="mostrar">
      <div class="buttons">
        <b-button
          v-show="showBTN"
          type="is-primary"
          inverted
          outlined
          @click="$emit('ircrearps')"
        >Agregar Proceso</b-button>
        <b-select v-model="perPage" :disabled="!isPaginated">
          <option value="5">5 filas por página</option>
          <option value="10">10 filas por página</option>
          <option value="15">15 filas por página</option>
          <option value="20">20 filas por página</option>
        </b-select>
      </div>

      <b-table
        :data="dataa"
        :narrowed="true"
        :selected.sync="selected"
        :paginated="isPaginated"
        :pagination-position="paginationPosition"
        :per-page="perPage"
        :bordered="true"
      >
        <template slot-scope="props">
          <template v-for="column in columns">
            <b-table-column :key="column.id" v-bind="column" sortable>
              <template
                v-if="column.searchable && !column.numeric"
                slot="searchable"
                slot-scope="props"
              >
                <b-input
                  v-model="props.filters[props.column.field]"
                  placeholder="Search..."
                  icon="magnify"
                  size="is-small"
                />
              </template>
              {{ props.row[column.field] }}
            </b-table-column>
          </template>
        </template>
      </b-table>
    </div>
    <div v-if="!mostrar">
      <detalleprocestimacion :key="1" :detalleprocestimacion="selected" v-on:hidedetail="hideDetail()"/>
    </div>
    
  </div>
</template>
<script>
import detalleprocestimacion from "../components/ProcesosSeveridad/detalle_proc_estimacion";
export default {
  name: "DataTable",
  props: ["showBTN", "data"],
  components: { detalleprocestimacion },
  data() {
    var procesosSeveridad = this.$store.getters.getState.procesosSeveridad;
    return {
      paginationPosition: "both",
      showBooks: false,      
      selected: {},
      procesosSeveridad: procesosSeveridad,
      isPaginated: true,
      perPage: 5,
    };
  },
  mounted() {
    //console.log("DataTable");
  },
  methods: {
    hideDetail(){
      this.selected = {}
    }
  },
  computed: {    
    mostrar(){
      //console.log(this.selected);
      let a = Object.keys(this.selected).length
      if (a > 0) {
        return false
      } else {
        return true
      }      
    },
    dataa(){
      //console.log("data");
      
      return this.data
    },
    columns() {
      return this.procesosSeveridad.columnsProcesosHistoricos;
    },
  },
};
</script>
<style scoped>
.buttons {
  display: flex;
  align-items: end;
  justify-content: center;
}
</style>