<template>
  <header class="menu">
    <img class="logo" src="./../assets/logo.png" alt="Logo Aplicacion" />
    <div class="menu__avatar" >        
      <div class="menu__avatar__icon" @click="isComponentModalActive = true">
        <b-icon icon="account" size="is-medium"></b-icon>
      </div>
      <p v-show="user != ''" class="menu__avatar__label">
        Hola
        <br />
        <span>{{user}}</span>
      </p>
      <b-modal :active.sync="isComponentModalActive" has-modal-card trap-focus
        :destroy-on-hide="false" aria-role="dialog" aria-modal >
        <Login></Login>
      </b-modal>
    </div>
    <nav>
      <ul class="menu__botones">
        <li class="menu_botones__item" v-for="(item,index) in componentes" :key="index">
          <b-button v-show="estaAuth || item.active" @click="openComponent(item.nombre)" size="is-large">
            <b-icon :icon="item.icon" siz="is-medium"></b-icon>
          </b-button>
          <p v-show="estaAuth || item.active">{{item.label}}</p>
        </li>
      </ul>
    </nav>
    <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">      
      <dataRangeCapas />
    </b-modal>
  </header>
</template>
<script>
import Login from "../components/Login";
import dataRangeCapas from "../components/dataRangeCapas";
import axios from "axios";
export default {
  components: {
    Login,
    dataRangeCapas
  },
  data() {
    return {      
      componentes: [
        {
          id: 1,
          nombre: "capas",
          label: "Capas",
          icon: "layers",
          active: true
        },
        {
          id: 2,
          nombre: "ProcesosSeveridad",
          label: "P.Severidad",
          icon: "view-dashboard",
          //active: true
          active: this.user
        },
      ],
      isComponentModalActive: false,    
       
    };
  },
  methods: {
    openComponent(nameComponent) {
      console.log(nameComponent);
      if (nameComponent == this.$store.getters.getState.nameComponent || this.$store.getters.getState.nameComponent == "") {
        this.$store.commit("setState", {"field":"panelVisibility", "data":!this.$store.getters.getState.panelVisibility});
      }
      this.$store.commit("setState", {field:'nameComponent', data:nameComponent})  ;          
      //this.$emit("onOpenComponent", nameComponent);
    },
  },
  computed:{
    estaAuth(){      
      return this.$store.getters.getUserAuth
    },
    user(){
      return this.$store.getters.getUserName
    },
    isCardModalActive(){
      return this.$store.getters.getState.isDataRangeCapasActive
    }
  },
  mounted(){
    console.log("Menu");
    ////logica para cargar los procesos de severidad
    let vue = this;
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(function(respon){            
      vue.$store.commit("setState",{field: "dataShowTable", data:respon.data});
      let columnsDataTables = [];
      let toSetColumns = Object.keys(respon.data[0])
      toSetColumns.forEach(field => {        
        let a = {
          field:field,
          label:field,
          width:"100",
          numeric:false,
          searchable: true
        }
        columnsDataTables.push(a);
      });
      vue.$store.commit("setState",{field:"columnsDataTables",data:columnsDataTables});    
    })
    //////////////////////////////////////////////////
  }
};
</script>
<style lang="scss">
.menu {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 401;
  margin: 0.5rem 0rem 0rem 0.5rem;
  display: flex;
  align-items: center;
  height: 5.5rem;
  &__avatar {
    align-self: stretch;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    cursor: pointer;
    &__icon {
      background-color: white;
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 0.3rem 1rem rgba(0, 0, 0, 0.25);
    }
    &__label {
      padding: 1rem;
      text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
        1px 1px 0 #fff;
    }
  }
  nav {
    height: 100%;
    .menu__botones {
      height: 100%;
      display: flex;
      li {
        height: 100%;
        list-style: none;
        padding: 0.3rem 1rem 0rem 1rem;
        p {
          text-align: center;
          text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
            1px 1px 0 #fff;
        }
      }
    }
  }
}
.logo {
  height: 3rem;
  margin: 1rem;
}
</style>
