<template>
<!-- Ruta eliminada, sustituida por el modal en administración -->
  <v-container>
    <h1>Agregando Curso</h1>
    <template>
      <!-- Formulario agregar curso usando Vuetify -->
      <v-form ref="form" v-model="valid" :model="form" lazy-validation>
        <v-text-field
          v-model="form.nombre"
          counter="40"
          label="Nombre"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.imagen"
          label="URL de la imagen del curso"
          required
        ></v-text-field>
        <v-text-field
          v-model.number="form.cupos"
          label="Cupos del curso"
          type="number"
          required
          value= "0"
         
        ></v-text-field>
        <v-text-field
          v-model.number="form.inscritos"
          label="Inscritos en el curso"
          type="number"
          required
          value= "0"
          :rules="inscritos"
        ></v-text-field>
        <p v-show="form.inscritos > form.cupos" 
          class="font-italic red--text"
          >
          El número de alumnos inscritos no puede ser mayor al de cupos disponibles.</p>
        <v-text-field
          v-model="form.duracion"
          label="Duracion del curso"
          placeholder="Ej: 3 meses"
          required
        ></v-text-field>
        <v-text-field
          v-model.number="form.costo"
          label="Costo del curso"
          type="number"
          required
          value="0"
        ></v-text-field>
        <v-text-field
          v-model="form.codigo"
          label="Código del curso"
          required
        ></v-text-field>
        <v-textarea
          v-model="form.descripcion"
          label="Descripción del curso"
          required
        ></v-textarea>
        <!-- Ventana de fecha con display none -->
        <v-col id="fecha" cols="12" sm="6" md="4">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="form.inicio"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.inicio"
                label="Picker in menu"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="form.inicio" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(form.inicio)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <!-- Boton agregar -->
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="agregar(form)">
          Agregar
        </v-btn>
        <!-- Boton limpiar fomrulario -->
        <v-btn color="error" class="mr-4" @click="reset">
          Limpiar Formulario
        </v-btn>

        <v-btn color="warning" @click="resetValidation">
          Limpiar Validación
        </v-btn>
      </v-form>
    </template>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Agregar",
  data() {
    return {
      valid: true,
      inscritos: [
        v => v <= this.form.cupos || "Revisa el número de inscritos"
      ],/*
      cupos: [
        v => v > this.form.inscritos || "Revisa el número de cupos"
      ],*/
      form: {
        codigo: "",
        nombre: "",
        estado: "No",
        costo: "",
        duracion: "",
        descripcion: "",
        cupos: "",
        inscritos: "",
        inicio: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        imagen: "",
      },
      menu: false,
      modal: false,
    };
  },
  methods: {
    ...mapActions(["agregarCursos"]),
    agregar(curso) {
      this.$confirm(
        "Va a agergar un nuevo curso. ¿Desea continuar?",
        "Advertencia",
        {
          confirmButtonText: "Agregar",
          cancelButtonText: "Cancelar",
          type: "warning"
        }
      )
      .then(async () => {
      await this.agregarCursos(curso);
      const msg = { type: "success", message: "Curso agregado" };
      this.$message({
        ...msg,
      });
      this.$router.push({ name: "Administracion" });
      })
      .catch(() =>
        this.$message({
          type: "info",
          message: "Acción cancelada",
        })
      )
   
    },
    reset() {
      this.form.codigo = "";
      this.form.nombre = "";
      this.form.costo = "";
      this.form.duracion = "";
      this.form.descripcion = "";
      this.form.cupos = "";
      this.form.inscritos = "";
      this.form.imagen = "";
    },
    resetValidation() {
      this.$router.push({ name: "Administracion" });
    },
  },
};
</script>
<style scoped>
#fecha {
  display: none;
}
</style>