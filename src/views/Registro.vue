<template>
  <v-container>
    <!-- Registro de usuarios usando metodo .env y plugin de firebase  -->
    <h1>Registro de Usuarios</h1>
    <v-form ref="form" :model="user" lazy-validation>
      <v-text-field
        v-model="user.email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        label="Contraseña"
        type="password"
        required
        counter="20"
        placeholder="La contraseña debe tener mínimo 6 caracteres"
      ></v-text-field>

      <v-btn color="success" class="mr-4" @click="register"> Registrar </v-btn>

      <v-btn color="error" class="mr-4" @click="limpiar"> Limpiar Formulario </v-btn>

      <v-btn color="warning" @click="Validacion"> Limpiar Validación </v-btn>
    </v-form>
  </v-container>
</template>
<script>
import Firebase from "firebase";
export default {
  name: "Registro",
  data: () => ({
    user: {
      email: "",
      password: "",
    },
    emailRules: [
      (v) => !!v || "Debes ingresar un e-mail",
      (v) => /.+@.+\..+/.test(v) || "Eso no es un email, hazlo denuevo",
    ],
  }),

  methods: {
    register() {
      Firebase.auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then((response) => {
          console.log("Success! ", response);
          let msg = { type: "success", message: "Usuario Registrado"};
          this.$message({
          ...msg,  
        });this.$router.push("Login");
            this.loading = false;
        })
        .catch((error) => {
          console.log("Failed!", error);
        });
    },
    limpiar() {
      this.user.email = "";
      this.user.password= "";
    },
    Validacion(){
      this.$router.push("Login");
    }
  },
};
</script>