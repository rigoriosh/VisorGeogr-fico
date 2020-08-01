<template>
    <ul class="navegador" :class="{panel_abierto:panelVisibility}">
        <li>
            <b-button size="is-medium" 
                @click="zoomIn" 
                :disabled="zoomLevel > 17">
                <b-icon
                    icon="plus"
                    siz="is-medium">
                </b-icon>
            </b-button>
        </li>
        <li>
            <b-button size="is-medium" 
                @click="zoomOut" 
                :disabled="zoomLevel < 2">
                <b-icon
                    icon="minus"
                    siz="is-medium">
                </b-icon>
            </b-button>
        </li>
        <li>
            <b-button size="is-medium" @click="asignarVistaInicial">
                <b-icon
                    icon="home"
                    siz="is-medium">
                </b-icon>
            </b-button>
        </li>
        <li>
            <b-button size="is-medium">
                <b-icon
                    icon="crosshairs-gps"
                    siz="is-medium">
                </b-icon>
            </b-button>
        </li>
        <li>
            <b-button size="is-medium" 
                :disabled="boundsHistory.length == 0 || boundsHistoryPosition == 0" 
                @click="setPreviousBoundsHistory">
                <b-icon
                    icon="chevron-left"
                    siz="is-medium">
                </b-icon>
            </b-button>
        </li>
        <li>
            <b-button size="is-medium" 
                :disabled="(boundsHistory.length -1) == boundsHistoryPosition"
                @click="setNextBoundsHistory"
                >
                <b-icon
                    icon="chevron-right"
                    siz="is-medium">
                </b-icon>
            </b-button>
        </li>
    </ul>
</template>
<script>
// import {LatLngBounds} from 'leaflet'
export default {
    props:{
        panelVisibility:{
            type: Boolean,
            required:true
        }
    },
    data(){
        return {
            zoomLevel : 6,
            maxZoom : 18,
            boundsHistory:[],
            boundsHistoryPosition:-1
        }
    },
    methods: {
        addBoundsHistory(boundsEvent){
            this.boundsHistory.push(boundsEvent)
            this.boundsHistoryPosition =  this.boundsHistory.length -1
        },
        asignarVistaInicial(){            
            this.mapaLeafLet.$data.mapa.setView([4, -72], 6)
            this.zoomLevel = 6
        },
        onZoomEnd(evt){
            console.log('Move to end.......')
            let boundsEvent = evt.sourceTarget.getBounds()         
            if(this.boundsHistory.length == 0)
                this.addBoundsHistory(boundsEvent)
            else if(!boundsEvent.equals(this.boundsHistory[this.boundsHistoryPosition],0.1)){
                if((this.boundsHistory.length - 1) != this.boundsHistoryPosition){
                    this.boundsHistory = []
                    this.boundsHistoryPosition = -1
                }                   
                this.addBoundsHistory(boundsEvent)
            }
            
        },
        setPreviousBoundsHistory(){
            this.boundsHistoryPosition --
            this.mapaLeafLet.$data.mapa.fitBounds(this.boundsHistory[this.boundsHistoryPosition])
        },
        setNextBoundsHistory(){
            this.boundsHistoryPosition ++
            this.mapaLeafLet.$data.mapa.fitBounds(this.boundsHistory[this.boundsHistoryPosition])
        },
        zoomIn(){
            this.zoomLevel++
            this.mapaLeafLet.$data.mapa.setZoom(this.zoomLevel)
        },
        zoomOut(){
            this.zoomLevel--
            this.mapaLeafLet.$data.mapa.setZoom(this.zoomLevel)           
        }

    },
    mounted(){
        // this.mapaLeafLet.$data.mapa.on('load',(evt) => {
        //     console.log(evt)
            this.addBoundsHistory((this.mapaLeafLet.$data.mapa.getBounds()))
        // })
        this.mapaLeafLet.$data.mapa.on('zoomend',(evt) => {
            this.zoomLevel = evt.sourceTarget.getZoom() 
        })
        this.mapaLeafLet.$data.mapa.on('moveend',this.onZoomEnd)
    }
}
</script>
<style lang="scss">
@import "../scss/_Variables.scss";
.navegador{
    position: absolute;
    top: 6rem;
    left: 0;
    z-index: 402;
    margin: 1rem .5rem;
    transition: all .5s ease-in-out;
    transform: translateX(#{$panel-min-width});    
    li:not(:last-child){
        margin-bottom: .3rem;
    }
    &.panel_abierto{
        transform: translateX(#{$panel-width}); 
    }
}
</style>