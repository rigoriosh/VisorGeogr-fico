import Vue from 'vue'
import Vuex from 'vuex'
//import L from "leaflet";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nameComponent: '',//nombre del componete desplegado
    userIsLogin: false,//valida si un usuario se logeo de forma correcta y poder desplegar los modulos ocultos
    userTest: 'a',//prueba de contraseña backend
    passwordTest: 's',//prueba de contraseña backend
    userName: '',//nombre de usuario registrado
    nameLayerSelected: '',//nombre de la capa seleccionda
    infoLayerShowed:false,//bandera para saber si el cuadro de info de una capa esta desplegado
    panelVisibility:false,//despliega panel tabla de contenido
    isDataRangeCapasActive:false,//despliega el datePiker para la consulta de capas con rangho de fechas
    dateRageQueryLayerNasa:'',//almacena el rango de fechas seleccionado para hacer la consulta de la capa de la nasa
    urlQueryToNasa:'',//para         
    mapaLeaft:'',
    dataShowTable: [
     /*  {
        id: 1,
        first_name: "Jesse",
        last_name: "Simmons",
        date: "2016/10/15",
        gender: "Male",
      },
      {
        id: 2,
        first_name: "John",
        last_name: "Jacobs",
        date: "2016/12/15",
        gender: "Male",
      },
      {
        id: 3,
        first_name: "Tina",
        last_name: "Gilbert",
        date: "2016/04/26",
        gender: "Female",
      },
      {
        id: 4,
        first_name: "Clarence",
        last_name: "Flores",
        date: "2016/04/10",
        gender: "Male",
      },
      {
        id: 5,
        first_name: "Anne",
        last_name: "Lee",
        date: "2016/12/06",
        gender: "Female",
      },
      {
        id: 6,
        first_name: "Sara",
        last_name: "Armstrong",
        date: "2016/09/23",
        gender: "Female",
      },
      {
        id: 7,
        first_name: "Anthony",
        last_name: "Webb",
        date: "2016/08/30",
        gender: "Male",
      },
      {
        id: 8,
        first_name: "Andrew",
        last_name: "Greene",
        date: "2016/11/20",
        gender: "Male",
      },
      {
        id: 9,
        first_name: "Russell",
        last_name: "White",
        date: "2016/07/13",
        gender: "Male",
      },
      {
        id: 10,
        first_name: "Lori",
        last_name: "Hunter",
        date: "2016/12/09",
        gender: "Female",
      },
      {
        id: 11,
        first_name: "Ronald",
        last_name: "Wood",
        date: "2016/12/04",
        gender: "Male",
      },
      {
        id: 12,
        first_name: "Michael",
        last_name: "Harper",
        date: "2016/07/27",
        gender: "Male",
      },
      {
        id: 13,
        first_name: "George",
        last_name: "Dunn",
        date: "2017/03/072",
        gender: "Male",
      },
      {
        id: 14,
        first_name: "Eric",
        last_name: "Rogers",
        date: "2016/06/07",
        gender: "Male",
      },
      {
        id: 15,
        first_name: "Juan",
        last_name: "Meyer",
        date: "2017/02/014",
        gender: "Male",
      },
      {
        id: 16,
        first_name: "Silvia",
        last_name: "Rosa",
        date: "2017/01/264",
        gender: "Female",
      },
      {
        id: 17,
        first_name: "Lori",
        last_name: "Cunningham",
        date: "2016/05/01",
        gender: "Female",
      },
      {
        id: 18,
        first_name: "Charles",
        last_name: "Graham",
        date: "2016/05/31",
        gender: "Male",
      },
      {
        id: 19,
        first_name: "Henry",
        last_name: "Morrison",
        date: "2016/09/27",
        gender: "Male",
      },
      {
        id: 20,
        first_name: "Albert",
        last_name: "Mendoza",
        date: "2016/08/08",
        gender: "Male",
      },
      {
        id: 21,
        first_name: "Ruby",
        last_name: "Snyder",
        date: "2017/04/019",
        gender: "Female",
      },
      {
        id: 22,
        first_name: "Jesse",
        last_name: "Warren",
        date: "2016/08/20",
        gender: "Male",
      },
      {
        id: 23,
        first_name: "Carlos",
        last_name: "Ferguson",
        date: "2016/05/31",
        gender: "Male",
      },
      {
        id: 24,
        first_name: "Melissa",
        last_name: "Peters",
        date: "2016/07/23",
        gender: "Female",
      },
      {
        id: 25,
        first_name: "Arthur",
        last_name: "Garza",
        date: "2017/03/117",
        gender: "Male",
      },
      {
        id: 26,
        first_name: "Joe",
        last_name: "Berry",
        date: "2016/07/09",
        gender: "Male",
      },
      {
        id: 27,
        first_name: "Joseph",
        last_name: "Bishop",
        date: "2016/10/04",
        gender: "Male",
      },
      {
        id: 28,
        first_name: "Sarah",
        last_name: "Harper",
        date: "2016/09/23",
        gender: "Female",
      },
      {
        id: 29,
        first_name: "Christopher",
        last_name: "Fuller",
        date: "2016/04/12",
        gender: "Male",
      },
      {
        id: 30,
        first_name: "Alan",
        last_name: "Mendoza",
        date: "2016/04/22",
        gender: "Male",
      },
      {
        id: 31,
        first_name: "James",
        last_name: "Davis",
        date: "2017/01/163",
        gender: "Male",
      },
      {
        id: 32,
        first_name: "Scott",
        last_name: "Welch",
        date: "2016/10/04",
        gender: "Male",
      },
      {
        id: 33,
        first_name: "Mildred",
        last_name: "Myers",
        date: "2016/11/23",
        gender: "Female",
      },
      {
        id: 34,
        first_name: "Victor",
        last_name: "Martinez",
        date: "2016/04/06",
        gender: "Male",
      },
      {
        id: 35,
        first_name: "Susan",
        last_name: "Medina",
        date: "2016/12/09",
        gender: "Female",
      },
      {
        id: 36,
        first_name: "Judy",
        last_name: "Long",
        date: "2016/07/26",
        gender: "Female",
      },
      {
        id: 37,
        first_name: "Joan",
        last_name: "Myers",
        date: "2016/09/22",
        gender: "Female",
      },
      {
        id: 38,
        first_name: "Rachel",
        last_name: "Gonzales",
        date: "2016/07/15",
        gender: "Female",
      },
      {
        id: 39,
        first_name: "Roger",
        last_name: "Hunt",
        date: "2016/08/14",
        gender: "Male",
      },
      {
        id: 40,
        first_name: "Dorothy",
        last_name: "Howard",
        date: "2016/06/19",
        gender: "Female",
      },
      {
        id: 41,
        first_name: "Eugene",
        last_name: "Lynch",
        date: "2016/12/24",
        gender: "Male",
      },
      {
        id: 42,
        first_name: "Kathy",
        last_name: "Webb",
        date: "2017/04/015",
        gender: "Female",
      },
      {
        id: 43,
        first_name: "Antonio",
        last_name: "White",
        date: "2017/02/100",
        gender: "Male",
      },
      {
        id: 44,
        first_name: "Louis",
        last_name: "Spencer",
        date: "2016/10/08",
        gender: "Male",
      },
      {
        id: 45,
        first_name: "Andrea",
        last_name: "Marshall",
        date: "2016/09/04",
        gender: "Female",
      },
      {
        id: 46,
        first_name: "Eugene",
        last_name: "Sims",
        date: "2017/03/158",
        gender: "Male",
      },
      {
        id: 47,
        first_name: "Mildred",
        last_name: "Gibson",
        date: "2016/04/18",
        gender: "Female",
      },
      {
        id: 48,
        first_name: "Joan",
        last_name: "Arnold",
        date: "2016/12/16",
        gender: "Female",
      },
      {
        id: 49,
        first_name: "Jesse",
        last_name: "Schmidt",
        date: "2016/06/11",
        gender: "Male",
      },
      {
        id: 50,
        first_name: "David",
        last_name: "Frazier",
        date: "2017/02/150",
        gender: "Male",
      },
      {
        id: 51,
        first_name: "Nicholas",
        last_name: "Howell",
        date: "2016/11/01",
        gender: "Male",
      },
      {
        id: 52,
        first_name: "Douglas",
        last_name: "Chapman",
        date: "2017/02/084",
        gender: "Male",
      },
      {
        id: 53,
        first_name: "Bruce",
        last_name: "Simmons",
        date: "2016/07/14",
        gender: "Male",
      },
      {
        id: 54,
        first_name: "Antonio",
        last_name: "George",
        date: "2016/11/07",
        gender: "Male",
      },
      {
        id: 55,
        first_name: "Chris",
        last_name: "Marshall",
        date: "2016/07/03",
        gender: "Male",
      },
      {
        id: 56,
        first_name: "Ashley",
        last_name: "Hudson",
        date: "2016/10/14",
        gender: "Female",
      },
      {
        id: 57,
        first_name: "Alan",
        last_name: "Edwards",
        date: "2017/03/225",
        gender: "Male",
      },
      {
        id: 58,
        first_name: "George",
        last_name: "Clark",
        date: "2016/04/28",
        gender: "Male",
      },
      {
        id: 59,
        first_name: "Frank",
        last_name: "Porter",
        date: "2016/09/08",
        gender: "Male",
      },
      {
        id: 60,
        first_name: "Christopher",
        last_name: "Palmer",
        date: "2016/05/24",
        gender: "Male",
      }, */
    ],
    columnsDataTables: [
      /* {
        field: "id",
        label: "ID",
        width: "100",
        numeric: true,
        searchable: true,
      },
      {
        field: "first_name",
        label: "First Name",
        numeric: false,
        searchable: true,
      },
      {
        field: "last_name",
        label: "Last Name",
        numeric: false,
        searchable: true,
      },
      {
        field: "date",
        label: "Date",
        centered: true,
        numeric: false,
        searchable: true,
      },
      {
        field: "gender",
        label: "Gender",
        numeric: false,
        searchable: true,
      }, */
    ],
    layers: [
      { layerName: "fires_modis_24", idMapLayer: null },
      { layerName: "fires_modis_48", idMapLayer: null },
      { layerName: "fires_modis_72", idMapLayer: null },
      { layerName: "fires_modis_7", idMapLayer: null },
      { layerName: "fires_aqua_24", idMapLayer: null },
      { layerName: "fires_aqua_48", idMapLayer: null },
      { layerName: "fires_aqua_72", idMapLayer: null },
      { layerName: "fires_aqua_7", idMapLayer: null },
      { layerName: "fires_terra_24", idMapLayer: null },
      { layerName: "fires_terra_48", idMapLayer: null },
      { layerName: "fires_terra_72", idMapLayer: null },
      { layerName: "fires_terra_7", idMapLayer: null },
      { layerName: "fires_viirs_24", idMapLayer: null },
      { layerName: "fires_viirs_48", idMapLayer: null },
      { layerName: "fires_viirs_72", idMapLayer: null },
      { layerName: "fires_viirs_7", idMapLayer: null },
      { layerName: "fires_viirs_snpp_24", idMapLayer: null },
      { layerName: "fires_viirs_snpp_48", idMapLayer: null },
      { layerName: "fires_viirs_snpp_72", idMapLayer: null },
      { layerName: "fires_viirs_snpp_7", idMapLayer: null },
      { layerName: "fires_viirs_noaa20_24", idMapLayer: null },
      { layerName: "fires_viirs_noaa20_48", idMapLayer: null },
      { layerName: "fires_viirs_noaa20_72", idMapLayer: null },
      { layerName: "fires_viirs_noaa20_7", idMapLayer: null },
      { layerName: "fires_viirs", idMapLayer: null, dataRange: true },
      { layerName: "fires_viirs_snpp", idMapLayer: null },
      { layerName: "fires_viirs_noaa20", idMapLayer: null },
      { layerName: "fires_modis", idMapLayer: null },
      { layerName: "fires_terra", idMapLayer: null },
      { layerName: "fires_aqua", idMapLayer: null }
    ],
  },
  mutations: {
    setUser(state, user) {      
      state.userName = user
    },
    setUserIsLogin(state, ToF){
      state.userIsLogin = ToF
    },
    setState(state, objet){
      state[objet.field] = objet.data
    },        
    addIdToLayers(state, dataObjet) {
      /////////////////////////////////////
      //saca de mapaLeafLet.$data.mapa._layers el último id de layer cargado
      var idsLayerUp = []; //guarda los id de layer cargados en el mapa
      for (var i in state.mapaLeaft._layers) {
        idsLayerUp.push(i);
      }      
      //////////////////
      var idLayerUp = idsLayerUp.pop(); //extrae el último id cargado
      state.layers.forEach((e, i) => {
        if (e.layerName == dataObjet.layerName) {
          state.layers[i].idMapLayer = idLayerUp;
        }
      });
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getState(state){
      return state
    },
    getUserAuth(state) {
      return state.userIsLogin
    },
    getUserName(state){
      return state.userName
    }
  }
})
