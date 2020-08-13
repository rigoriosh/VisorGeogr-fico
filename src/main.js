import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@mdi/font/css/materialdesignicons.css'
import "chart.js";
import "hchs-vue-charts";
Vue.use(window.VueCharts);

//Creación de una instancia de Vue para almacenar el objeto mapa de Leaflet
let globalData = new Vue({
  data(){
    return{
      mapa : {}
    }
  }
})
//Adición de objeto mapa 
Vue.mixin({
  data(){
    return{
      mapaLeafLet : globalData
    }
  }
})
Vue.config.productionTip = false
Vue.use(Buefy)
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
