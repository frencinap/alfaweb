import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Registro from "@/views/Registro.vue";
import firebase from "firebase"

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        alias: ["/login"],
        name: "Login",
        component: Login,
    },
    {
        path: "/administracion",
        alias: ["/admin"],
        name: "Administracion",
        component: () => import("../views/Administracion.vue"),
        meta: {login: true}
    },
    /* // Ruta eliminada, sustituda por el modal en administración
    {
        path: "/agregar",
        name: "Agregar",
        component: () => import("../views/Agregar.vue"),
        meta: {login: true}
    },*/
    {
        path: "/editar",
        name: "Editar",
        props: true,
        component: () => import("../views/Editar.vue"),
        meta: {login: true}
    },
    {
        path: "/registro",
        name: "Registro",
        component: Registro,
    },
    {
        path: "/cursos",
        name: "Cursos",
        component: () => import("../views/Cursos.vue"),
        meta: {login: true}
    },

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    let user = firebase.auth().currentUser;
    let authRequired = to.matched.some((route) => route.meta.login);
  
    if(!user && authRequired) {
      next("Login");
    } else if (user && !authRequired) {
      next("Cursos");
    } else {
      next()
    }
  }) 

export default router;