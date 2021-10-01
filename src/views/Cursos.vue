<template>
<!-- Vista principal -->
  <v-container>
    <!-- Display de cards cargadas desde Firestore -->
    <v-row>
      <v-col
        cols="12"
        xl="4"
        lg="4"
        md="4"
        sm="6"
        xs="12"
        v-for="(curso, index) in listaCursos"
        :key="index"
      >
        <v-card width="400" class="grey lighten-2">
          <!-- Imagen -->
          <v-img
            max-height="200px"
            max-width="400px"
            :src="curso.data.imagen"
            class="white"
          >
          </v-img>
          <!-- Datos relativos al curso -->
          <v-card-title>{{ curso.data.nombre }}</v-card-title>
          <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">Información</div>
            <v-timeline align-top dense>
              <v-timeline-item color="deep-purple lighten-1" small>
                <div>
                  <div class="font-weight-normal">
                    Costo:<strong>{{ curso.data.costo }}</strong>
                  </div>
                  <div>Duración:{{ curso.data.duracion }}</div>
                </div>
              </v-timeline-item>
              <v-timeline-item color="green" small>
                <div>
                  <div class="font-weight-normal">
                    Cupos:<strong>{{ curso.data.cupos }}</strong>
                  </div>
                  <div>
                    Completado:<strong>{{ curso.data.estado }}</strong>
                  </div>
                </div>
              </v-timeline-item>
              <v-timeline-item color="deep-purple lighten-1" small>
                <div>
                  <div class="font-weight-normal">Fecha de registro:</div>
                  <div>{{ curso.data.inicio }}</div>
                </div>
              </v-timeline-item>
              <v-timeline-item color="green" small>
                <div>
                  <div class="font-weight-normal">Descripción:</div>
                  <div>{{ curso.data.descripcion }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  mounted() {
    this.getCursos();
  },
  computed: {
    ...mapGetters(["listaCursos"]),
  },
  methods: {
    ...mapActions(["getCursos"]),
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
v-img {
  max-height: 220px;
  min-height: 220px;
  max-width: 400px;
  min-width: 400px;
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
</style>