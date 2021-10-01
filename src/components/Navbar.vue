<template>
  <div class="nav">
    <!-- Navbar navegacion Vuetify y vue-router -->
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          color="white"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
        >
          <v-list-item-title><router-link :to="{ name: 'Login' }">Login</router-link></v-list-item-title>
         
        </v-list-item>
        <v-list-item
        >
          
          <v-list-item-title><router-link :to="{ name: 'Registro' }">Registrate</router-link></v-list-item-title>
        </v-list-item>
         <v-list-item
        >
          <v-list-item-title><router-link :to="{ name: 'Cursos' }">Cursos</router-link></v-list-item-title>
         
        </v-list-item>
         <v-list-item
        >
          <v-list-item-title><router-link :to="{ name: 'Administracion' }">Administración</router-link></v-list-item-title>
         
        </v-list-item>
      </v-list>
    </v-menu>
      <v-toolbar-title>Cursos AlfaWeb</v-toolbar-title>
      
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" @click="cerrarSesion" icon>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>Cerrar Sesión</span>
      </v-tooltip>
    </v-app-bar>
  </div>
</template>
<script>
import Firebase from "firebase";
export default {
  name: "Navbar",
  methods: {
    cerrarSesion() {
      Firebase.auth()
        .signOut()
        .then(
          () => {
            this.$router.push({ name: "Login" });
          },
          (reject) => {
            (this.loading = false),
              this.$message({
                showClose: true,
                message: reject.message,
                type: "error,",
              });
          }
        );
    },
  }
};
</script>

