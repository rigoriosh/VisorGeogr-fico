<template>
  <div id="app">
    <Menu @onOpenComponent="openComponent"></Menu>
    <Map></Map> 
    <Navegacion :panelVisibility="panelVisibility"></Navegacion>
    <Panel :panelVisibility="panelVisibility" ></Panel>
  </div>
</template>

<script>
import Map from './components/Map'
import Menu from './components/Menu'
import Navegacion from './components/Navegacion'
const Panel = () => import('@/components/Panel')


export default {
  name: 'App',  
  //Objeto mapa de leaflet    
  components: {
    Map,
    Menu,
    Navegacion,
    Panel
  },
  data(){
    console.log(this.$store.getters.getState.panelVisibility);
    return {
      
      nombreComponenteAbierto:'ss'
    }
  },
  methods:{
    openComponent(nombreComponente){
      //this.panelVisibility = true
      this.$store.commit("setState", {"field":"panelVisibility", "data":true});
      if(this.nombreComponenteAbierto != nombreComponente){
        this.nombreComponenteAbierto = nombreComponente
        console.log('Abrir componente ->',nombreComponente)
      }else
        this.$store.commit("setState", {"field":"panelVisibility", "data":false});      
    }
  },
  computed:{
    panelVisibility(){
      return this.$store.getters.getState.panelVisibility;
    } 
  },
  mounted(){   
    console.log("App");     
  },

}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}
*,
*::before,
*::after {
    box-sizing: inherit;
}

html {
    box-sizing: border-box;
    font-size: 62.5%; // 1rem = 10px, 10px/16px = 62.5%
    
}
body {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    line-height: 1.6;
    min-height: 100vh;
}
#app {
  min-height: 100vh;
  width: 100%;
  display: flex;  
  position: relative;
}

//Generales App
@import "./scss/_Buefy.scss"

</style>
