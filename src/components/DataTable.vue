<template>
  <div>
    <div class="buttons">
      <b-button v-show="showBTN" type="is-primary" inverted outlined @click="$emit('irCrearPS')">Agregar Proceso</b-button>
      <b-select v-model="perPage" :disabled="!isPaginated">
        <option value="5">5 filas por página</option>
        <option value="10">10 filas por página</option>
        <option value="15">15 filas por página</option>
        <option value="20">20 filas por página</option>
      </b-select>
    </div>

    <b-table
      :data="datos"
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
</template>
<script>

export default {
  name: "DataTable",
  props:["showBTN"],
  data() {
    //const datos = this.$store.getters.getState.dataShowTable;    

    return {
      paginationPosition: "both",
      showBooks: false,
      selected: this.datos,
      datos: this.$store.getters.getState.dataShowTable,
      isPaginated: true,
      perPage: 5,
      columns: this.$store.getters.getState.columnsDataTables,
    };
  },
  mounted(){   
    console.log("DataTable");     
  },
  methods:{    
  }
  
};
</script>
<style scoped>
.buttons{
  display: flex;
    align-items: end;
    justify-content: center;
}
</style>