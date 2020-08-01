<template>
  <main class="panel has-background-primary has-text-white" :class="{minimizado:minimizado,cerrado:!panelVisibility}" >
    <div class="panel__head">
      <b-icon icon="chevron-left" class="panel__btn ml" @click.native="minimizarPanel"></b-icon>
      <b-icon v-if="!minimizado" icon="close" class="panel__btn" @click.native="cerrarPanel"></b-icon>
    </div>
    <div class="panel__body"> <!-- compones a ser desplegados dentro del menu de la tabla de contenido -->     
      <div v-if="this.$store.getters.getState.nameComponent == 'capas'">
        <listadoCapas />
      </div>
      <div v-if="this.$store.getters.getState.nameComponent == 'ProcesosSeveridad'">
        <ProcesosSeveridad />
      </div>
           
    </div>
  </main>
</template>
<script>
import listadoCapas from "./capas/listadoCapas";
import ProcesosSeveridad from "./ProcesosSeveridad/ProcesosSeveridad"
export default {
  components: {
    listadoCapas,
    ProcesosSeveridad
  },
  props: {
    panelVisibility: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      minimizado: false,
      isActive: true
    };
  },
  methods: {
    cerrarPanel() {
      //this.$emit("onPanelclose", false);    
      this.$store.commit("setState", {"field":"panelVisibility", "data":false});  
    },
    minimizarPanel() {
      this.minimizado = false;
      //this.$emit("onPanelclose", false);
      this.$store.commit("setState", {"field":"panelVisibility", "data":false});
    }
  },
  mounted(){   
    console.log("Panel");     
  },
};
</script>
<style lang="scss">
@import "../scss/_Variables.scss";
.panel {
  position: absolute;
  top: $menu-height;
  left: 0;
  z-index: 401;
  height: calc(100vh - #{$menu-height});
  width: $panel-width;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease-in-out;
  &__head {
    flex: 0 0 2rem;
    display: flex;
    justify-content: flex-end;
  }
  &__body {
    flex: 1;
  }
  &__btn {
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    &.ml {
      margin-right: 0.5rem;
      transition: all 0.5s ease-in-out;
    }
  }
  &.minimizado {
    transform: translateX(calc(#{$panel-min-width} - 100%));
    .panel__btn.ml {
      transform: rotate(180deg);
    }
  }
  &.cerrado {
    transform: translateX(-100%);
  }
  overflow-y: scroll;
}
.layer {
  &:hover {
    background-color: darkgray;
  }
  cursor: pointer;
  padding-left: 20px;
  padding-right: 20px;
}
.fila1 {
  display: flex;
  justify-content: space-between;
}
</style>