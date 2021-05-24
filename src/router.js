import Vue from "vue"
import Router from "vue-router"
//Componentler
import About from "./pages/About.vue"
import HomePage from "./pages/Homepage.vue"
import Aouth from "./pages/auth/Auth.vue"
import VueRouter from "vue-router"
import store from "./store"

Vue.use(Router);
export const router = new VueRouter({
    routes: [
         { 
             path: "/", 
             component: HomePage,
             //bu componente girmeden önce çalışacak foknsiyon. Kontrol amaçlı
             beforeEnter(to,from,next){
               if(store.getters.isAuthenticadet){
                  next()
               }
               else{
                  next("/auth")
               }
             }
         },
         {
             path: "/about",
             component: About,
             beforeEnter(to,from,next){
                if(store.getters.isAuthenticadet){
                   next()
                }
                else{
                   next("/auth")
                }
              }
         },
         {  
             path: "/auth", 
             component: Aouth
         }
    ],
    mode: "history"
})