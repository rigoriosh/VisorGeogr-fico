<template>
  <div>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Inciar Sesión</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Nombre Usuario">
          <b-input v-model="user" placeholder="Your user" required validation-message></b-input>
        </b-field>
        <span class="error" v-show="errorUsuario != ''">{{errorUsuario}}</span>
        <b-field label="Password" >
          <b-input
            type="password"
            v-model="password"
            password-reveal
            placeholder="Your password"
            required
          ></b-input>
        </b-field>
        <span class="error" v-show="errorPassword != ''">{{errorPassword}}</span>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Cerrar</button>
        <button class="button is-primary" @click="validateLogin">Login</button>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: "ModalForm",

  data() {
    return {
      errorUsuario: "",
      errorPassword: "",
      user: "",
      password: "",
    };
  },
  methods: {
    validateLogin() {
      console.log(this.user);
      console.log(this.password);
      if (this.user == "") {
        this.errorUsuario = "El usuario es requerido";
        this.errorPassword = "";
      } else if (this.password == "") {
        this.errorPassword = "Contraseña es requerida";
        this.errorUsuario = "";
      } else if (this.mapaLeafLet.$data.user != this.user || this.mapaLeafLet.$data.password != this.password) {
         this.errorPassword = "El usuario ó contraseña  son invalidos";
      } else {
        this.errorUsuario = "";
        this.errorPassword = "";
        console.log("sucessfull");
        this.$parent.close();
        this.$emit('user', this.user)
      }      
      
    },
  },
};
</script>
<style scoped>
.error {
  color: red;
}
</style>