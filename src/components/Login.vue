<template>
  <div>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{textTitleLogin}}</p>
      </header>
      <section v-show="!this.$store.getters.getState.userIsLogin" class="modal-card-body">
        <b-field label="Nombre Usuario">
          <b-input v-model="user" placeholder="Your user" required validation-message></b-input>
        </b-field>
        <span class="error" v-show="errorUsuario != ''">{{errorUsuario}}</span>
        <b-field label="Password">
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
        <button class="button is-primary" @click="validateLogin">{{textBTNLogin}}</button>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",

  data() {
    return {
      errorUsuario: "",
      errorPassword: "",
      user: "",
      password: "",
      textBTNLogin: "Login",
      textTitleLogin: "Iniciar Sesión",
    };
  },
  methods: {
    validateLogin() {
      var State = this.$store.getters.getState;
      if (State.userIsLogin) {
        this.userLogOut();
      } else if (this.user == "") {
        this.errorUsuario = "El usuario es requerido";
        this.errorPassword = "";
      } else if (this.password == "") {
        this.errorPassword = "Contraseña es requerida";
        this.errorUsuario = "";
      } else if (
        State.userTest != this.user || State.passwordTest != this.password
      ) {
        this.errorPassword = "El usuario ó contraseña  son invalidos";
      } else {
        this.userLogIn();
      }
    },
    userLogIn() {      
      this.textBTNLogin = "LogOut";
      this.textTitleLogin = "Cerrar Sesion";
      this.errorUsuario = "";
      this.errorPassword = "";
      this.$store.commit("setUser", this.user);
      this.$store.commit("setUserIsLogin", true);
      this.user = "";
      this.password = "";
      this.$parent.close();
    },
    userLogOut() {      
      this.$store.commit("setUser", "invitado");
      this.$store.commit("setUserIsLogin", false);
      this.errorUsuario = "";
      this.errorPassword = "";
      this.textBTNLogin = "Login";
      this.textTitleLogin = "Iniciar Sesion";
      this.$parent.close();
    },
  },
};
</script>
<style scoped>
.error {
  color: red;
}
</style>