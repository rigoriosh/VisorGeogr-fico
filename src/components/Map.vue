<template>     
    <div id="map"></div>   
</template>

<script>
// Componente principal e inicial
import {Map,TileLayer} from 'leaflet'
import "leaflet/dist/leaflet.css"

export default {
  data(){
    return {
      mapa:null
    }
  },
  mounted(){    
    //Construcción de mapa base
    this.mapaLeafLet.$data.mapa = new Map('map',{ zoomControl: false }).setView([4, -72], 6)
    this.$store.commit("setState",{"field":"mapaLeaft", "data":this.mapaLeafLet.$data.mapa})
    const baseMap = new TileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/outdoors-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZHllaHV0eSIsImEiOiJjazh2azBmbWUwbW81M2VxcWFjcTZpc3B3In0.gOdNQJGnTxkCKoiAe11QIw'
    })
    baseMap.addTo(this.mapaLeafLet.$data.mapa )
  },
  methods: {
    asignarVistaInicial(){
      
    }
  },
}
</script>

<style lang="scss">
#map{
    flex: 1 ;
}
</style>
