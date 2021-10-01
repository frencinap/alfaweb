<template>
  <v-container>
    <!-- Titulo y boton agregar curso -->
    <el-container id="titulo">
      <h1>Administración</h1>
      <!-- Botón agregar curso -->
      <el-button type="primary" @click="centerDialogVisible = true"
        >Agregar Curso</el-button
      >
      <!-- Modal agregar Curso -->
      <el-dialog
        title="Agregando Curso"
        :visible.sync="centerDialogVisible"
        width="60%"
        center
      >
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
        <!-- Advertencia si el número en los campos esta equivocado -->
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
        <!-- Fin ventana de fecha con display none -->
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
      </el-dialog>
    </el-container>
    <el-container>
      <!-- Cuerpo de la tabla usando Element UI -->
      <el-table :data="listaCursos">
        <el-table-column prop="data.nombre" label="Curso"></el-table-column>
        <el-table-column
          width="100px"
          prop="data.cupos"
          label="Cupos"
        ></el-table-column>
        <el-table-column
          width="100px"
          prop="data.inscritos"
          label="Inscritos"
        ></el-table-column>
        <el-table-column
          width="100px"
          prop="data.duracion"
          label="Duración"
        ></el-table-column>
        <el-table-column
          width="100px"
          prop="data.costo"
          label="Costo"
        ></el-table-column>
        <el-table-column
          width="100px"
          prop="data.estado"
          label="Terminado"
        ></el-table-column>
        <el-table-column
          width="100px"
          prop="data.inicio"
          label="Fecha"
        ></el-table-column>
        <el-table-column label="Acciones" fixed="right" width="120">
          <template slot-scope="scope">
            <!-- Botón editar curso -->
            <el-tooltip
              class="item"
              effect="dark"
              content="Editar curso"
              placement="bottom"
            >
              <el-button
                @click="editar(listaCursos[scope.$index])"
                type="text"
                size="small"
                ><v-icon>mdi-pencil</v-icon></el-button
              ></el-tooltip
            >
            <!-- Botón eliminar curso -->
            <el-tooltip
              class="item"
              effect="dark"
              content="Eliminar curso"
              placement="bottom"
            >
              <el-button
                @click="eliminarItem(listaCursos[scope.$index].id)"
                type="text"
                size="small"
                ><v-icon>mdi-delete</v-icon></el-button
              ></el-tooltip
            >
          </template>
        </el-table-column>
      </el-table>
    </el-container>
    <template>
      <!-- Alertas usando elementos de Vuetify -->
      <div id="alertas">
        <v-alert dense outlined color="deep-purple accent-4"
          ><v-icon color="deep-purple accent-4">mdi-account-group</v-icon>
          Cantidad total de alumnos permitidos:
          <strong>{{ $store.getters.totalCupos }}</strong> alumnos
        </v-alert>
        <v-alert dense outlined color="blue accent-4"
          ><v-icon color="blue accent-4">mdi-account-multiple-check</v-icon>
          Cantidad total de alumnos inscritos:
          <strong>{{ $store.getters.totalInscritos }}</strong> alumnos
        </v-alert>
        <v-alert dense outlined color="orange accent-4"
          ><v-icon color="orange accent-4">mdi-account-clock</v-icon> Cantidad
          total de alumnos restantes:
          <strong>{{ $store.getters.totalRestantes }}</strong> alumnos
        </v-alert>
        <v-alert dense outlined color="pink accent-2"
          ><v-icon color="pink accent-2">mdi-cancel</v-icon> Cantidad total de
          cursos terminados:
          <strong>{{ $store.getters.totalSi }}</strong> cursos
        </v-alert>
        <v-alert dense outlined color="brown darken-4"
          ><v-icon color="brown darken-4">mdi-bell-ring</v-icon> Cantidad total
          de cursos activos:
          <strong>{{ $store.getters.totalNo }}</strong> cursos
        </v-alert>
        <v-alert dense outlined color="lime darken-1"
          ><v-icon color="amber lighten-1">mdi-bell-ring</v-icon> Cantidad total
          de cursos: <strong>{{ $store.getters.totalCursos }}</strong> cursos
        </v-alert>
      </div>
    </template>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Administracion",
  mounted() {
    this.getCursos();
  },
  data() {
    return {
      centerDialogVisible: false,
      valid: true,
      inscritos: [
        v => v <= this.form.cupos || "Revisa el número de inscritos"
      ],
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
  computed: {
    ...mapGetters([
      "listaCursos",
      "totalCupos",
      "totalInscritos",
      "totalRestantes",
      "totalSi",
      "totalNo",
      "totalCursos",
    ]),
  },
  methods: {
    ...mapActions(["getCursos", "eliminarCurso", "agregarCursos"]),
    editar(curso) {
      this.$router.push({ name: "Editar", params: { curso: curso } });
    },
    eliminarItem(cursoID) {
      this.$confirm(
        "Borrará el curso seleccionado. ¿Desea continuar?",
        "Advertencia",
        {
          confirmButtonText: "Eliminar",
          cancelButtonText: "Cancelar",
          type: "warning",
        }
      )
        .then(async () => {
          await this.eliminarCurso(cursoID);
          let msg = { type: "success", message: "Curso Eliminado" };
          this.$message({
            ...msg,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Acción cancelada",
          });
        });
    },
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
      this.centerDialogVisible= false;
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
      this.centerDialogVisible= false;
    },
  },
};
</script>
<style scoped>
#titulo {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 1rem;
}
#alertas {
  margin-top: 2rem;
}
#fecha {
  display: none;
}
</style>
