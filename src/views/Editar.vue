<template>
  <v-container>
    <h1>Editando el Curso: {{ this.form.nombre }}</h1>
    <template>
      <!-- Tabla editar curso usando Element UI -->
      <el-form ref="form" :model="form">
        <el-form-item label="Nombre">
          <el-input v-model="form.nombre"></el-input>
        </el-form-item>
        <el-form-item label="URL de imagen del curso">
          <el-input v-model="form.imagen"></el-input>
        </el-form-item>
        <el-form-item label="Cupos">
          <el-input v-model.number="form.cupos" type="number"></el-input>
        </el-form-item>
        <el-form-item label="Inscritos">
          <el-input v-model.number="form.inscritos" type="number"></el-input>
        </el-form-item>
        <el-form-item label="Duración del curso">
          <el-input v-model="form.duracion"></el-input>
        </el-form-item>
        <el-form-item label="Costo del curso">
          <el-input v-model.number="form.costo" type></el-input>
        </el-form-item>
        <el-form-item label="Código del curso">
          <el-input v-model="form.codigo"></el-input>
        </el-form-item>
        <el-form-item label="Descripcción del curso">
          <el-input
            v-model="form.descripcion"
            type="textarea"
            :rows="3"
          ></el-input>
        </el-form-item>
        <el-form-item label="Fecha de registro">
          <el-input v-model="form.inicio" type="date" value="YYYY-MM-DD"></el-input>
        </el-form-item>
        <el-form-item>
          <el-switch v-model="form.estado"
          inactive-color="#909399"
          active-color="#67C23A"
          active-value="Si"
          inactive-value="No"
          active-text="Terminado: Si"
          inactive-text="Terminado: No"
          v-on:change="form.inscritos = 0"
          > </el-switch>
        </el-form-item>
        <el-form-item class="text-center">
          <el-button type="success" @click="actualizar(form)"
            >Actualizar</el-button
          >
          <el-button type="danger" @click="limpiar"
            >Limpiar Formulario</el-button
          >
          <el-button type="warning"
            >Limpiar Validación</el-button
          >
          <el-button type="primary" @click="regresar">Regresar</el-button>
        </el-form-item>
      </el-form>
    </template>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Editar",
  props: ["curso"],
  data() {
    return {
      form: {
        codigo: "",
        nombre: "",
        estado: "",
        costo: "",
        duracion: "",
        descripcion: "",
        cupos: "",
        inscritos: "",
        inicio: "",
        imagen: "",
      },
    };
  },
  mounted() {
    this.form = this.curso.data;
  },
  methods: {
    ...mapActions(["editarCursos"]),
    change(){
      if(this.form.inicio ==="Si") {
        this.form.inscritos = 0;
      }
    },
    actualizar() {
      this.$confirm(
        "Actualizará el curso seleccionado. ¿Desea continuar?",
        "Advertencia",
        {
          confirmButtonText: "Actualizar",
          cancelButtonText: "Cancelar",
          type: "warning",
        }
      )
        .then(async () => {
          const curso = this.form;
          const id = this.curso.id;
          await this.editarCursos({ curso, id });
          let msg = { type: "success", message: "Curso Actualizado" };
          this.$message({
            ...msg,
          });
          this.$router.push({ name: "Administracion" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Acción cancelada",
          });
        });
    },
    limpiar() {
      this.form.codigo = "";
      this.form.nombre = "";
      this.form.costo = "";
      this.form.duracion = "";
      this.form.descripcion = "";
      this.form.cupos = "";
      this.form.inscritos = "";
      this.form.inicio = "";
      this.form.imagen = "";
    },
    regresar(){
      this.$router.push({ name: "Administracion"})
    },
  },
};
</script>