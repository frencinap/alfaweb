import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cursos: [],
        loading: false,
    },
    mutations: {
        loadingTable(state) {
            state.loading = true;
          },
          setCursos(state, cursos) {
            state.cursos = cursos;
            state.loading = false;
          },
    },
    actions: {
      agregarCursos({ commit }, curso) {
        commit("loadingTable");
        firebase
          .firestore()
          .collection("cursos")
          .add(curso)
          .then(commit("loadingTable"));
      },
      getCursos({ commit }) {
        commit("loadingTable");
        firebase
          .firestore()
          .collection("cursos")
          .onSnapshot((snapshot) => {
            const cursos = [];
            snapshot.forEach((doc) => {
              cursos.push({ id: doc.id, data: doc.data() });
            });
            commit("setCursos", cursos);
          });
      },
      eliminarCurso({ commit }, cursoID) {
        commit("loadingTable");
        firebase
          .firestore()
          .collection("cursos")
          .doc(cursoID)
          .delete()
          .then(commit("loadingTable"))
      },
      editarCursos({ commit }, {curso, id}) {
        commit("loadingTable");
        firebase
          .firestore()
          .collection("cursos")
          .doc(id)
          .set(curso)
          .then(commit("loadingTable"));
      }
    },
    getters: {
        listaCursos({ cursos }) {
            return cursos.filter((curso) => curso.data.cupos > 0)
        },
        totalCupos({ cursos }){
          var alumnos = cursos.map((curso) => curso.data.cupos)
          let cupos = alumnos.reduce((a,b) => a+b,0);
          console.log(cupos);
          return cupos;
        },
        totalInscritos({ cursos }){
          var alumnos = cursos.map((curso) => curso.data.inscritos)
          let inscritos = alumnos.reduce((a,b) => a+b,0);
          console.log(inscritos);
          return inscritos;
        },
        totalRestantes({ cursos }){
          var total = cursos.map((curso) => curso.data.cupos);
          var inscritos = cursos.map((curso) => curso.data.inscritos);
          let a = total.reduce((a,b) => a+b,0);
          let b = inscritos.reduce((a,b) => a+b,0);
          let diferencia = a - b;
          console.log(diferencia);
          return diferencia;
        },
        totalSi({cursos}){
          var si = cursos.map((curso) => curso.data.estado);
          let Terminados = si.filter( a => a==="Si");
          console.log(Terminados.length);
          return Terminados.length;
        },
        totalNo({cursos}){
          var no = cursos.map((curso) => curso.data.estado);
          let Activos = no.filter( a => a==="No");
          console.log(Activos.length);
          return Activos.length;
        },
        totalCursos({cursos}) {
          console.log(cursos.length);
          return cursos.length
          ;
        }, 
    }
});