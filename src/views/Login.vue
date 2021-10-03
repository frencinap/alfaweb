<template>
  <v-container>
    <!-- Login de usuarios simple -->
    <h1>Ingreso de Usuarios</h1>
    <v-form ref="form" :model="user" lazy-validation>
      <v-text-field v-model="user.email" label="E-mail" required></v-text-field>
      <v-text-field
        v-model="user.password"
        label="Contraseña"
        type="password"
        required
        counter="20"
      ></v-text-field>

      <v-btn color="success" class="mr-4" @click="login" :loading="loading"> Ingresa</v-btn>

      <v-btn color="error" class="mr-4" @click="limpiar">
        Limpiar Formulario
      </v-btn>
      <!-- Nunca entendí a que se referian con limpiar validación -->
      <v-btn color="warning" @click="volver">
        Limpiar Validación
      </v-btn>
    </v-form>
  </v-container>
</template>
<script>
import Firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  methods: {
    login() {
      this.loading = true;
      Firebase.auth()
        .signInWithEmailAndPassword(
          this.user.email,
          this.user.password
        )
        .then(
          () => {
            this.$router.push("Cursos");
            this.loading = false;
          },
          (reject) => {
            this.loading = false;
            this.$message({
              showClose: true,
              message: reject.message,
              type: "error",
            });
          }
        );
    },
    limpiar() {
      this.user.email = "";
      this.user.password= "";

    },
    volver(){
      this.$router.push("Cursos")
    }
  },
};
</script>