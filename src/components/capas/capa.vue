<template>
  <div>
    <div class="fila1">
      <b-checkbox>        
        <h6 @click="$emit('layerSelected', layer.layerName)">{{layer.layerName}}</h6>
      </b-checkbox>
      <b-icon
        icon="alpha-i-circle-outline"
        class="panel__btn"
        @click.native="infoLayer(layer.layerName)"
      ></b-icon>
    </div>
    <b-message
      :title="layer.layerName"
      :id="layer.layerName"
      type="is-info"
      :active="true"
    >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit</b-message>
  </div>
</template>
<script>
export default {
  name: "capa",
  props: ["layer"],
  data() {
    return {            
    }
  },
  methods: {
    infoLayer(layerName) {        
      if (this.$store.getters.getState.nameLayerSelected == '') {
        this.showInfoLayer(layerName);
      } else if (this.$store.getters.getState.nameLayerSelected == layerName) {
        if (this.$store.getters.getState.infoLayerShowed) {
          this.$store.getters.getState.nameLayerSelected == "";
          document.getElementById(layerName).style.display = "none";  
          this.$store.getters.getState.infoLayerShowed = false        
        } else {
          this.showInfoLayer(layerName);
        }
      } else {
        document.getElementById(this.$store.getters.getState.nameLayerSelected).style.display = "none";
        this.showInfoLayer(layerName);
      }
    },
    showInfoLayer(layerName) {        
      document.getElementById(layerName).style.display = "block";      
      this.$store.commit("setState", {field:'nameLayerSelected', data:layerName})
      this.$store.commit("setState", {field:'infoLayerShowed', data:true})      
    },
    
  }
};
</script>