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
    panelVisibility: false,//despliega panel tabla de contenidoisLayerDraw: false,
    tablaDeContenido: {
      nameLayerSelected: '',//nombre de la capa seleccionda
      infoLayerShowed: false,//bandera para saber si el cuadro de info de una capa esta desplegado                
      urlQueryToNasa: '',//  
      isLayerDraw: false,
      doQuery: false,
      layers: {
        layers: [
          { layerName: "fires_modis_24", titleLayer: "fires modis 24 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_modis_48", titleLayer: "fires modis 48 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_modis_72", titleLayer: "fires modis 72 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_modis_7", titleLayer: "fires modis 7 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_aqua_24", titleLayer: "fires aqua 24 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_aqua_48", titleLayer: "fires aqua 48 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_aqua_72", titleLayer: "fires aqua 72 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_aqua_7", titleLayer: "fires aqua 7 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_terra_24", titleLayer: "fires terra 24 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_terra_48", titleLayer: "fires terra 48 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_terra_72", titleLayer: "fires terra 72 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_terra_7", titleLayer: "fires terra 7 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_viirs_24", titleLayer: "fires viirs 24 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_viirs_48", titleLayer: "fires viirs 48 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_viirs_72", titleLayer: "fires viirs 72 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_viirs_7", titleLayer: "fires viirs 7 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_viirs_snpp_24", titleLayer: "fires viirs snpp 24 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_viirs_snpp_48", titleLayer: "fires viirs snpp 48 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_viirs_snpp_72", titleLayer: "fires viirs snpp 72 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_viirs_snpp_7", titleLayer: "fires viirs snpp 7 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_viirs_noaa20_24", titleLayer: "fires viirs noaa20 24 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_viirs_noaa20_48", titleLayer: "fires viirs noaa20 48 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_viirs_noaa20_72", titleLayer: "fires viirs noaa20 72 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_viirs_noaa20_7", titleLayer: "fires viirs noaa20 7 horas", idMapLayer: null, dataRange: false, descricionCapa: "N/A" },
          { layerName: "fires_viirs", titleLayer: "fires viirs horas", idMapLayer: null, dataRange: true, descricionCapa: "N/A" },
          { layerName: "fires_viirs_snpp", titleLayer: "fires viirs snpp horas", idMapLayer: null, dataRange: true, descricionCapa: "N/A" },
          { layerName: "fires_viirs_noaa20", titleLayer: "fires viirs noaa 20 horas", idMapLayer: null, dataRange: true, descricionCapa: "N/A" },
          { layerName: "fires_modis", titleLayer: "fires modis horas", idMapLayer: null, dataRange: true, descricionCapa: "N/A" },
          { layerName: "fires_terra", titleLayer: "fires terra horas", idMapLayer: null, dataRange: true, descricionCapa: "N/A" },
          { layerName: "fires_aqua", titleLayer: "fires aqua horas", idMapLayer: null, dataRange: true, descricionCapa: "N/A" }
        ],
      }
    },
    procesosSeveridad: {
      procesosHistoricos: [
        {
          id: 1,
          Identificador: "SAQ-023",
          Usuario: "Agustin",
          Nombre: "Villa de Leyva Boyaca - Abril 2019",
          Descrición: "Incendio pequeño en zona rural del municipio, a 20 minutos de la plaza central",
          Fecha: "22/04/2020",
          Fecha_Inicio:"22/04/2020",
          Fecha_Finalización:"06/05/2020",
          Numero_parcelas: 63,
          Parcelas_visiadas: 15,
          Recolectores: ["Agustiz", "Codazzi"],
          //avance_recoleccion: 0.5,          
          //parcelas_pendientes:3,
          estado: "proceso",
        },
        {
          id: 2,
          Identificador: "SAQ-022",
          Usuario: "Codazzi",
          Nombre: "Simmons",
          Descrición: "Incendio pequeño en zona rural del municipio, a 20 minutos de la plaza central",
          Fecha: "2016/10/15",
          Fecha_Inicio:"22/04/2020",
          Fecha_Finalización:"06/05/2020",
          Numero_parcelas: 10,
          Parcelas_visiadas: 3,
          Recolectores: ["Agustiz", "Codazzi"],
          //avance_recoleccion: 0.5,          
          //parcelas_pendientes:3,
          estado: "terminado",
        },

      ],
      columnsProcesosHistoricos: [
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
      procesosActivos: [
        /*  {
           id: 1,
           first_name: "Jesse",
           last_name: "Simmons",
           date: "2016/10/15",
           gender: "Male",
         },
          */
      ],
      columnsProcesosActivos: [
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
      recolectores: [
        { name: "Agustin" },
        { name: "Codazzi" }
      ]
    },
    mapaLeaft: '',
  },
  mutations: {
    setUser(state, user) {
      state.userName = user
    },
    setUserIsLogin(state, ToF) {
      state.userIsLogin = ToF
    },
    setTablaDeContenido(state, dataObjet) {
      state.tablaDeContenido[dataObjet.field] = dataObjet.data
    },
    setProcesosSeveridad(state, dataObjet) {
      state.procesosSeveridad[dataObjet.field] = dataObjet.data
    },
    setState(state, objet) {
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
      let layers = state.tablaDeContenido.layers.layers;
      layers.forEach((e, i) => {
        if (e.layerName == dataObjet.layerName) {
          state.tablaDeContenido.layers.layers[i].idMapLayer = idLayerUp;
        }
      });
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getState(state) {
      return state
    },
    getUserAuth(state) {
      return state.userIsLogin
    },
    getUserName(state) {
      return state.userName
    }
  }
})
