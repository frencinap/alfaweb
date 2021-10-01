import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify'

// ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// Firebase
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCdXZJGzHv5ONoPO-zkn19tTPttFtJ4YWQ",
  authDomain: "pruebaottoklaus-eb4b0.firebaseapp.com",
  databaseURL: "https://pruebaottoklaus-eb4b0-default-rtdb.firebaseio.com",
  projectId: "pruebaottoklaus-eb4b0",
  storageBucket: "pruebaottoklaus-eb4b0.appspot.com",
  messagingSenderId: "113602401261",
  appId: "1:113602401261:web:3910da403097028a0a0de4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
